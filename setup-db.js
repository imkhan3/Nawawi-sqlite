// setup-db.js
const Database = require('better-sqlite3');
const db = new Database('./db/nawawi.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS hadiths (
    id INTEGER PRIMARY KEY,
    arabic_text TEXT,
    english_translation TEXT
  );
  
  CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY,
    word TEXT,
    root TEXT,
    translation TEXT
  );
  
  CREATE TABLE IF NOT EXISTS hadith_words (
    hadith_id INTEGER,
    word_id INTEGER,
    FOREIGN KEY(hadith_id) REFERENCES hadiths(id),
    FOREIGN KEY(word_id) REFERENCES words(id)
  );
`);

// Insert initial data (nawawi's 40 hadiths)
db.exec(`
  INSERT INTO hadiths (arabic_text, english_translation) VALUES 
  ('إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ', 'Actions are judged by intentions');
  
  -- Add more hadith here
`);

console.log('Database setup complete!');
db.close();
