import ArabicEnglishText from './components/ArabicEnglishText';

export default function Page() {
  const wordPairs = [
    { arabic: 'إِنَّمَا', english: 'Indeed' },
    { arabic: 'الأعمال', english: 'Actions' },
  ];

  return (
    <main>
      <h1 className="text-center text-4xl">Hadith Translation</h1>
      <ArabicEnglishText words={wordPairs} />
    </main>
  );
}
