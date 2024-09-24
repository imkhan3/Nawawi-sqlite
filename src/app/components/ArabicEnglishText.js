import React from 'react';

export default function ArabicEnglishText({ words }) {
  return (
    <div className="bg-black text-white p-6 font-sans">
      <div className="flex flex-wrap justify-center gap-4 text-center">
        {words.map((word, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-2xl mb-2">{word.arabic}</span>
            <span className="text-sm">{word.english}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
