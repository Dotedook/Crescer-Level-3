import { getPartidas, criarPartida, editarPartida, deletarPartida } from './app-service'
import { validarIndexPartida } from './app-validator'
import { schemaPartida } from './schema-validators/partidaSchemaValidator'

const { checkSchema } = require('express-validator')
const express = require('express')
export const app = express()
const port = 3000

const fluxoBuscarPartidas = [getPartidas]

const fluxoCriarPartida = [criarPartida]

const fluxoEditarPartida = [validarIndexPartida, editarPartida]

const fluxoDeletarPartida = [validarIndexPartida, deletarPartida]

app.use(express.json())

app.get('/partidas', fluxoBuscarPartidas)

app.post('/partidas', checkSchema(schemaPartida), fluxoCriarPartida)

app.put('/partidas/:id', fluxoEditarPartida)

app.delete('/partidas/:id', fluxoDeletarPartida)

app.listen(port, () => {
  console.log(`Aplicação executando na porta ${port}`)
})
