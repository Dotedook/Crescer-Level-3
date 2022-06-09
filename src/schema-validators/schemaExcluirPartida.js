import { validarIndexPartida } from './validarIndexPartida'

export const schemaExcluirPartida = {
  id: {
    custom: {
      options: (value, { location }) => {
        if (location == 'params') {
          const indexValido = validarIndexPartida(value)
          if (indexValido) {
            return true
          }
          throw new Error('Partida não encontrada!')
        } else {
          throw new Error('O ID deve vir como parametro para excluir uma partida')
        }
      },
    },
  },
}
