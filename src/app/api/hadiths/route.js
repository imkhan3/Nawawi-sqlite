// pages/api/hadiths.js
import Database from 'better-sqlite3';

// Initialize the SQLite database
const db = new Database('./db/nawawi.db', { verbose: console.log });

// Named export for the GET method
export async function GET(req, res) {
  const hadiths = db.prepare('SELECT * FROM hadiths').all();
  return new Response(JSON.stringify(hadiths), { status: 200 });
}
