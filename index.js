import express from "express";
import axios from "axios";
import cors from "cors";
import mysql from "mysql2";

const app = express();
const PORT = process.env.PORT || 3001;
const API = "https://api.opendota.com/api";

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "cdfile9090",
  database: "dota",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});


app.get("/api/heroes", async (req, res) => {
  try {
    const response = await axios.get(`${API}/heroes`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch heroes" });
  }
});

app.get("/api/teams", async (req, res) => {
  try {
    const response = await axios.get(`${API}/teams`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});

app.get("/api/promatches", async (req, res) => {
  try {
    const response = await axios.get(`${API}/proMatches`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pro matches" });
  }
});

app.post("/api/add-hero", (req, res) => {
  const {
    localized_name,
    primary_attr,
    attack_type,
    roles,
    base_attack_min,
    base_attack_max,
    base_health,
    base_mana,
  } = req.body;

  if (!localized_name || !primary_attr || !attack_type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `
    INSERT INTO heroes 
    (localized_name, primary_attr, attack_type, roles, base_attack_min, base_attack_max, base_health, base_mana)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      localized_name,
      primary_attr,
      attack_type,
      roles || "",
      base_attack_min || 0,
      base_attack_max || 0,
      base_health || 0,
      base_mana || 0,
    ],
    (err, result) => {
      if (err) {
        console.error("Failed to insert hero:", err);
        res.status(500).json({ error: "Database insert failed" });
      } else {
        res.json({ message: "Hero added successfully!", heroId: result.insertId });
      }
    }
  );
});

app.use((req, res) => {
  res.status(404).json({ error: "Page not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
