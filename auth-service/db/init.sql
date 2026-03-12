-- ═══════════════════════════════════════════════
--  USERS TABLE (auth-service)
-- ═══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(50)  UNIQUE NOT NULL,
  email         VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          VARCHAR(20)  DEFAULT 'member',
  created_at    TIMESTAMP    DEFAULT NOW(),
  last_login    TIMESTAMP
);

INSERT INTO users (username, email, password_hash, role) VALUES
  ('alice', 'alice@lab.local', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'member'),
  ('bob', 'bob@lab.local', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'member'),
  ('admin', 'admin@lab.local', '$2a$10$TbAyBo.OirXRwMvBVMGgXeuHfzaOGicB5K3jZ1WZUD/pDYdm6GS7C', 'admin')
ON CONFLICT DO NOTHING;
