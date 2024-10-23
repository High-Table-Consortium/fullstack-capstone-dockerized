import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Slider } from "../components/ui/slider";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import axios from 'axios';

export default function EnhancedTripPlanner() {
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState(1000);
  const [travelGroup, setTravelGroup] = useState('alone');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [plan, setPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generatePlan = async () => {
    setIsLoading(true);
    setError('');
    setPlan(null);

    try {
      const response = await axios.post('http://0.0.0.0:8000/generate-plan', {
        destination,
        budget,
        travelGroup,
        startDate,
        endDate,
      });

      setPlan(response.data);
    } catch (err) {
      setError('Failed to generate plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePlan();
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">AI Trip Planner</h1>
      <Card>
        <CardHeader>
          <CardTitle>Plan Your Dream Vacation</CardTitle>
          <CardDescription>Enter your preferences and let AI plan your perfect trip</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter your destination"
                  required
                />
              </div>
              <div>
                <Label htmlFor="budget">Budget (USD)</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    id="budget"
                    min={100}
                    max={10000}
                    step={100}
                    value={[budget]}
                    onValueChange={(value) => setBudget(value[0])}
                  />
                  <span className="font-bold">${budget}</span>
                </div>
              </div>
            </div>
            <div>
              <Label>Travel Group</Label>
              <RadioGroup value={travelGroup} onValueChange={setTravelGroup} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="alone" id="alone" />
                  <Label htmlFor="alone">Alone</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="couple" id="couple" />
                  <Label htmlFor="couple">Couple</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="family" id="family" />
                  <Label htmlFor="family">Family</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friends" id="friends" />
                  <Label htmlFor="friends">Friends</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Plan...
                </>
              ) : (
                'Plan My Trip'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card className="mt-6 border-red-500">
          <CardContent>
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      )}

      {plan && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Your AI-Generated Trip Plan</CardTitle>
            <CardDescription>
              {plan.destination} | ${plan.budget} budget | {plan.travelGroup} trip
              <br />
              {plan.startDate} - {plan.endDate}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Suggested Activities:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {plan.activities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Places to Visit:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {plan.places.map((place, index) => (
                  <li key={index}>{place}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Recommended Accommodations:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {plan.accommodations.map((accommodation, index) => (
                  <li key={index}>{accommodation}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Transportation Options:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {plan.transportation.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Travel Tips:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {plan.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
