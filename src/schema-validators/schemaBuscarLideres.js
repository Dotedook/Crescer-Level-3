export const schemaBuscarLideres = {
  esporte: {
    in: ['headers'],
    notEmpty: true,
    errorMessage: 'O nome do esporte deve ser informado',
  },
  parametro: {
    in: ['headers'],
    notEmpty: true,
    errorMessage: 'O nome do parametro deve ser informado',
  },
}
