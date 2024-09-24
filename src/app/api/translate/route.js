// src/app/api/translate/route.js

import { NextResponse } from 'next/server';
import translate from "translate";

export async function GET(req) {
  try {
    translate.engine = "deepl"; // "google", "yandex", "libre", "deepl"
    const text = await translate("Hello world", "es");
console.log(text);

    return NextResponse.json({ translatedText: text });
  } catch (error) {
    console.error('Error translating text:', error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
