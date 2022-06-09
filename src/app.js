import {
  getPartidas,
  criarPartida,
  editarPartida,
  deletarPartida,
  validarSchema,
} from './app-service'
import { schemaCriacaoPartida, schemaEdicaoPartida } from './schema-validators'

const { checkSchema } = require('express-validator')
const express = require('express')
export const app = express()
const port = 3000

const fluxoBuscarPartidas = [getPartidas]

const fluxoCriarPartida = [validarSchema, criarPartida]

const fluxoEditarPartida = [validarSchema, editarPartida]

const fluxoDeletarPartida = [validarSchema, deletarPartida]

app.use(express.json())

app.get('/partidas', fluxoBuscarPartidas)

app.post('/partidas', checkSchema(schemaCriacaoPartida), fluxoCriarPartida)

app.put('/partidas/:id', checkSchema(schemaEdicaoPartida), fluxoEditarPartida)

app.delete('/partidas/:id', checkSchema(schemaEdicaoPartida), fluxoDeletarPartida)

app.listen(port, () => {
  console.log(`Aplicação executando na porta ${port}`)
})
