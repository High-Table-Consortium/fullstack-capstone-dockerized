import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
import httpx

load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
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

        Format the response as a JSON object with days as keys (e.g., "Day 1", "Day 2") and the activities as arrays. 
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
        import json
        try:
            routine = json.loads(response.text)
        except json.JSONDecodeError:
            # Handle the case where the model returns non-JSON formatted text
            raise HTTPException(status_code=500, detail="The model response is not valid JSON.")

        return {"routine": routine}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
