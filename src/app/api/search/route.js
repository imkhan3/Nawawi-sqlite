// pages/api/search.js
import Database from 'better-sqlite3';

const db = new Database('./db/nawawi.db', { verbose: console.log });

// Named export for the GET method
export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return new Response(JSON.stringify({ error: 'Query parameter is required' }), { status: 400 });
  }

  const sql = `
    SELECT h.arabic_text, h.english_translation 
    FROM hadiths h 
    JOIN hadith_words hw ON h.id = hw.hadith_id 
    JOIN words w ON hw.word_id = w.id
    WHERE w.word LIKE ? OR w.root LIKE ?;
  `;

  const hadiths = db.prepare(sql).all(`%${query}%`, `%${query}%`);
  return new Response(JSON.stringify(hadiths), { status: 200 });
}
