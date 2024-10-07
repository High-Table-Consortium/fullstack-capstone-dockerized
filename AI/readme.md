# Travel Itinerary Generator API

## Overview

The **Travel Itinerary Generator API** is a FastAPI application that generates fun and enjoyable travel itineraries based on user-provided attraction data. Utilizing the Google Gemini API, this application crafts detailed daily routines, incorporating nearby restaurants and activities to enhance the travel experience.

## Features

- Generates a multi-day itinerary for a specified attraction.
- Provides suggested activities, timings, and meal recommendations.
- Includes nearby attractions and activities for a well-rounded travel experience.
- Returns responses in a structured JSON format.

## Technologies Used

- **FastAPI**: A modern web framework for building APIs with Python.
- **Pydantic**: Data validation and settings management using Python type annotations.
- **Google Generative AI**: Used for generating travel itineraries.
- **Uvicorn**: An ASGI server for running FastAPI applications.
- **dotenv**: Loads environment variables from a `.env` file for secure API key management.

## Installation

1. pip install -r requirements.txt
