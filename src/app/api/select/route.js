import Database from 'better-sqlite3';
// ex. /api/select?type=hadiths
// Initialize the SQLite database
const db = new Database('./db/nawawi.db', { verbose: console.log });

// Named export for the GET method
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');  // Get the 'type' query parameter

  let result;
  
  // Handle the type of query based on the 'type' parameter
  switch (type) {
    case 'hadiths':
      result = db.prepare('SELECT * FROM hadiths').all();
      break;
    case 'hadith_words':
      result = db.prepare('SELECT * FROM hadith_words').all();
      break;
    case 'words':
      result = db.prepare('SELECT * FROM words').all();
      break;
    default:
      return new Response(JSON.stringify({ error: 'Invalid query type' }), { status: 400 });
  }

  return new Response(JSON.stringify(result), { status: 200 });
}
