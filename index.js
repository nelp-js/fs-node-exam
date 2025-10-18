import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;
const API = "https://api.opendota.com/api";

app.use(cors());
app.use(express.json());

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


app.use((req, res) => {
    res.status(404).json({ error: "Page not found" });
  });
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
