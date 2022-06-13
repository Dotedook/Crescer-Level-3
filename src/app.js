import { getPartidas, criarPartida, editarPartida, deletarPartida } from './app-service'
import { schemaCriacaoPartida, schemaEdicaoPartida } from './schema-validators'
import { validarIndexPartida } from './app-validator'
import { validarSchema } from './app-utils'

const { checkSchema } = require('express-validator')
const express = require('express')
export const app = express()
const port = process.env.PORTA_EXECUÇÃO

const fluxoBuscarPartidas = [getPartidas]

const fluxoCriarPartida = [validarSchema, criarPartida]

const fluxoEditarPartida = [validarSchema, validarIndexPartida, editarPartida]

const fluxoDeletarPartida = [validarSchema, validarIndexPartida, deletarPartida]

app.use(express.json())

app.get('/partidas', fluxoBuscarPartidas)

app.post('/partidas', checkSchema(schemaCriacaoPartida), fluxoCriarPartida)

app.put('/partidas/:id', checkSchema(schemaEdicaoPartida), fluxoEditarPartida)

app.delete('/partidas/:id', checkSchema(schemaEdicaoPartida), fluxoDeletarPartida)

app.listen(port, () => {
  console.log(`Aplicação executando na porta ${port}`)
})
