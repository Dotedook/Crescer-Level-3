export const schemaEdicaoPartida = {
  visitante: {
    in: ['body'],
    optional: { options: { nullable: true } },
    trim: true
  },
  casa: {
    in: ['body'],
    optional: { options: { nullable: true } },
    trim: true
  },
  placarVisitante: {
    in: ['body'],
    optional: { options: { nullable: true } },
    isInt: true,
    errorMessage: 'Propriedade Placar visitante deve ser apenas inteiros',
    toInt: true
  },
  placarCasa: {
    in: ['body'],
    optional: { options: { nullable: true } },
    isInt: true,
    errorMessage: 'Propriedade Placar visitante deve ser apenas inteiros',
    toInt: true
  },
  id: {
    custom: {
      options: (value, { location }) => {
        if (location !== 'params') {          
          throw new Error('O ID deve vir como parâmetro para excluir uma partida!')
        }
        return true
      }
    }
  }
}
