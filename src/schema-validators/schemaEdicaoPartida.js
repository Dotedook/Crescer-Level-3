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
    in: ['body', 'headers', 'cookies', 'query'],
    isEmpty: true,
    errorMessage: 'O ID deve vir como parâmetro para editar uma partida!'
  }
}
