const express = require('express');
const app = express();
app.use(express.json());

// ดึงพอร์ตจาก Environment Variable (ที่เซตไว้ใน .yml) ถ้าไม่มีให้ใช้ 3004
const PORT = process.env.PORT || 3004;

const userRoutes = require('./src/routes/users');
const { pool } = require('./src/db/db');

app.use('/api/users', userRoutes);

// Wait for DB and start server
async function start() {
    let retries = 10;
    while (retries > 0) {
        try { await pool.query('SELECT 1'); break; }
        catch (e) {
            console.log(`[user-service] Waiting for DB... (${retries} left)`);
            retries--;
            await new Promise(r => setTimeout(r, 3000));
        }
    }
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`User Service is up on port ${PORT}`);
    });
}
start();