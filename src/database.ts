import sqlite3 from "sqlite3"
import { open } from "sqlite"

export async function initDatabase(){
  const db = await open({
    filename: 'database.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS pessoa (
      id          INTEGER  PRIMARY KEY AUTOINCREMENT  ,
      nome        TEXT     NOT NULL                   ,
      sobrenome   TEXT     NOT NULL                   ,
      email       TEXT     NOT NULL    UNIQUE         ,
      telefone    TEXT     NOT NULL
    );   
  `)

  type TipoDadosDePessoa = {
    nome: string
    sobrenome: string
    email: string
    telefone: string
  }

  class Pessoa {
    static async listar(){
      const result = await db.all(`select * from pessoa`);
      return result;
    }

    static async listarUm(id: number) {
      const result = await db.all(`SELECT * FROM pessoa WHERE id=:id`, { ":id": id })
      return result;
    }

    static async adicionar(dados: TipoDadosDePessoa) {
      const result = await db.run(
          `
          INSERT INTO 
                  pessoa(
                  nome, sobrenome, 
                  email, telefone
            ) 
            VALUES(
                :nome, :sobrenome, 
                :email, :telefone
            )
          `,
          {
             ":nome": dados.nome,
             ":sobrenome": dados.sobrenome,
             ":email": dados.email,
             ":telefone": dados.telefone
          }
      
        )
        return { id: result.lastID
    }

  }
  static async alterar(id: number, dados: TipoDadosDePessoa){

    const result = await db.run(
      `
        UPDATE 
          pessoa 
        SET 
          nome=:nome, sobrenome=:sobrenome, 
          email=:email, telefone=:telefone 
        WHERE 
          id=:id
     `,
      {
        ":id": id,
        ":nome": dados.nome,
        ":sobrenome": dados.sobrenome,
        ":email": dados.email,
        ":telefone": dados.telefone
      }
     )
     return { linhasAfetadas: result.changes }
  }
  static async excluir(id: number) {
    const result = await db.run(`DELETE FROM pessoa WHERE id=:id`, { ":id": id })
    return { linhasAfetadas: result.changes }
  }
}


return { Pessoa }
}