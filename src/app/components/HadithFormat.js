"use client"; // Mark this component as client-side

import { useEffect, useState } from 'react';

export default function HadithFormat() {
  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch hadiths from the API when the component mounts
  useEffect(() => {
    async function fetchHadiths() {
      try {
        const response = await fetch('/api/hadiths'); // Call the API route
        const data = await response.json();
        setHadiths(data); // Store the hadiths in the state
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error('Error fetching hadiths:', error);
        setLoading(false); // Stop loading in case of an error
      }
    }

    fetchHadiths(); // Fetch hadiths on component mount
  }, []);

  if (loading) return <div>Loading...</div>; // Display a loading state

  return (
    <div>
      {hadiths.length === 0 ? (
        <p>No hadiths found.</p>
      ) : (
        hadiths.map((hadith, index) => (
          <div key={index} className="mb-8">
            {/* Arabic Text */}
            <p className="text-2xl mb-2 text-right">{hadith.arabic_text}</p>

            {/* English Translation */}
            <p className="text-lg text-left">{hadith.english_translation}</p>
          </div>
        ))
      )}
    </div>
  );
}
