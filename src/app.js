import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
const pool = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "senai",
  database: "",
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Olá Mundo");
  const [results] = await pool.query("SELECT * FROM ");
  res.send(results);
});

app.get('/listar_livros_lidos', (req, res) => {
  const { id } = req.params;
  const [results] = await pool.query(
    "SELECT * FROM listar_livros_lidos WHERE idlistar_livros_lidos=?",
    id
  );
  res.send(results);
});

app.post('/cadastrar_livro', (req, res)=> {
  try {
    const { body } = req;
    const [results] = await pool.query(
      "INSERT INTO cadastrar_livro (nome,idade) VALUES (?,?)",
      [body.nome, body.idade]
    );
  
    const [cadastrar_livroCriado] = await pool.query(
      "Select * from cadastrar_livro WHERE idcadastrar_livro=?",
      results.insertId
  );
  
    return res.status(201).json(cadastrar_livroCriado);
  } catch (error) {
    console.log(error);
  }

app.listen(3000, () => {
  console.log(`Servidor rodando na porta: 3000`);
});
