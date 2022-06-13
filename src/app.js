import { getPartidas, criarPartida, editarPartida, deletarPartida, getTime } from './app-service'
import {
  schemaCriacaoPartida,
  schemaEdicaoPartida,
  schemaExcluirPartida,
  schemaBuscarTime,
} from './schema-validators'
import { validarIndexPartida, autenticarTime } from './app-validator'
import { validarSchema } from './app-utils'
import { autenticarUsuario } from './security/auth-service'

const { checkSchema } = require('express-validator')
const express = require('express')
export const app = express()
const port = process.env.PORTA_EXECUÇÃO

const fluxoBuscarPartidas = [getPartidas]

const fluxoBuscarTime = [validarSchema, autenticarTime, getTime]

const fluxoCriarPartida = [validarSchema, autenticarUsuario, criarPartida]

const fluxoEditarPartida = [validarSchema, autenticarUsuario, validarIndexPartida, editarPartida]

const fluxoDeletarPartida = [validarSchema, autenticarUsuario, validarIndexPartida, deletarPartida]

app.use(express.json())

app.get('/partidas', fluxoBuscarPartidas)

app.post('/partidas', checkSchema(schemaCriacaoPartida), fluxoCriarPartida)

app.put('/partidas/:id', checkSchema(schemaEdicaoPartida), fluxoEditarPartida)

app.delete('/partidas/:id', checkSchema(schemaExcluirPartida), fluxoDeletarPartida)

app.get('/time', checkSchema(schemaBuscarTime), fluxoBuscarTime)

app.listen(port, () => {
  console.log(`Aplicação executando na porta ${port}`)
})
