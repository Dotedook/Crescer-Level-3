import { getTime } from '../service/buscar-times-service/buscar-times-service'
import { deletarPartida } from '../service/deletar-partida-service/deletar-partida-service'
import { getPartidas } from '../service/buscar-partidas-service/buscar-partidas-service'
import { editarPartida } from '../service/editar-partida-service/editar-partida-service'
import { criarPartida } from '../service/criar-partida/criar-partida-service'
import {
  schemaCriacaoPartida,
  schemaEdicaoPartida,
  schemaExcluirPartida,
  schemaBuscarTime,
} from '../schema-validators'
import { validarIndexPartida, autenticarTime, validarSchema } from '../validator/app-validator'
import { autenticarUsuario } from '../security/auth-service'

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