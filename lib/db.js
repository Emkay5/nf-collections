import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

// Connection config for XAMPP MySQL
const MYSQL_CONFIG = {
  host: process.env.MYSQL_HOST || '127.0.0.1',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'nf_collections',
  port: Number(process.env.MYSQL_PORT) || 3306,
  connectTimeout: 5000
};

// Fallback JSON DB file for serverless without live MySQL
const DB_FILE = process.env.VERCEL
  ? path.join('/tmp', 'nf_collections_db.json')
  : path.join(process.cwd(), 'data', 'db.json');

const INITIAL_DATA = {
  content: {
    heroEyebrow: "Lagos & Abuja · Ready-to-wear & made-to-order",
    heroTitle: "Clothing, shoes, bags & jewelry with intention.",
    heroLede: "NF Collections is built on a simple idea: fashion should feel considered — good fabric, honest construction, and pieces that outlast a season. Founded by Nana Firdausi Asabi.",
    heroTag: "New arrivals — this week",
    heroImage: "https://images.unsplash.com/photo-1756641964889-5a04b6e0f4f6?auto=format&fit=crop&w=1400&q=80",
    founderQuote: "I wanted a brand where every piece has a reason to exist — not just a trend to chase.",
    founderBio: "NF Collections started as a small tailoring effort and grew into a full lifestyle brand covering clothing, footwear, bags and jewelry — each category built with the same attention to fit, fabric and finish.",
    founderSubBio: "Nana leads design and sourcing across all four product lines — clothing, footwear, bags and jewelry — and personally reviews every made-to-order piece before it ships. Her approach favours clean silhouettes, rich texture, and details that reward a closer look.",
    statProductLines: "4",
    statQualityChecked: "100%",
    statCitiesServed: "2",
    studioAddress: "12 Adeola Odeku Street, Victoria Island, Lagos, Nigeria",
    studioEmail: "hello@nfcollections.com",
    studioPhone: "+234 000 000 0000",
    studioHours: "Tuesday – Saturday, 10am – 6pm. Fittings by appointment."
  },
  products: [
    {
      id: "prod-1",
      name: "Adaeze Wrap Dress",
      category: "clothing",
      subtext: "Clothing · Ready-to-wear",
      price: 45000,
      formattedPrice: "₦45,000",
      image: "https://images.unsplash.com/photo-1756641964889-5a04b6e0f4f6?auto=format&fit=crop&w=700&q=80"
    },
    {
      id: "prod-2",
      name: "Zainab Two-Piece Set",
      category: "clothing",
      subtext: "Clothing · Made-to-order",
      price: 68000,
      formattedPrice: "₦68,000",
      image: "https://images.unsplash.com/photo-1756641964889-5a04b6e0f4f6?auto=format&fit=crop&w=700&q=80&sat=-20"
    },
    {
      id: "prod-3",
      name: "Amara Block Heel",
      category: "shoes",
      subtext: "Shoes · Sizes 36–42",
      price: 32000,
      formattedPrice: "₦32,000",
      image: "https://images.unsplash.com/photo-1525774279600-f3422303f134?auto=format&fit=crop&w=700&q=80"
    },
    {
      id: "prod-4",
      name: "Ronke Flat Sandal",
      category: "shoes",
      subtext: "Shoes · Sizes 36–42",
      price: 24500,
      formattedPrice: "₦24,500",
      image: "https://images.unsplash.com/photo-1525774279600-f3422303f134?auto=format&fit=crop&w=700&q=80&sat=-20"
    },
    {
      id: "prod-5",
      name: "Bisi Structured Tote",
      category: "bags",
      subtext: "Bags · Genuine leather",
      price: 55000,
      formattedPrice: "₦55,000",
      image: "https://images.unsplash.com/photo-1754573433744-bf2b79d0eaf4?auto=format&fit=crop&w=700&q=80"
    },
    {
      id: "prod-6",
      name: "Halima Evening Clutch",
      category: "bags",
      subtext: "Bags · Genuine leather",
      price: 38000,
      formattedPrice: "₦38,000",
      image: "https://images.unsplash.com/photo-1754573433744-bf2b79d0eaf4?auto=format&fit=crop&w=700&q=80&sat=-20"
    },
    {
      id: "prod-7",
      name: "Fatima Gold Set",
      category: "jewelry",
      subtext: "Jewelry · Necklace + earrings",
      price: 29000,
      formattedPrice: "₦29,000",
      image: "https://images.unsplash.com/photo-1758995115682-1452a1a9e35b?auto=format&fit=crop&w=700&q=80"
    },
    {
      id: "prod-8",
      name: "Aisha Stacking Rings",
      category: "jewelry",
      subtext: "Jewelry · Set of 3",
      price: 18000,
      formattedPrice: "₦18,000",
      image: "https://images.unsplash.com/photo-1758995115682-1452a1a9e35b?auto=format&fit=crop&w=700&q=80&sat=-20"
    }
  ],
  gallery: [
    {
      id: "gal-1",
      category: "clothing",
      image: "https://images.unsplash.com/photo-1756641964889-5a04b6e0f4f6?auto=format&fit=crop&w=1000&q=80",
      caption: "Clothing — window display, current season",
      size: "gspan-2 grow-2"
    },
    {
      id: "gal-2",
      category: "jewelry",
      image: "https://images.unsplash.com/photo-1758995115682-1452a1a9e35b?auto=format&fit=crop&w=600&q=80",
      caption: "Jewelry — Fatima Gold Set",
      size: ""
    },
    {
      id: "gal-3",
      category: "shoes",
      image: "https://images.unsplash.com/photo-1525774279600-f3422303f134?auto=format&fit=crop&w=600&q=80",
      caption: "Shoes — Amara Block Heel",
      size: ""
    },
    {
      id: "gal-4",
      category: "bags",
      image: "https://images.unsplash.com/photo-1754573433744-bf2b79d0eaf4?auto=format&fit=crop&w=600&q=80",
      caption: "Bags — Bisi Structured Tote",
      size: "grow-2"
    },
    {
      id: "gal-5",
      category: "studio",
      image: "https://images.unsplash.com/photo-1753164597544-a2736833357e?auto=format&fit=crop&w=600&q=80",
      caption: "Studio — where each piece begins",
      size: ""
    },
    {
      id: "gal-6",
      category: "clothing",
      image: "https://images.unsplash.com/photo-1756641964889-5a04b6e0f4f6?auto=format&fit=crop&w=1000&q=80&sat=-15",
      caption: "Clothing — Zainab Two-Piece Set",
      size: "gspan-2"
    },
    {
      id: "gal-7",
      category: "jewelry",
      image: "https://images.unsplash.com/photo-1758995115682-1452a1a9e35b?auto=format&fit=crop&w=600&q=80&sat=-15",
      caption: "Jewelry — Aisha Stacking Rings",
      size: ""
    },
    {
      id: "gal-8",
      category: "shoes",
      image: "https://images.unsplash.com/photo-1525774279600-f3422303f134?auto=format&fit=crop&w=600&q=80&sat=-15",
      caption: "Shoes — Ronke Flat Sandal",
      size: ""
    }
  ],
  messages: [
    {
      id: "msg-1",
      name: "Kemi Adeleke",
      email: "kemi@example.com",
      phone: "+234 802 123 4567",
      topic: "custom",
      message: "Hello! I am interested in ordering the Zainab Two-Piece Set in emerald green. Can I send my measurements?",
      status: "unread",
      createdAt: "2026-09-21T10:30:00Z"
    },
    {
      id: "msg-2",
      name: "Chidimma Eze",
      email: "chidimma@example.com",
      phone: "+234 813 987 6543",
      topic: "order",
      message: "Hi Nana, inquiring if the Bisi Structured Tote is in stock for delivery to Abuja?",
      status: "read",
      createdAt: "2026-09-20T14:15:00Z"
    }
  ]
};

let pool = null;

async function getPool() {
  if (pool) return pool;
  try {
    const connection = await mysql.createConnection({
      host: MYSQL_CONFIG.host,
      user: MYSQL_CONFIG.user,
      password: MYSQL_CONFIG.password,
      port: MYSQL_CONFIG.port
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${MYSQL_CONFIG.database}\`;`);
    await connection.end();

    pool = mysql.createPool(MYSQL_CONFIG);
    await initMySQLTables(pool);
    return pool;
  } catch (err) {
    console.warn('MySQL connection unavailable, falling back to persistent JSON storage:', err.message);
    return null;
  }
}

async function initMySQLTables(dbPool) {
  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS site_content (
      id INT PRIMARY KEY AUTO_INCREMENT,
      data JSON NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      subtext VARCHAR(255),
      price INT NOT NULL,
      formattedPrice VARCHAR(100),
      image TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS gallery (
      id VARCHAR(100) PRIMARY KEY,
      category VARCHAR(100) NOT NULL,
      image TEXT NOT NULL,
      caption TEXT NOT NULL,
      size VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(100),
      topic VARCHAR(100),
      message TEXT NOT NULL,
      status VARCHAR(50) DEFAULT 'unread',
      createdAt VARCHAR(100) NOT NULL
    );
  `);

  const [contentRows] = await dbPool.query('SELECT COUNT(*) as count FROM site_content');
  if (contentRows[0].count === 0) {
    await dbPool.query('INSERT INTO site_content (id, data) VALUES (1, ?)', [JSON.stringify(INITIAL_DATA.content)]);
  }

  const [productRows] = await dbPool.query('SELECT COUNT(*) as count FROM products');
  if (productRows[0].count === 0) {
    for (const p of INITIAL_DATA.products) {
      await dbPool.query(
        'INSERT INTO products (id, name, category, subtext, price, formattedPrice, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [p.id, p.name, p.category, p.subtext, p.price, p.formattedPrice, p.image]
      );
    }
  }

  const [galleryRows] = await dbPool.query('SELECT COUNT(*) as count FROM gallery');
  if (galleryRows[0].count === 0) {
    for (const g of INITIAL_DATA.gallery) {
      await dbPool.query(
        'INSERT INTO gallery (id, category, image, caption, size) VALUES (?, ?, ?, ?, ?)',
        [g.id, g.category, g.image, g.caption, g.size]
      );
    }
  }

  const [msgRows] = await dbPool.query('SELECT COUNT(*) as count FROM messages');
  if (msgRows[0].count === 0) {
    for (const m of INITIAL_DATA.messages) {
      await dbPool.query(
        'INSERT INTO messages (id, name, email, phone, topic, message, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [m.id, m.name, m.email, m.phone, m.topic, m.message, m.status, m.createdAt]
      );
    }
  }
}

// Memory / JSON storage fallback
let memoryStore = null;

function getFallbackDB() {
  if (memoryStore) return memoryStore;
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
      memoryStore = JSON.parse(JSON.stringify(INITIAL_DATA));
    } else {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      memoryStore = JSON.parse(content);
    }
  } catch (err) {
    if (!memoryStore) memoryStore = JSON.parse(JSON.stringify(INITIAL_DATA));
  }
  return memoryStore;
}

function saveFallbackDB(data) {
  memoryStore = data;
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {}
}

// DATA OPERATIONS

export async function getSiteContent() {
  const dbPool = await getPool();
  if (dbPool) {
    const [rows] = await dbPool.query('SELECT data FROM site_content WHERE id = 1');
    if (rows.length > 0) {
      let raw = rows[0].data;
      while (typeof raw === 'string') {
        try {
          raw = JSON.parse(raw);
        } catch (e) {
          break;
        }
      }
      return raw || INITIAL_DATA.content;
    }
  }
  const db = getFallbackDB();
  return db.content;
}

export async function updateSiteContent(newContent) {
  const dbPool = await getPool();
  if (dbPool) {
    const current = await getSiteContent();
    const updated = { ...current, ...newContent };
    await dbPool.query('UPDATE site_content SET data = ? WHERE id = 1', [JSON.stringify(updated)]);
    return updated;
  }
  const db = getFallbackDB();
  db.content = { ...db.content, ...newContent };
  saveFallbackDB(db);
  return db.content;
}

export async function getProducts() {
  const dbPool = await getPool();
  if (dbPool) {
    const [rows] = await dbPool.query('SELECT * FROM products ORDER BY created_at DESC');
    return rows;
  }
  const db = getFallbackDB();
  return db.products;
}

export async function addProduct(prod) {
  const id = `prod-${Date.now()}`;
  const priceNum = Number(prod.price) || 0;
  const newProd = {
    id,
    name: prod.name,
    category: prod.category || 'clothing',
    subtext: prod.subtext || `${prod.category} · Ready-to-wear`,
    price: priceNum,
    formattedPrice: prod.formattedPrice || `₦${priceNum.toLocaleString()}`,
    image: prod.image || 'https://images.unsplash.com/photo-1756641964889-5a04b6e0f4f6?auto=format&fit=crop&w=700&q=80'
  };

  const dbPool = await getPool();
  if (dbPool) {
    await dbPool.query(
      'INSERT INTO products (id, name, category, subtext, price, formattedPrice, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [newProd.id, newProd.name, newProd.category, newProd.subtext, newProd.price, newProd.formattedPrice, newProd.image]
    );
    return newProd;
  }

  const db = getFallbackDB();
  db.products.unshift(newProd);
  saveFallbackDB(db);
  return newProd;
}

export async function updateProduct(id, updated) {
  const dbPool = await getPool();
  const priceNum = Number(updated.price) || 0;
  const formattedPrice = updated.formattedPrice || `₦${priceNum.toLocaleString()}`;

  if (dbPool) {
    await dbPool.query(
      'UPDATE products SET name = ?, category = ?, subtext = ?, price = ?, formattedPrice = ?, image = ? WHERE id = ?',
      [updated.name, updated.category, updated.subtext, priceNum, formattedPrice, updated.image, id]
    );
    return { id, ...updated, price: priceNum, formattedPrice };
  }

  const db = getFallbackDB();
  const idx = db.products.findIndex(p => p.id === id);
  if (idx !== -1) {
    db.products[idx] = { ...db.products[idx], ...updated, price: priceNum, formattedPrice };
    saveFallbackDB(db);
    return db.products[idx];
  }
  return null;
}

export async function deleteProduct(id) {
  const dbPool = await getPool();
  if (dbPool) {
    await dbPool.query('DELETE FROM products WHERE id = ?', [id]);
    return true;
  }
  const db = getFallbackDB();
  db.products = db.products.filter(p => p.id !== id);
  saveFallbackDB(db);
  return true;
}

export async function getGallery() {
  const dbPool = await getPool();
  if (dbPool) {
    const [rows] = await dbPool.query('SELECT * FROM gallery ORDER BY created_at DESC');
    return rows;
  }
  const db = getFallbackDB();
  return db.gallery;
}

export async function addGalleryItem(item) {
  const id = `gal-${Date.now()}`;
  const newItem = {
    id,
    category: item.category || 'clothing',
    image: item.image || 'https://images.unsplash.com/photo-1756641964889-5a04b6e0f4f6?auto=format&fit=crop&w=1000&q=80',
    caption: item.caption || 'New Lookbook Item',
    size: item.size || ''
  };

  const dbPool = await getPool();
  if (dbPool) {
    await dbPool.query(
      'INSERT INTO gallery (id, category, image, caption, size) VALUES (?, ?, ?, ?, ?)',
      [newItem.id, newItem.category, newItem.image, newItem.caption, newItem.size]
    );
    return newItem;
  }

  const db = getFallbackDB();
  db.gallery.unshift(newItem);
  saveFallbackDB(db);
  return newItem;
}

export async function updateGalleryItem(id, updated) {
  const dbPool = await getPool();
  if (dbPool) {
    await dbPool.query(
      'UPDATE gallery SET category = ?, image = ?, caption = ?, size = ? WHERE id = ?',
      [updated.category, updated.image, updated.caption, updated.size, id]
    );
    return { id, ...updated };
  }
  const db = getFallbackDB();
  const idx = db.gallery.findIndex(g => g.id === id);
  if (idx !== -1) {
    db.gallery[idx] = { ...db.gallery[idx], ...updated };
    saveFallbackDB(db);
    return db.gallery[idx];
  }
  return null;
}

export async function deleteGalleryItem(id) {
  const dbPool = await getPool();
  if (dbPool) {
    await dbPool.query('DELETE FROM gallery WHERE id = ?', [id]);
    return true;
  }
  const db = getFallbackDB();
  db.gallery = db.gallery.filter(g => g.id !== id);
  saveFallbackDB(db);
  return true;
}

export async function getMessages() {
  const dbPool = await getPool();
  if (dbPool) {
    const [rows] = await dbPool.query('SELECT * FROM messages ORDER BY createdAt DESC');
    return rows;
  }
  const db = getFallbackDB();
  return db.messages;
}

export async function addMessage(msg) {
  const id = `msg-${Date.now()}`;
  const newMsg = {
    id,
    name: msg.name,
    email: msg.email,
    phone: msg.phone || '',
    topic: msg.topic || 'other',
    message: msg.message,
    status: 'unread',
    createdAt: new Date().toISOString()
  };

  const dbPool = await getPool();
  if (dbPool) {
    await dbPool.query(
      'INSERT INTO messages (id, name, email, phone, topic, message, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [newMsg.id, newMsg.name, newMsg.email, newMsg.phone, newMsg.topic, newMsg.message, newMsg.status, newMsg.createdAt]
    );
    return newMsg;
  }

  const db = getFallbackDB();
  db.messages.unshift(newMsg);
  saveFallbackDB(db);
  return newMsg;
}

export async function updateMessageStatus(id, status) {
  const dbPool = await getPool();
  if (dbPool) {
    await dbPool.query('UPDATE messages SET status = ? WHERE id = ?', [status, id]);
    const [rows] = await dbPool.query('SELECT * FROM messages WHERE id = ?', [id]);
    return rows[0] || null;
  }
  const db = getFallbackDB();
  const idx = db.messages.findIndex(m => m.id === id);
  if (idx !== -1) {
    db.messages[idx].status = status;
    saveFallbackDB(db);
    return db.messages[idx];
  }
  return null;
}

export async function deleteMessage(id) {
  const dbPool = await getPool();
  if (dbPool) {
    await dbPool.query('DELETE FROM messages WHERE id = ?', [id]);
    return true;
  }
  const db = getFallbackDB();
  db.messages = db.messages.filter(p => p.id !== id);
  saveFallbackDB(db);
  return true;
}
