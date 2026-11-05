const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const DEFAULT_PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'rockstars.json');
const DEFAULT_PASSCODES = ['6100', 'admin'];

const DEFAULT_ROCKSTARS = [
  {
    id: 'wall_273qn0j51406sfj',
    name: 'Adriel Jarred Maja',
    program: 'FENWICK ATSX',
    pillar: 'Tech-Powered',
    award: 'Q3 2026 Top Advisor',
    year: '2026',
    quarter: 'Q2',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    messages: [
      { id: 'm1', author: 'Coach Sarah', text: 'Incredible performance this quarter, Adriel! Keep soaring high!', timestamp: '2026-08-20 14:30' }
    ]
  },
  {
    id: 'wall_891kn3f92019a12',
    name: 'Alvarez Maybelyn',
    program: 'TRAVELLING TIGERS',
    pillar: 'Human-Centered',
    award: 'Q3 2026 Top Advisor',
    year: '2026',
    quarter: 'Q2',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    messages: [
      { id: 'm1', author: 'Team Captain Mark', text: "Maybelyn's customer satisfaction scores are off the charts! Proud of you!", timestamp: '2026-08-21 09:15' },
      { id: 'm2', author: 'Jenny - CS', text: 'Always helpful to teammates. Truly a MassKara Rockstar!', timestamp: '2026-08-22 11:40' },
      { id: 'm3', author: 'HR Team', text: 'Congratulations Maybelyn! Keep shining bright!', timestamp: '2026-08-24 16:00' }
    ]
  }
];

function ensureStorageFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_ROCKSTARS, null, 2), 'utf8');
  }
}

function readData() {
  ensureStorageFile();
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_ROCKSTARS;
  } catch (error) {
    return DEFAULT_ROCKSTARS;
  }
}

function writeData(data) {
  ensureStorageFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function normalizePillar(pillar, program = '') {
  if (pillar) return pillar;
  const normalized = String(program).toUpperCase();
  if (normalized.includes('TIGERS') || normalized.includes('SERVICE') || normalized.includes('SMILE')) return 'Human-Centered';
  if (normalized.includes('FENWICK') || normalized.includes('ATSX') || normalized.includes('TECH') || normalized.includes('DIGITAL')) return 'Tech-Powered';
  return 'Intelligence-Fueled';
}

function normalizeRockstar(item) {
  return {
    ...item,
    pillar: normalizePillar(item.pillar, item.program),
    messages: Array.isArray(item.messages) ? item.messages : []
  };
}

function normalizeAllRockstars(items) {
  return items.map(normalizeRockstar);
}

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.static(__dirname));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'CNX Recognition API is running' });
});

app.get('/api/rockstars', (req, res) => {
  const data = normalizeAllRockstars(readData());
  res.json(data);
});

app.put('/api/rockstars', (req, res) => {
  const incoming = Array.isArray(req.body) ? req.body : [];
  const normalized = normalizeAllRockstars(incoming);
  writeData(normalized);
  res.json({ ok: true, count: normalized.length });
});

app.post('/api/rockstars', (req, res) => {
  const rockstar = normalizeRockstar(req.body || {});
  const data = normalizeAllRockstars(readData());
  data.unshift(rockstar);
  writeData(data);
  res.status(201).json({ ok: true, rockstar });
});

app.put('/api/rockstars/:id', (req, res) => {
  const data = normalizeAllRockstars(readData());
  const index = data.findIndex(item => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Rockstar not found' });
  }

  data[index] = normalizeRockstar({ ...data[index], ...req.body, id: req.params.id });
  writeData(data);
  res.json({ ok: true, rockstar: data[index] });
});

app.delete('/api/rockstars/:id', (req, res) => {
  const data = normalizeAllRockstars(readData());
  const filtered = data.filter(item => item.id !== req.params.id);
  writeData(filtered);
  res.json({ ok: true, deletedId: req.params.id, count: filtered.length });
});

app.post('/api/rockstars/:id/messages', (req, res) => {
  const { author, text } = req.body || {};
  const data = normalizeAllRockstars(readData());
  const rockstar = data.find(item => item.id === req.params.id);

  if (!rockstar) {
    return res.status(404).json({ message: 'Rockstar not found' });
  }

  if (!author || !text) {
    return res.status(400).json({ message: 'Author and message text are required' });
  }

  const newMessage = {
    id: `msg_${Date.now()}`,
    author: String(author).trim(),
    text: String(text).trim(),
    timestamp: new Date().toISOString().slice(0, 16).replace('T', ' ')
  };

  rockstar.messages.push(newMessage);
  writeData(data);
  res.status(201).json({ ok: true, message: newMessage });
});

app.post('/api/auth/login', (req, res) => {
  const { passcode } = req.body || {};
  const valid = DEFAULT_PASSCODES.includes(String(passcode || '').trim());

  if (!valid) {
    return res.status(401).json({ ok: false, message: 'Invalid passcode.' });
  }

  return res.json({ ok: true, message: 'Access granted', role: 'admin' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

function startServer(port = Number(process.env.PORT) || DEFAULT_PORT) {
  const server = app.listen(port, () => {
    console.log(`CNX recognition portal running on http://localhost:${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      console.warn(`Port ${port} is busy. Retrying on port ${nextPort}...`);
      startServer(nextPort);
      return;
    }

    throw error;
  });
}

startServer();
