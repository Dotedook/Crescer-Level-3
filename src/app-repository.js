export let partidas = [
    {
        "id": 1,
        "data": "09/06/2022",
        "esporte": "Futebol",
        "casa": 1,
        "visitante": 2,
        "placar": {
            "casa": {
                "pontuacao": 2,
                "pontuadores": [
                    {
                        "jogador": 1,
                        "saldo": 2
                    }
                ]
            },
            "visitante": {
                "pontuacao": 0,
                "pontuadores": []
            }
        }
    }
]

export let times = [
    {
        "id": 1,
        "nome": "Brasil",
        "esporte": "Futebol",
        "vitorias": 20,
        "derrotas": 0,
        "jogadores": [1]
    },
    {
        "id": 2,
        "nome": "Alemanha",
        "esporte": "Futebol",
        "vitorias": 0,
        "derrotas": 20,
        "jogadores": [2]
    }
]

export let jogadores = [
    { 
        "id": 1,
        "nome": "Neymar Jr",
        "saldo": 804,
        "time": 1
    },
    { 
        "id": 2,
        "nome": "Toni Kroos",
        "saldo": 401,
        "time": 2
    }
]