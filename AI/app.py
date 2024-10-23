import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
import httpx
import json
import logging
import requests
import re
load_dotenv()

app = FastAPI()

logging.basicConfig(level=logging.INFO)

# Add CORS middleware
@app.middleware("http")
async def add_cors_headers(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "https://www.teste.com.br, http://localhost:3000"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

origins = [
    "https://teste.com.br",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure the Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

class AttractionData(BaseModel):
    name: str
    location: str
    description: str
    category: str
    rating: float
    hours: str
    admission_price: dict
    image: str
    nearby_restaurants: list
    other_activities: list

class RoutineRequest(BaseModel):
    attraction: AttractionData
    days: int

@app.post("/generate-routine")
async def generate_routine(request: RoutineRequest):
    try:
        # Prepare the prompt for Gemini
        prompt = f"""
        Create a fun and enjoyable {request.days}-day routine for a visit to {request.attraction.name}.
        Location: {request.attraction.location}
        Description: {request.attraction.description}
        Category: {request.attraction.category}
        Rating: {request.attraction.rating}
        Hours: {request.attraction.hours}
        Admission Price: Adults - {request.attraction.admission_price['adults']}, Children - {request.attraction.admission_price['children']}
        Other Activities: {', '.join(request.attraction.other_activities)}

        Nearby Restaurants:
        {', '.join([restaurant['name'] for restaurant in request.attraction.nearby_restaurants])}

        Please provide a detailed itinerary for each day, including:
        - Recommended activities
        - Suggested timings
        - Meal recommendations (using the nearby restaurants)
        - add tips or things to keep in mind

        Format the response as a JSON object with days as keys (e.g., "Day 1", "Day 2") and the activities as arrays, make sure to not repeat day 1 also for day 3. 
        Only include valid JSON without any additional text.
        
        Example format:
        {{
            "Day 1": [
                {{"time": "9:00 AM", "activity": "Start your day with a fun morning walk through the park's beautiful trails."}},
                {{"time": "11:00 AM", "activity": "Visit the nearby attractions, such as {', '.join(request.attraction.other_activities)} for an exciting morning."}},
                {{"time": "12:00 PM", "activity": "Enjoy a delicious lunch at a local favorite restaurant with a vibrant atmosphere."}}
            ],
            "Day 2": [
                {{"time": "10:00 AM", "activity": "Experience a guided adventure tour for some excitement."}},
                {{"time": "1:00 PM", "activity": "Explore another local attraction, such as {', '.join(request.attraction.other_activities)}."}},
                {{"time": "3:00 PM", "activity": "Relax and enjoy a coffee at a nearby cafe before heading to dinner."}}
            ]
        }}
        """

        # Generate content using Gemini
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)

        # Ensure the response text is valid JSON
        
        try:
            routine = json.loads(response.text)
        except json.JSONDecodeError:
            # Handle the case where the model returns non-JSON formatted text
            raise HTTPException(status_code=500, detail="The model response is not valid JSON.")

        return {"routine": routine}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Define the DestinationRequest model
class DestinationRequest(BaseModel):
    name: str
    location: str

    
# Endpoint to generate detailed information about a destination
@app.post("/generate-destination-info")
async def generate_destination_info(request: DestinationRequest):
    try:
        # Prepare the prompt for generating destination info
        prompt = f"""
        Provide a rich, descriptive overview of {request.name}, located in {request.location}, formatted as follows:
        
        Why visit {request.name}?
        - Start with a brief introduction describing why the destination is unique or notable.
        - Detail the main attractions, natural highlights, or cultural significance of the destination.
        - Include any unique wildlife, activities, or landscapes that can be experienced.
        - Add any historical or cultural context if relevant.

        Also include:
        - Key activities (e.g., guided tours, hiking trails, famous landmarks, entertainment)
        - Nearby attractions
        - Important tips or things to keep in mind while visiting

        Format the response as a JSON object with the following structure:

        {{
            "description": "A beautiful and expansive park, {request.name} is known for its... [detailed description]",
            "why_visit": [
                "It offers [highlight feature 1]",
                "Visitors can experience [highlight feature 2]",
                "The park provides [highlight feature 3]"
            ],
            "top_activities": [
                {{"activity": "Activity 1", "duration": "Recommended duration", "image": "url_to_image"}},
                {{"activity": "Activity 2", "duration": "Recommended duration" , "image": "url_to_image"}}
            ],
            "nearby_attractions": ["Nearby Attraction 1", "Nearby Attraction 2"],
            "tips": ["Tip 1", "Tip 2"],
        }}
        Only include valid JSON without any additional text.
        """

        # Generate content using Gemini
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)

        # Log the raw response for debugging
        logging.info("Raw response from model: %s", response.text)

        # Remove any Markdown formatting if present
        cleaned_response = response.text.strip('```json').strip()  # Clean up the response

        # Ensure the cleaned response text is valid JSON
        try:
            destination_info = json.loads(cleaned_response)
        except json.JSONDecodeError:
            logging.error("Failed to parse response as JSON: %s", cleaned_response)
            raise HTTPException(status_code=500, detail="The model response is not valid JSON.")

        return {"destination_info": destination_info}

    except Exception as e:
        logging.error("Error in generate_destination_info: %s", str(e))
        raise HTTPException(status_code=500, detail=str(e))


class ChatContext(BaseModel):
    user_question: str
    previous_questions: list = []
    previous_responses: list = []
    feedback: str = "incomplete"  # "incomplete" or "complete" based on user satisfaction

@app.post("/chat")
async def chat(context: ChatContext):
    try:
        # Append the latest question to the history
        context.previous_questions.append(context.user_question)
        
        # Prepare the prompt for the model with the conversation history
        history = ""
        for q, r in zip(context.previous_questions, context.previous_responses):
            history += f"User: {q}\nAI: {r}\n"
        history += f"User: {context.user_question}\nAI:"
        
        # Construct the prompt to continue the conversation
        prompt = f"""
        {history}
        
        Provide a helpful response, formatted as a JSON object. Include:
        - "response": a detailed answer to the question.
        - "follow_up_prompt": a suggestion for additional questions the user could ask.
        
        Only provide valid JSON with no additional text.
        """

        # Generate the content
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)

        # Log the raw response for debugging
        logging.info("Raw response from chat: %s", response.text)
        
        # Clean and parse the response as JSON
        cleaned_response = re.sub(r'```(json)?', '', response.text).strip()
        try:
            json_response = json.loads(cleaned_response)
        except json.JSONDecodeError as e:
            logging.error("JSON decoding error: %s", str(e))
            logging.error("Response text that failed to parse: %s", cleaned_response)
            raise HTTPException(status_code=500, detail="The model response is not valid JSON.")
        
        # Add the model's response to the context for the next round
        context.previous_responses.append(json_response['response'])

        # Return the model's response and follow-up prompt to the user
        return {
            "response": json_response['response'],
            "follow_up_prompt": json_response['follow_up_prompt']
        }

    except Exception as e:
        logging.error("Error in chat: %s", str(e))
        raise HTTPException(status_code=500, detail=str(e))

# Request model for the API
class TripRequest(BaseModel):
    destination: str
    budget: float
    travel_group: str
    start_date: str  # Format: "YYYY-MM-DD"
    end_date: str    # Format: "YYYY-MM-DD"

# Response model for the generated trip plan
class TripPlan(BaseModel):
    destination: str
    budget: float
    travel_group: str
    start_date: str
    end_date: str
    activities: list
    places: list
    accommodations: list
    transportation: list
    tips: list

# POST route to generate trip plan
@app.post("/generate-trip-plan", response_model=TripPlan)
async def generate_trip_plan(request: TripRequest):
    try:
        # Prepare the AI prompt for trip generation
        prompt = f"""
        Generate a personalized travel plan for a {request.travel_group} trip to {request.destination}.
        The budget is ${request.budget}, and the trip will be from {request.start_date} to {request.end_date}.
        Provide:
        - Suggested activities
        - Key places to visit
        - Recommended accommodations
        - Best transportation options
        - Travel tips for the destination
        """

       # Generate the content
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)

        # Here we will parse the generated text into structured data
        # (This part would depend on the format of the response from the AI)
        # Simulating a parsed response from the AI:
        ai_plan = {
            "destination": request.destination,
            "budget": request.budget,
            "travel_group": request.travel_group,
            "start_date": request.start_date,
            "end_date": request.end_date,
            "activities": [
                "Visit iconic landmarks",
                "Explore local markets",
                "Try authentic local food",
                "City tour",
                "Relax in a park"
            ],
            "places": [
                "Central Park",
                "City Museum",
                "Popular Beach",
                "Historic Square"
            ],
            "accommodations": [
                "Downtown Hotel",
                "Luxury Resort",
                "Budget Hostel"
            ],
            "transportation": [
                "Public transport",
                "Bike rentals",
                "Taxi services"
            ],
            "tips": [
                "Book accommodations early",
                "Use public transport to save money",
                "Visit attractions in off-peak hours"
            ]
        }

        # Return the structured trip plan as a response
        return ai_plan

    except Exception as e:
        logging.error(f"Failed to generate trip plan: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate trip plan. Please try again.")
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
