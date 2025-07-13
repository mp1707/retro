"use client";

import { useState } from "react";
import { Card } from "@/components/Card";

export default function Home() {
  const [userResponse, setUserResponse] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserResponse(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userResponse.trim()) return;

    setIsSubmitted(true);
    console.log("User response:", userResponse);
    // You can add additional logic here to handle the form submission
  };

  const handleReset = () => {
    setUserResponse("");
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
        <h1
          className="text-2xl text-gray-800"
          style={{
            fontFamily:
              'var(--font-handjet), "Chicago", "Monaco", "Courier New", monospace',
            fontWeight: 300,
            WebkitFontSmoothing: "none",
            MozOsxFontSmoothing: "unset",
            textRendering: "geometricPrecision",
            imageRendering: "pixelated",
          }}
        >
          Thank you for sharing!
        </h1>
        <p
          className="text-gray-600"
          style={{
            fontFamily:
              'var(--font-handjet), "Chicago", "Monaco", "Courier New", monospace',
            fontWeight: 300,
            WebkitFontSmoothing: "none",
            MozOsxFontSmoothing: "unset",
            textRendering: "geometricPrecision",
            imageRendering: "pixelated",
          }}
        >
          Your response: "{userResponse}"
        </p>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          style={{
            fontFamily:
              'var(--font-handjet), "Chicago", "Monaco", "Courier New", monospace',
            fontWeight: 300,
            WebkitFontSmoothing: "none",
            MozOsxFontSmoothing: "unset",
            textRendering: "geometricPrecision",
            imageRendering: "pixelated",
          }}
          aria-label="Submit another response"
        >
          Submit Another Response
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <Card text="We shipped the new user dashboard ahead of schedule! Great teamwork on the API integration." />
        <Card text="Communication between frontend and backend teams could be improved. Maybe we need more sync meetings?" />
        <Card text="Let's invest in better testing tools next sprint. We caught too many bugs in production this time." />
      </div>
    </div>
  );
}
