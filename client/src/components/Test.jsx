"use client"

import { useEffect, useState } from 'react';

const TestComponent = () => {
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/test")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setTestResult(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  return (
    <div>
      {testResult ? <p>{testResult.message}</p> : <p>Loading...</p>}
    </div>
  );
};

export default TestComponent;

