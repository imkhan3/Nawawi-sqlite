// src/app/api/hadiths/route.js
import Database from 'better-sqlite3';

const db = new Database('./db/nawawi.db', { verbose: console.log });

export async function GET() {
  const sql = `SELECT arabic_text, english_translation FROM hadiths`;
  try {
    const hadiths = db.prepare(sql).all();
    return new Response(JSON.stringify(hadiths), { status: 200 });
  } catch (error) {
    console.error('Error fetching hadiths:', error.message);
    return new Response(JSON.stringify({ error: 'Database query failed' }), { status: 500 });
  }
}
