export let partidas = [
  {
    id: 1,
    data: '09/06/2022',
    esporte: 'Futebol',
    isEmpate: false,
    vencedor: 'CASA',
    casa: {
      time: 'Brasil',
      pontuacao: 2,
    },
    visitante: {
      time: 'Alemanha',
      pontuacao: 0,
    },
  },
]

export let times = [
  {
    id: 1,
    nome: 'Brasil',
    esporte: 'Futebol',
    vitorias: 20,
    derrotas: 0,
  },
  {
    id: 2,
    nome: 'Alemanha',
    esporte: 'Futebol',
    vitorias: 0,
    derrotas: 20,
  },
]
