"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDatabase = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
async function initDatabase() {
    const db = await sqlite_1.open({
        filename: 'database.db',
        driver: sqlite3_1.default.Database
    });
    await db.exec(`
    CREATE TABLE IF NOT EXISTS pessoa (
      id          INTEGER  PRIMARY KEY AUTOINCREMENT  ,
      nome        TEXT     NOT NULL                   ,
      sobrenome   TEXT     NOT NULL                   ,
      email       TEXT     NOT NULL    UNIQUE         ,
      telefone    TEXT     NOT NULL
    );   
  `);
    class Pessoa {
        static async listar() {
            const result = await db.all(`select * from pessoa`);
            return result;
        }
        static async listarUm(id) {
            const result = await db.all(`SELECT * FROM pessoa WHERE id=:id`, { ":id": id });
            return result;
        }
        static async adicionar(dados) {
            const result = await db.run(`
          INSERT INTO 
                  pessoa(
                  nome, sobrenome, 
                  email, telefone
            ) 
            VALUES(
                :nome, :sobrenome, 
                :email, :telefone
            )
          `, {
                ":nome": dados.nome,
                ":sobrenome": dados.sobrenome,
                ":email": dados.email,
                ":telefone": dados.telefone
            });
            return { id: result.lastID
            };
        }
        static async alterar(id, dados) {
            const result = await db.run(`
        UPDATE 
          pessoa 
        SET 
          nome=:nome, sobrenome=:sobrenome, 
          email=:email, telefone=:telefone 
        WHERE 
          id=:id
     `, {
                ":id": id,
                ":nome": dados.nome,
                ":sobrenome": dados.sobrenome,
                ":email": dados.email,
                ":telefone": dados.telefone
            });
            return { linhasAfetadas: result.changes };
        }
        static async excluir(id) {
            const result = await db.run(`DELETE FROM pessoa WHERE id=:id`, { ":id": id });
            return { linhasAfetadas: result.changes };
        }
    }
    return { Pessoa };
}
exports.initDatabase = initDatabase;
