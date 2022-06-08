<div id="top"></div>
<!-- Introdução -->
<br />
<div align="center">

  <h1 align="center">CreFUT ⚽</h3>

  <p align="center">
    Aplicação de controle de partidas de futebol para o <s>Crescer Level 3</s>
    </br>
  </p>
</div>

<!-- Sumário -->
<details>
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-creFUT-⚽">Sobre o CreFUT</a>
    </li>
    <li>
      <a href="#rotas-🛣️">Rotas</a>
      <ul>
        <li><a href="#edição-de-partida">Edição de Partida</a></li>
        <li><a href="#criação-de-partida">Criação de Partida</a></li>
      </ul>
    </li>
    <li>
      <a href="#contato-🤙">Contatos</a>
    </li>
  </ol>
</details>

<!-- Sobre o CreFUT -->

## Sobre o CreFUT ⚽

O CreFUT é uma aplicação feita em NODE.JS para controle e manutenção de placares de partidas de futebol.

<p align="right"><a href="#top">Voltar ao topo</a></p>

<!-- Rotas -->

## Rotas 🛣️

| Descrição       | Rota                    |
| --------------- | ----------------------- |
| Buscar partidas | GET /partida            |
| Criar partida   | POST /partida           |
| Editar partida  | PUT /partida/ID_PARTIDA |
| Deletar partida | DEL /partida/ID_PARTIDA |

### Criação de partida

Para criar uma partida é necessário seguir o modelo de objeto abaixo.</br>
````json
{
    "visitante": "Internacional",
    "casa": "Grêmio",
    "placarVisitante": 0,
    "placarCasa": 10
}
````


### Edição de partida

É possível editar qualquer informação de uma partida usando a chamada de edição, menos o ID. Não é necessário informar nenhum campo alêm do qual gostaria de editar.

<p align="right"><a href="#top">Voltar ao topo</a></p>

<!-- Contato -->

## Contato 🤙

Eduardo Kuhn - eduardo.kuhn@cwi.com.br

Juana Selistre - juana.selistre@cwi.com.br

Lucas Rodrigues - lucas.rodrigues@cwi.com.br

Victor Santos - victor.santos@cwi.com.br

<p align="right"><a href="#top">Voltar ao topo</a></p>
