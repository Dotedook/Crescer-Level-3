export const schemaCriacaoPartida = {
  visitante: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'Propriedade visitante não pode ser vazia',
    trim: true, 
  },
  casa: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'Propriedade casa não pode ser vazia',
    trim: true,
  },
  placarVisitante: {
    in: ['body'],
    notEmpty: true,
    isInt: true,
    errorMessage: 'Propriedade Placar visitante deve ser apenas inteiros',
    toInt: true,
  },
  placarCasa: {
    in: ['body'],
    notEmpty: true,
    isInt: true,
    errorMessage: 'Propriedade Placar visitante deve ser apenas inteiros',
    toInt: true,
  },
}
