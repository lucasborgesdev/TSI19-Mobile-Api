"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importStar(require("express"));
const body_parser_1 = require("body-parser");
void async function () {
    const db = await database_1.initDatabase();
    const app = express_1.default();
    app.use(body_parser_1.json());
    app.get("/pessoa", async (req, res) => {
        const result = await db.Pessoa.listar();
        res.json(result);
    });
    app.get("/pessoa/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await db.Pessoa.listarUm(id);
            express_1.response.json(result);
        }
        catch (e) {
            express_1.response.statusCode = 500;
            express_1.response.json(e);
        }
    });
    app.post("/pessoa", async (req, res) => {
        try {
            const result = await db.Pessoa.adicionar(req.body);
            express_1.response.json(result);
        }
        catch (e) {
            express_1.response.statusCode = 500;
            express_1.response.json(e);
        }
    });
    app.put("/pessoa/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await db.Pessoa.alterar(id, req.body);
            res.json(result);
        }
        catch (e) {
            express_1.response.statusCode = 500;
            express_1.response.json(e);
        }
    });
    app.delete("/pessoa/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await db.Pessoa.excluir(id);
            res.json(result);
        }
        catch (e) {
            express_1.response.statusCode = 500;
            express_1.response.json(e);
        }
    });
    app.listen(8080, () => console.log(" O PAI TÁ ON!"));
};
