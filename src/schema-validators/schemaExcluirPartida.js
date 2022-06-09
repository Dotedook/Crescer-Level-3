export const schemaExcluirPartida = {
  id: {
    custom: {
      options: (_, { location }) => {
        if (location !== 'params') {          
          throw new Error('O ID deve vir como parâmetro para excluir uma partida!')
        }
        return true
      }
    }
  }
}
