export const schemaPartida = {
  visitante: {
    notEmpty: true,
    errorMessage: 'Propriedade visitante está vázia!',
  },
  placarCasa: {
    in: ['body'],
    isInt: true,
    errorMessage: 'PlacarCasa inválido',
    toInt: true,
  },
}
