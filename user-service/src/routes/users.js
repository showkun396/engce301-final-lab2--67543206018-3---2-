const express = require('express');
const { pool } = require('../db/db');
const requireAuth = require('../middleware/authMiddleware');

const router = express.Router();

// Helper: ส่ง log
async function logEvent(data) {
    try {
        await fetch('http://log-service:3003/api/logs/internal', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ service: 'user-service', ...data })
        });
    } catch (_) { }
}

// ทุก route ต้องผ่าน JWT middleware
router.use(requireAuth);

// GET /api/users/profile
router.get('/profile', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM user_profiles WHERE user_id = $1', [req.user.sub]);
        // ถ้าไม่มีให้ return default
        if (!result.rows[0]) {
            return res.json({ profile: { user_id: req.user.sub, first_name: null, last_name: null, bio: null } });
        }
        res.json({ profile: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/users/profile
router.put('/profile', async (req, res) => {
    const { first_name, last_name, bio } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO user_profiles (user_id, first_name, last_name, bio)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id) DO UPDATE 
       SET first_name = EXCLUDED.first_name, 
           last_name = EXCLUDED.last_name, 
           bio = EXCLUDED.bio, 
           updated_at = NOW()
       RETURNING *`,
            [req.user.sub, first_name, last_name, bio]
        );
        await logEvent({
            level: 'INFO', event: 'PROFILE_UPDATED', userId: req.user.sub,
            method: 'PUT', path: '/api/users/profile', statusCode: 200,
            message: `User ${req.user.username} updated profile`
        });
        res.json({ profile: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/users/health
router.get('/health', (_, res) => res.json({ status: 'ok', service: 'user-service' }));

module.exports = router;
