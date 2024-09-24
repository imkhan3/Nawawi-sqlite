import Database from "better-sqlite3";

const db = new Database("./db/nawawi.db", { verbose: console.log });

// Function to remove tashkeel from the query (already done for the user input)
function removeTashkeel(text) {
    // Tashkeel Unicode range
    const tashkeelRegex = /[\u0617-\u061A\u064B-\u0652]/g;

    // Replace tashkeel and normalize alifs with hamza (إ, أ, آ) to plain alif (ا)
    return text
        .replace(tashkeelRegex, "") // Remove tashkeel
        .replace(/إ/g, "ا") // Replace إ with ا
        .replace(/أ/g, "ا") // Replace أ with ا
        .replace(/آ/g, "ا"); // Replace آ with ا
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    let query = searchParams.get("query");

    if (!query) {
        return new Response(JSON.stringify({ error: "Query parameter is required" }), { status: 400 });
    }

    // Remove tashkeel from the user input
    query = removeTashkeel(query);
    console.log("Search query after removing tashkeel:", query); // Debugging

    // Simplified SQL query that removes only one tashkeel for debugging
    const sql = `
    SELECT arabic_text, english_translation 
    FROM hadiths 
    WHERE english_translation LIKE ?
    OR REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(arabic_text, 'َ', ''), 'ُ', ''), 'ِ', ''), 'ً', ''), 'ٌ', ''), 'ٍ', ''), 'ْ', ''), 'ّ', ''), 'إ', 'ا'), 'أ', 'ا'), 'آ', 'ا') LIKE ?
  `;

    // Add wildcard (%) around the query to match anything containing the query
    const containsQuery = `%${query}%`;

    try {
        // Perform search in both English and Arabic columns (with tashkeel removed for Arabic text)
        const hadiths = db.prepare(sql).all(containsQuery, containsQuery);
        console.log("Hadiths found:", hadiths); // Debugging

        if (hadiths.length === 0) {
            return new Response(JSON.stringify({ error: "No matching hadiths found" }), { status: 404 });
        }

        return new Response(JSON.stringify(hadiths), { status: 200 });
    } catch (error) {
        console.error("Error executing search query:", error.message);
        return new Response(JSON.stringify({ error: "Database query failed" }), { status: 500 });
    }
}
