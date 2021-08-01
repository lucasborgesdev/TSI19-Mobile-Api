import { initDatabase } from "./database"
import express, { response } from "express"
import { json } from "body-parser"

void async function () {
  const db = await initDatabase();

  const app = express();
  app.use(json());

  app.get("/pessoa", async (req,res) => {
    const result = await db.Pessoa.listar();
    res.json(result);
    
  })
  app.get("/pessoa/:id", async (req,res) => {
    try {
      const id = parseInt(req.params.id);

      const result = await db.Pessoa.listarUm(id)

      res.json(result);
    }
    catch (e) {
      res.statusCode = 500
      res.json(e)
    }  
  })

  app.post("/pessoa", async (req, res) => {
    try {
      const result = await db.Pessoa.adicionar(req.body)
      res.json(result);
    }
    catch (e) {
      res.statusCode = 500;
      res.json(e);
    }

  })

  app.put("/pessoa/:id", async (req, res) => {
  
    try {

      const id = parseInt(req.params.id);

      const result = await db.Pessoa.alterar(id, req.body);

      res.json(result);

    }

    catch (e) {

      res.statusCode = 500;

      res.json(e);

    }
  })

  app.delete("/pessoa/:id", async (req, res) => {

    try {

      const id = parseInt(req.params.id);

      const result = await db.Pessoa.excluir(id)

      res.json(result)

    }

    catch (e) {

    res.statusCode = 500;

    res.json(e);

    }

  })

  app.listen(8080, ()  => console.log(" O PAI TÁ ON!"))
  
}();
