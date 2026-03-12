-- ═══════════════════════════════════════════════
--  USER PROFILES TABLE (user-service)
-- ═══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS user_profiles (
  user_id       INTEGER PRIMARY KEY,
  first_name    VARCHAR(100),
  last_name     VARCHAR(100),
  bio           TEXT,
  updated_at    TIMESTAMP    DEFAULT NOW()
);

-- Seed profile for test user
INSERT INTO user_profiles (user_id, first_name, last_name, bio) VALUES
  (1, 'Alice', 'Wonderland', 'I am a test user'),
  (2, 'Bob', 'Builder', 'Can we build it?'),
  (3, 'Admin', 'System', 'System administrator')
ON CONFLICT DO NOTHING;
