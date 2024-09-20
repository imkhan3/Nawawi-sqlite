import Database from 'better-sqlite3';

const db = new Database('./db/nawawi.db', { verbose: console.log });

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  let query = searchParams.get('query');

  if (!query) {
    return new Response(JSON.stringify({ error: 'Query parameter is required' }), { status: 400 });
  }

  console.log('Search query:', query);  // Debugging

  // Use the LIKE operator for partial matching (contains) in both English and Arabic
  const sql = `
    SELECT arabic_text, english_translation 
    FROM hadiths 
    WHERE english_translation LIKE ?
       OR arabic_text LIKE ?
  `;

  // Add wildcard (%) around the query to match anything containing the query
  const containsQuery = `%${query}%`;

  try {
    // Perform search in both English and Arabic columns
    const hadiths = db.prepare(sql).all(containsQuery, containsQuery);
    console.log('Hadiths found:', hadiths);  // Debugging

    if (hadiths.length === 0) {
      return new Response(JSON.stringify({ error: 'No matching hadiths found' }), { status: 404 });
    }

    return new Response(JSON.stringify(hadiths), { status: 200 });
  } catch (error) {
    console.error('Error executing search query:', error.message);
    return new Response(JSON.stringify({ error: 'Database query failed' }), { status: 500 });
  }
}
