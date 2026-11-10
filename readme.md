# Saga do Empreendedorismo

**Status:** Experimento de jogo web.

Experimento de jogo web que combina exploração, combate e gerenciamento de recursos. O jogador evolui um personagem enquanto organiza produção, equipamentos, missões e vendedores.

**[Jogar demonstração](https://fbccsz.github.io/saga-do-empreendedorismo/)** · **[Portfólio](https://www.yshdev.me/#projects)**

## Mecânicas

- Progressão de personagem com vida, energia e experiência.
- Combate com ataque básico, habilidade e poções.
- Inventário, equipamentos e produção de itens.
- Missões, contratação de vendedores e gerenciamento de recursos.
- Mapa com diferentes regiões.
- Loja com aquisição **simulada** de moedas.

## Escopo do experimento

O nome do personagem é salvo no `localStorage` do navegador. Esse fluxo identifica o jogador localmente e não implementa autenticação de conta em um servidor.

As compras da loja são simulações e adicionam moedas ao estado do jogo. O projeto não processa pagamentos reais.

## Tecnologias

JavaScript · HTML · CSS · LocalStorage

## Executar localmente

```sh
git clone https://github.com/fbccsz/saga-do-empreendedorismo.git
cd saga-do-empreendedorismo
python -m http.server 8000
```

Abra `http://localhost:8000`, escolha o nome do personagem e inicie a jornada. Não há instalação de dependências frontend.

## Organização

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` e `login.js` | Entrada e nome do personagem |
| `game.html` e `game.js` | Interface, regras e estado do jogo |
| `loja.js` | Loja de moedas simulada |
| `style.css` e `login.css` | Estilos do jogo e da entrada |

## Publicação

A demonstração utiliza GitHub Pages. A automação de publicação está em `.github/workflows/static.yml`.

## Manutenção

Mantido por **ysh** · [Portfólio](https://www.yshdev.me/) · [Contato](mailto:yshdev@outlook.com)

