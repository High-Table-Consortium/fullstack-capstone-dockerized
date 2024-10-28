// DestinationInfo.jsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const DestinationInfo = ({ destination, destinationInfo }) => {
  if (!destinationInfo) {
    return <p>Loading information...</p>;
  }

  return (
    <Card className="shadow-lg p-6 rounded-lg border border-gray-200 w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Key Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-lg font-bold">Description</h3>
        <p className="text-gray-700">{destinationInfo.description || 'Description not available'}</p>

        <h3 className="text-lg font-bold">Why Visit {destination.name}</h3>
        <ul className="list-disc list-inside mb-4">
          {destinationInfo.why_visit?.map((reason, index) => (
            <li key={index} className="text-gray-700">{reason}</li>
          ))}
        </ul>

        <h3 className="text-lg font-bold">Top Activities</h3>
        <ul className="list-disc list-inside mb-4">
          {destinationInfo.top_activities?.map((activity, index) => (
            <li key={index} className="text-gray-700">
              {activity.activity} - <span className="font-semibold">{activity.duration}</span>
            </li>
          ))}
        </ul>

        <h3 className="text-lg font-bold">Tips</h3>
        <ul className="list-disc list-inside mb-4">
          {destinationInfo.tips?.map((tip, index) => (
            <li key={index} className="text-gray-700">{tip}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default DestinationInfo;
