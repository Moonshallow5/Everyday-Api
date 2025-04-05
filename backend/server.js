import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv"; // ✅ Import dotenv
import  pg from 'pg';
dotenv.config(); // ✅ Load environment variables

const app = express();
app.use(cors());
app.use(express.json()); // Required to parse JSON request body


const pool = new pg.Pool({ connectionString: process.env.DB_URL });

// Create todos table if it doesn't exist
pool.query(
  `CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT
  );`
);

// Get all todos
app.get("/todos", async (req, res) => {
  const result = await pool.query("SELECT * FROM todos");
  res.json(result.rows);
});

app.get('/summary',async (req,res)=>{
  try {
    const result = await pool.query('SELECT title, description FROM todos');
    const tasks = result.rows;

    if (!tasks.length) {
      return res.json({ summary: 'No tasks found.' });
    }

    // Build the prompt
    let prompt = 'These are my tasks for today:\n';
    tasks.forEach((task, idx) => {
      prompt += `${idx + 1}. ${task.title} - ${task.description}\n`;
    });
    prompt += '\nCan you give me a summary of what my tasks are and please limit your answers.';
    console.log(prompt)

    const ollamaResponse = await axios.post(' http://127.0.0.1:11434/api/generate', {
      model: 'llama3.2', 
      prompt: prompt,
      stream: false,
    });

    res.json({ summary: ollamaResponse.data.response });
  }catch(error){
    console.error(error.message)
    
  }
    

})

// Add a new todo
app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  const result = await pool.query(
    "INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *",
    [title, description]
  );
  res.json(result.rows[0]);
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const result = await pool.query(
    "UPDATE todos SET title = $1, description = $2 WHERE id = $3 RETURNING *",
    [title, description, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json(result.rows[0]);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  const result = await pool.query("DELETE FROM todos WHERE id = $1 RETURNING *", [id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json({ message: "Todo deleted successfully" });
});
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
