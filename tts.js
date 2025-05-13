// Untuk Node.js v18 ke atas, tidak perlu require('node-fetch')
const fs = require('fs');

const text = 'こんにちは。'; // Ganti teks di sini
const speaker = 1; // Ganti dengan ID speaker yang tersedia

(async () => {
  try {
    // STEP 1 - Buat audio query
    const queryRes = await fetch(`http://localhost:50021/audio_query?text=${encodeURIComponent(text)}&speaker=${speaker}`, {
      method: 'POST'
    });
    const query = await queryRes.json();

    // STEP 2 - Synthesis (ubah ke suara)
    const synthRes = await fetch(`http://localhost:50021/synthesis?speaker=${speaker}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    });

    // Simpan output ke file WAV
    const buffer = await synthRes.arrayBuffer();
    fs.writeFileSync('output.wav', Buffer.from(buffer));
    console.log('✅ Suara berhasil disimpan sebagai output.wav');
  } catch (err) {
    console.error('❌ Error:', err);
  }
})();
