<div align="center">

# ⚔️ Saga do Empreendedorismo

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/🎮_Game-RPG_Web-blueviolet?style=for-the-badge" alt="Game" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License" />
</p>

**Jogo web RPG de exploração, combate e gestão de recursos com missões e loja de moedas.**

**Web RPG game featuring exploration, combat and resource management with quests and a coin shop.**

[🎮 Jogar / Play](https://fbccsz.github.io/saga-do-empreendedorismo/) · [📂 Repositório](https://github.com/fbccsz/saga-do-empreendedorismo)

</div>

---

## 🇧🇷 Português

### Sobre o Projeto

**Saga do Empreendedorismo** é um experimento de jogo web estilo RPG construído inteiramente com HTML, CSS e JavaScript puro. O jogador evolui um personagem enquanto explora um mapa, enfrenta monstros em combate por turnos e gerencia recursos como dinheiro, equipamentos e vendedores.

> As compras da loja são **simulações** — o projeto não processa pagamentos reais. O nome do personagem é salvo no `localStorage` do navegador.

### ✨ Funcionalidades

- 🗡️ **Combate por turnos** — ataque básico, ataque poderoso e poções de cura
- 📈 **Progressão de personagem** — vida, energia, experiência e level up
- 🎒 **Inventário e equipamentos** — produza e equipe itens para aumentar seus atributos
- 📜 **Sistema de missões** — aceite, acompanhe o progresso e entregue missões por recompensas
- 🗺️ **Mapa interativo** — viaje entre Vila da Floresta, Posto da Montanha, Vila do Litoral e Oásis do Deserto
- 🏭 **Produção de itens** — gaste dinheiro para fabricar poções e equipamentos
- 👥 **Contratação de vendedores** — renda passiva automática com venda de poções
- 💎 **Loja premium simulada** — adquira moedas sem pagamento real

### 🕹️ Como Jogar

1. Acesse a [demonstração online](https://fbccsz.github.io/saga-do-empreendedorismo/)
2. Digite um nome de herói e uma senha (qualquer valor funciona)
3. Clique em **"Procurar Inimigo"** para iniciar combates
4. Use as abas da direita para gerenciar equipamento, missões, produção e vendedores
5. Abra o mapa clicando no botão 🗺️ no canto inferior direito

### 🏃 Executar Localmente

```bash
git clone https://github.com/fbccsz/saga-do-empreendedorismo.git
cd saga-do-empreendedorismo
# Sirva com qualquer servidor HTTP estático:
python -m http.server 8000
```

Acesse `http://localhost:8000` no navegador.

---

## 🇺🇸 English

### About the Project

**Saga do Empreendedorismo** (Entrepreneurship Saga) is a web RPG game experiment built entirely with vanilla HTML, CSS and JavaScript. The player levels up a character while exploring a map, fighting monsters in turn-based combat, and managing resources like money, equipment, and vendors.

> The shop purchases are **simulations** — the project does not process real payments. The character name is saved in the browser's `localStorage`.

### ✨ Features

- 🗡️ **Turn-based combat** — basic attack, power attack and healing potions
- 📈 **Character progression** — health, energy, experience and level up
- 🎒 **Inventory & equipment** — craft and equip items to boost your stats
- 📜 **Quest system** — accept, track progress and deliver quests for rewards
- 🗺️ **Interactive map** — travel between Forest Village, Mountain Outpost, Coast Village and Desert Oasis
- 🏭 **Item crafting** — spend gold to produce potions and equipment
- 👥 **Vendor hiring** — passive income through automatic potion sales
- 💎 **Simulated premium shop** — acquire coins without real payment

### 🕹️ How to Play

1. Open the [live demo](https://fbccsz.github.io/saga-do-empreendedorismo/)
2. Enter any hero name and password (any value works)
3. Click **"Procurar Inimigo"** (Find Enemy) to start battles
4. Use the right-side tabs to manage equipment, quests, crafting and vendors
5. Open the map by clicking the 🗺️ button in the bottom-right corner

### 🏃 Run Locally

```bash
git clone https://github.com/fbccsz/saga-do-empreendedorismo.git
cd saga-do-empreendedorismo
# Serve with any static HTTP server:
python -m http.server 8000
```

Open `http://localhost:8000` in your browser.

---

## 🛠️ Tech Stack / Tecnologias

| Tecnologia | Uso |
| --- | --- |
| **HTML5** | Estrutura das páginas de login e jogo |
| **CSS3** | Estilização medieval, animações e modais |
| **JavaScript** | Lógica de combate, missões, inventário e loja |
| **LocalStorage** | Persistência do nome do personagem |
| **GitHub Pages** | Hospedagem da demonstração online |

## 📁 Estrutura / Structure

```
saga-do-empreendedorismo/
├── index.html          # Página de login / Login page
├── game.html           # Interface do jogo / Game interface
├── game.js             # Lógica do jogo / Game logic
├── login.js            # Lógica de login / Login logic
├── style.css           # Estilos do jogo / Game styles
├── login.css           # Estilos do login / Login styles
├── coisas/             # Assets (moeda, estrela, mapa)
├── heroi/              # Sprite do herói / Hero sprite
└── monstros/           # Sprites dos monstros / Monster sprites
```

## 📸 Demo

🔗 **[Jogar Agora / Play Now](https://fbccsz.github.io/saga-do-empreendedorismo/)**

## 📄 Licença / License

Este projeto está licenciado sob a licença MIT — veja o arquivo [LICENSE](LICENSE) para detalhes.

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
