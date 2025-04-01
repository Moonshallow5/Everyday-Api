import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv"; // ✅ Import dotenv

dotenv.config(); // ✅ Load environment variables

const app = express();
app.use(cors());

app.get("/crypto", async (req, res) => {
  console.log("API Key:", process.env.COIN_API_KEY);

  
    try {
      const response = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", {
        headers: { "X-CMC_PRO_API_KEY": process.env.COIN_API_KEY }
      });
      
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.listen(5000, () => console.log("Server running on port 5000"));
