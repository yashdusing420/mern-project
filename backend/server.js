const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Dummy location API
app.get("/api/location", (req, res) => {
  res.json({ lat: 19.033, lng: 73.067, place: "Kharghar" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
