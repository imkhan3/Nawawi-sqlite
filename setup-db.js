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
  INSERT INTO words (word, translation, root) VALUES 
  ('إِنَّمَا', 'Indeed', 'ن م و'),
  ('الْأَعْمَالُ', 'Actions', 'ع م ل'),
  ('بِالنِّيَّاتِ', 'By intentions', 'ن و ي');

  INSERT INTO hadith_words (hadith_id, word_id) VALUES 
  (1, 1),  -- إِنَّمَا
  (1, 2),  -- الْأَعْمَالُ
  (1, 3);  -- بِالنِّيَّاتِ
`);

console.log('Database setup complete!');
db.close();
