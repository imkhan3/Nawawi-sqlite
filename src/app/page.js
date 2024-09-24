import HadithFormat from './components/HadithFormat';
import translate from "translate";

export default async function Page() {
    translate.engine = "google"; // "google", "yandex", "libre", "deepl"
    const text = await translate("Hello world", "ar");
    console.log(text);
  return (
    <main>
      <h1 className="text-center text-4xl">Hadith Translation</h1>
      <HadithFormat /> {/* This is the client-side component */}
      <h3>{text}</h3>
    </main>
  );
}
