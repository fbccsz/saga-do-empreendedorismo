document.addEventListener('DOMContentLoaded', () => {

    const produtosDB = {
        pocaoCura: { id: 'pocaoCura', nome: "Poção de Cura", custo: 10, precoVendaBase: 25, descricao: "Recupera 30 de HP.", tipo: 'consumivel', efeito: { tipo: 'CURA', valor: 30 } },
        espadaMadeira: { id: 'espadaMadeira', nome: "Espada de Madeira", custo: 50, precoVendaBase: 100, descricao: "Aumenta o ataque em +5.", tipo: 'equipavel', slot: 'arma', bonus: { ataque: 5 } }
    };
    const inimigosDB = {
        wasp: { id: 'wasp', nome: "Wasp", hpMax: 50, ataque: 8, recompensa: { dinheiro: 20, marca: 1, xp: 10 }, sprite: "monstros/monstro1.png" },
        devour: { id: 'devour', nome: "Devour", hpMax: 70, ataque: 12, recompensa: { dinheiro: 35, marca: 2, xp: 15 }, sprite: "monstros/monstro2.png" },
        lula: { id: 'lula', nome: "Lula", hpMax: 100, ataque: 15, recompensa: { dinheiro: 60, marca: 4, xp: 25 }, sprite: "monstros/monstro3.png" }
    };
    const missoesDB = {
        m001: { titulo: "Extermínio de Wasps", descricao: "Wasps estão causando problemas.", objetivo: { tipo: 'DERROTAR', idAlvo: 'wasp', quantidade: 3 }, recompensa: { dinheiro: 100, xp: 50, marca: 5 } },
        m002: { titulo: "Mestre de Poções", descricao: "Produza algumas poções.", objetivo: { tipo: 'PRODUZIR', idAlvo: 'pocaoCura', quantidade: 5 }, recompensa: { dinheiro: 50, xp: 30 } },
        m003: { titulo: "Eliminar Devours", descricao: "Devours estão atacando novamente!", objetivo: { tipo: 'DERROTAR', idAlvo: 'devour', quantidade: 3 }, recompensa: { dinheiro: 250, xp: 120, marca: 10 } }
    };
    
    let estadoDoJogo = {
        heroi: { nivel: 1, xp: 0, xpParaProximoNivel: 50, hp: 100, hpMax: 100, energia: 50, energiaMax: 50, statsBase: { ataque: 10, defesa: 0 }, equipamento: { arma: null, armadura: null } },
        localizacaoAtual: 'floresta',
        inimigoAtual: null, dinheiro: 100, marca: 0, vendedores: { pocao: 0, custoProximoVendedor: 50 }, inventario: { pocaoCura: 5, espadaMadeira: 1 },
        missoes: { m001: { progresso: 0, status: 'disponivel' }, m002: { progresso: 0, status: 'disponivel' }, m003: { progresso: 0, status: 'disponivel' }}
    };

    const ui = {
        dinheiro: document.getElementById('dinheiro'), marca: document.getElementById('marca-display'),
        heroi: { nivel: document.getElementById('heroi-nivel'), xpBar: document.getElementById('heroi-xp-bar'), xpTexto: document.getElementById('heroi-xp-texto'), hpBar: document.getElementById('heroi-hp-bar'), hpTexto: document.getElementById('heroi-hp-texto'), energiaBar: document.getElementById('heroi-energia-bar'), energiaTexto: document.getElementById('heroi-energia-texto') },
        inimigo: { container: document.getElementById('inimigo-container'), nome: document.getElementById('inimigo-nome'), sprite: document.getElementById('inimigo-sprite'), hpBar: document.getElementById('inimigo-hp-bar'), hpTexto: document.getElementById('inimigo-hp-texto') },
        botaoPrincipal: document.getElementById('botao-acao-principal'), combateAcoes: document.getElementById('combate-acoes'), logEventos: document.getElementById('log-eventos'),
        paineis: { equipamento: document.getElementById('painel-equipamento'), missoes: document.getElementById('painel-missoes'), producao: document.getElementById('painel-producao'), contratacao: document.getElementById('painel-contratacao') }
    };
    
    function getStatsHeroi() { const s = { ...estadoDoJogo.heroi.statsBase }; for (const slot in estadoDoJogo.heroi.equipamento) { const id = estadoDoJogo.heroi.equipamento[slot]; if (id) { const item = produtosDB[id]; if (item && item.bonus) { for (const b in item.bonus) s[b] = (s[b] || 0) + item.bonus[b]; } } } return s; }
    function equiparItem(id) { if (!estadoDoJogo.inventario[id] || estadoDoJogo.inventario[id] <= 0) return; const item = produtosDB[id]; if (item.tipo !== 'equipavel') return; desequiparItem(item.slot); estadoDoJogo.inventario[id]--; estadoDoJogo.heroi.equipamento[item.slot] = id; adicionarLog(`Você equipou ${item.nome}.`); renderizarTudo(); }
    function desequiparItem(slot) { const id = estadoDoJogo.heroi.equipamento[slot]; if (id) { estadoDoJogo.heroi.equipamento[slot] = null; estadoDoJogo.inventario[id] = (estadoDoJogo.inventario[id] || 0) + 1; adicionarLog(`${produtosDB[id].nome} desequipado.`); } }
    function usarHabilidade(id) { if (!estadoDoJogo.inimigoAtual) return; const h = estadoDoJogo.heroi; const s = getStatsHeroi(); switch (id) { case 'ataque': ataque(s.ataque); break; case 'ataque-poderoso': const custo = 15; if (h.energia >= custo) { h.energia -= custo; const dano = Math.floor(s.ataque * 1.8); ataque(dano, 'Ataque Poderoso'); } else { adicionarLog("Energia insuficiente!", "dano"); } break; case 'usar-pocao': if (estadoDoJogo.inventario.pocaoCura > 0) { const item = produtosDB.pocaoCura; estadoDoJogo.inventario.pocaoCura--; h.hp = Math.min(h.hpMax, h.hp + item.efeito.valor); adicionarLog(`Curou ${item.efeito.valor} de HP.`, "ganho"); renderizarTudo(); setTimeout(inimigoAtaca, 500); } else { adicionarLog("Sem Poções de Cura!", "dano"); } break; } }
    function ataque(dano, nome = 'Ataque') { const i = estadoDoJogo.inimigoAtual; i.hp -= dano; adicionarLog(`Com ${nome}, causou ${dano} de dano.`); renderizarTudo(); if (i.hp <= 0) derrotarInimigo(); else setTimeout(inimigoAtaca, 500); }
    function inimigoAtaca() { if (!estadoDoJogo.inimigoAtual) return; const s = getStatsHeroi(); const dano = Math.max(1, estadoDoJogo.inimigoAtual.ataque - (s.defesa || 0)); estadoDoJogo.heroi.hp -= dano; adicionarLog(`${estadoDoJogo.inimigoAtual.nome} causou ${dano} de dano.`, 'dano'); if (estadoDoJogo.heroi.hp <= 0) { estadoDoJogo.heroi.hp = 0; adicionarLog("Você foi derrotado!", 'dano'); ui.botaoPrincipal.disabled = true; ui.combateAcoes.classList.add('hidden'); } renderizarTudo(); }
    function derrotarInimigo() { const i = estadoDoJogo.inimigoAtual; adicionarLog(`Você derrotou ${i.nome}!`, 'ganho'); const { dinheiro, marca, xp } = i.recompensa; if (dinheiro) estadoDoJogo.dinheiro += dinheiro; if (marca) estadoDoJogo.marca += marca; if (xp) ganharXP(xp); verificarProgressoMissao('DERROTAR', i.id); estadoDoJogo.inimigoAtual = null; estadoDoJogo.heroi.energia = Math.min(estadoDoJogo.heroi.energiaMax, estadoDoJogo.heroi.energia + 10); ui.inimigo.container.classList.add('hidden'); ui.botaoPrincipal.classList.remove('hidden'); ui.combateAcoes.classList.add('hidden'); renderizarTudo(); }
    function procurarInimigo() { if (ui.botaoPrincipal.disabled) return; const k = Object.keys(inimigosDB); const id = k[Math.floor(Math.random() * k.length)]; const inimigo = { ...inimigosDB[id], hp: inimigosDB[id].hpMax }; estadoDoJogo.inimigoAtual = inimigo; adicionarLog(`Um ${inimigo.nome} apareceu!`); ui.inimigo.container.classList.remove('hidden'); ui.botaoPrincipal.classList.add('hidden'); ui.combateAcoes.classList.remove('hidden'); renderizarTudo(); }
    function ganharXP(qnt) { if(!qnt) return; estadoDoJogo.heroi.xp += qnt; adicionarLog(`Ganhou ${qnt} de XP!`, 'ganho'); if(estadoDoJogo.heroi.xp >= estadoDoJogo.heroi.xpParaProximoNivel) subirDeNivel(); }
    function subirDeNivel() { const h = estadoDoJogo.heroi; h.nivel++; h.xp -= h.xpParaProximoNivel; h.xpParaProximoNivel = Math.floor(h.xpParaProximoNivel*1.8); h.hpMax += 20; h.hp = h.hpMax; h.energiaMax += 10; h.energia = h.energiaMax; h.statsBase.ataque += 2; adicionarLog(`🎉 LEVEL UP! Nível ${h.nivel}! 🎉`, 'levelup'); }
    function verificarProgressoMissao(tipo, id) { for (const idMissao in estadoDoJogo.missoes) { const mE = estadoDoJogo.missoes[idMissao]; const mD = missoesDB[idMissao]; if (mE.status === 'ativa' && mD.objetivo.tipo === tipo && mD.objetivo.idAlvo === id) { mE.progresso++; renderizarMissoes(); } } }
    function iniciarMissao(id) { const m = estadoDoJogo.missoes[id]; if (m.status === 'disponivel') { m.status = 'ativa'; adicionarLog(`Missão '${missoesDB[id].titulo}' iniciada!`); renderizarMissoes(); } }
    function entregarMissao(id) { const mE = estadoDoJogo.missoes[id]; const mD = missoesDB[id]; if (mE.status === 'ativa' && mE.progresso >= mD.objetivo.quantidade) { mE.status = 'concluida'; const r = mD.recompensa; if (r.dinheiro) estadoDoJogo.dinheiro += r.dinheiro; if (r.xp) ganharXP(r.xp); if (r.marca) estadoDoJogo.marca += r.marca; adicionarLog(`Missão '${mD.titulo}' concluída!`, 'levelup'); renderizarMissoes(); } }
    function produzirItem(id) { const p = produtosDB[id]; if(estadoDoJogo.dinheiro >= p.custo){ estadoDoJogo.dinheiro -= p.custo; estadoDoJogo.inventario[id] = (estadoDoJogo.inventario[id] || 0) + 1; adicionarLog(`Produziu 1x ${p.nome}.`); verificarProgressoMissao('PRODUZIR', id); renderizarTudo(); } else { adicionarLog(`Dinheiro insuficiente.`, 'dano'); } }
    function contratarVendedor() { const v = estadoDoJogo.vendedores; if(estadoDoJogo.dinheiro >= v.custoProximoVendedor){ estadoDoJogo.dinheiro -= v.custoProximoVendedor; v.pocao++; v.custoProximoVendedor = Math.floor(v.custoProximoVendedor*1.5); adicionarLog(`Vendedor contratado!`, 'ganho'); renderizarTudo(); } else { adicionarLog(`Dinheiro insuficiente.`, 'dano'); } }
    function calcularRendaPassiva() { const v = estadoDoJogo.vendedores.pocao; if (v > 0 && estadoDoJogo.inventario.pocaoCura >= v) { const p = produtosDB.pocaoCura; const preco = Math.floor(p.precoVendaBase * (1 + estadoDoJogo.marca/1000)); estadoDoJogo.inventario.pocaoCura -=v; estadoDoJogo.dinheiro += v * preco; adicionarLog(`${v} poções vendidas por R$${preco} cada.`, 'ganho'); renderizarTudo(); } }
    function adicionarLog(msg, tipo = '') { ui.logEventos.innerHTML = `<p class="${tipo}">${new Date().toLocaleTimeString()}: ${msg}</p>` + ui.logEventos.innerHTML; }
    
    function mostrarPainel(idPainelParaMostrar, abaParaAtivar = null) {
        document.querySelectorAll('#coluna-direita .painel-conteudo').forEach(p => p.classList.add('hidden'));
        document.querySelectorAll('.aba').forEach(a => a.classList.remove('ativa'));
        const painel = document.getElementById(idPainelParaMostrar);
        if (painel) painel.classList.remove('hidden');
        if (abaParaAtivar) abaParaAtivar.classList.add('ativa');
    }

    function renderizarTudo() {
        const { heroi, inimigoAtual, dinheiro, marca } = estadoDoJogo;
        ui.dinheiro.textContent = dinheiro;
        ui.marca.textContent = marca;
        ui.heroi.nivel.textContent = heroi.nivel;
        ui.heroi.hpTexto.textContent = `${heroi.hp} / ${heroi.hpMax}`;
        ui.heroi.hpBar.style.width = `${(heroi.hp / heroi.hpMax) * 100}%`;
        ui.heroi.xpTexto.textContent = `${heroi.xp} / ${heroi.xpParaProximoNivel}`;
        ui.heroi.xpBar.style.width = `${(heroi.xp / heroi.xpParaProximoNivel) * 100}%`;
        ui.heroi.energiaTexto.textContent = `${heroi.energia} / ${heroi.energiaMax}`;
        ui.heroi.energiaBar.style.width = `${(heroi.energia / heroi.energiaMax) * 100}%`;
        if (inimigoAtual) {
            ui.inimigo.nome.textContent = inimigoAtual.nome;
            ui.inimigo.sprite.src = inimigoAtual.sprite;
            ui.inimigo.hpTexto.textContent = `${inimigoAtual.hp} / ${inimigoAtual.hpMax}`;
            ui.inimigo.hpBar.style.width = `${(inimigoAtual.hp / inimigoAtual.hpMax) * 100}%`;
        }
        renderizarPaineisGestao();
        renderizarMissoes();
    }
    
    function renderizarPaineisGestao() { const pProd = ui.paineis.producao; pProd.innerHTML = ''; for (const id in produtosDB) { const p = produtosDB[id]; const c = document.createElement('div'); c.className = 'card-gestao'; c.innerHTML = `<h4>${p.nome}</h4><p>${p.descricao}</p><p>Inventário: ${estadoDoJogo.inventario[id] || 0}</p><button class="btn-produzir" data-item="${id}">Produzir (R$ ${p.custo})</button>`; pProd.appendChild(c); } document.querySelectorAll('.btn-produzir').forEach(b => b.addEventListener('click', e => produzirItem(e.target.dataset.item))); const pContrat = ui.paineis.contratacao; pContrat.innerHTML = `<div class="card-gestao"><h4>Vendedor de Poções</h4><p>Vende poções automaticamente.</p><p>Contratados: ${estadoDoJogo.vendedores.pocao}</p><button id="btn-contratar">Contratar (R$ ${estadoDoJogo.vendedores.custoProximoVendedor})</button></div>`; document.getElementById('btn-contratar').addEventListener('click', contratarVendedor); const pEquip = document.getElementById('inventario-equipaveis'); pEquip.innerHTML = ''; let temEquip = false; for (const id in estadoDoJogo.inventario) { const p = produtosDB[id]; if (p && p.tipo === 'equipavel' && estadoDoJogo.inventario[id] > 0) { temEquip = true; const c = document.createElement('div'); c.className = 'card-equipavel'; c.innerHTML = `<span><strong>${p.nome}</strong> (x${estadoDoJogo.inventario[id]})</span><button class="btn-equipar" data-item-id="${id}">Equipar</button>`; pEquip.appendChild(c); } } if (!temEquip) pEquip.innerHTML = '<p>Nenhum item equipável.</p>'; document.querySelectorAll('.btn-equipar').forEach(b => b.addEventListener('click', e => equiparItem(e.target.dataset.itemId))); const s = getStatsHeroi(); for(const slot in estadoDoJogo.heroi.equipamento) { const id = estadoDoJogo.heroi.equipamento[slot]; const el = document.querySelector(`#slot-${slot} .item-equipado`); if(id) { const item = produtosDB[id]; let bTxt = Object.entries(item.bonus).map(([stat, val]) => `+${val} ${stat.slice(0,3).toUpperCase()}`).join(', '); el.textContent = `${item.nome} (${bTxt})`; } else { el.textContent = 'Nenhum'; } } }
    function renderizarMissoes() { const p = ui.paineis.missoes; p.innerHTML = ''; for (const id in missoesDB) { const mD = missoesDB[id]; const mE = estadoDoJogo.missoes[id]; const c = document.createElement('div'); c.className = 'card-missao'; if (mE.status === 'concluida') c.classList.add('concluida'); let pHtml = '', bHtml = ''; if (mE.status === 'disponivel') { bHtml = `<button data-missao-id="${id}" class="btn-iniciar">Iniciar</button>`; } else if (mE.status === 'ativa') { const prog = Math.min(mE.progresso, mD.objetivo.quantidade); pHtml = `<p class="progresso-missao">${mD.objetivo.tipo}: ${prog}/${mD.objetivo.quantidade}</p>`; const pode = mE.progresso >= mD.objetivo.quantidade; bHtml = `<button data-missao-id="${id}" class="btn-entregar" ${pode ? '' : 'disabled'}>Entregar</button>`; } else { pHtml = `<p class="progresso-missao">Concluída!</p>`; } const r = mD.recompensa; c.innerHTML = `<h4>${mD.titulo}</h4><p>${mD.descricao}</p>${pHtml}<p class="recompensa-missao">Recompensa: ${r.dinheiro||0} Ouro, ${r.xp} XP, ${r.marca||0} Marca</p>${bHtml}`; p.appendChild(c); } document.querySelectorAll('.btn-iniciar').forEach(b => b.addEventListener('click', e => iniciarMissao(e.target.dataset.missaoId))); document.querySelectorAll('.btn-entregar').forEach(b => b.addEventListener('click', e => entregarMissao(e.target.dataset.missaoId))); }
    function renderizarLoja() { const pacotes = [ { moedas: 100, preco: 'R$ 4,99', icone: '💰' }, { moedas: 550, preco: 'R$ 24,99', icone: '💰💰' }, { moedas: 1200, preco: 'R$ 49,99', icone: '💎' } ]; const container = document.getElementById('modal-corpo-loja'); if (!container) return; container.innerHTML = ''; pacotes.forEach(pacote => { const card = document.createElement('div'); card.className = 'card-pacote'; card.innerHTML = `<div class="icone-pacote">${pacote.icone}</div><div class="moedas-pacote">${pacote.moedas.toLocaleString('pt-BR')} Moedas</div><div class="preco-pacote">${pacote.preco}</div><button class="btn-comprar" data-moedas="${pacote.moedas}" data-preco="${pacote.preco}">Comprar</button>`; container.appendChild(card); }); document.querySelectorAll('#modal-loja .btn-comprar').forEach(button => { button.addEventListener('click', (e) => { const moedas = parseInt(e.target.dataset.moedas); const preco = e.target.dataset.preco; const confirmacao = window.confirm(`Você confirma a 'compra' de ${moedas.toLocaleString('pt-BR')} moedas por ${preco}?\n\nLembre-se: Esta é uma SIMULAÇÃO.`); if (confirmacao) { estadoDoJogo.dinheiro += moedas; adicionarLog(`Compra simulada! Você recebeu ${moedas.toLocaleString('pt-BR')} moedas.`, 'ganho'); document.getElementById('fundo-modal-loja').classList.add('hidden'); renderizarTudo(); } }); }); }

    function inicializar() {
        adicionarLog("Saga do Empreendedor iniciada!");

        const modalFundoLoja = document.getElementById('fundo-modal-loja');
        const botaoAbrirLoja = document.getElementById('botao-loja-header');
        const botaoFecharLoja = document.getElementById('modal-botao-fechar');
        botaoAbrirLoja.addEventListener('click', () => modalFundoLoja.classList.remove('hidden'));
        const fecharModalLoja = () => modalFundoLoja.classList.add('hidden');
        botaoFecharLoja.addEventListener('click', fecharModalLoja);
        modalFundoLoja.addEventListener('click', (event) => { if (event.target === modalFundoLoja) fecharModalLoja(); });

        const modalFundoMapa = document.getElementById('fundo-modal-mapa');
        const botaoAbrirMapa = document.getElementById('botao-mapa-flutuante');
        const botaoFecharMapa = document.getElementById('mapa-botao-fechar');
        botaoAbrirMapa.addEventListener('click', () => modalFundoMapa.classList.remove('hidden'));
        const fecharModalMapa = () => modalFundoMapa.classList.add('hidden');
        botaoFecharMapa.addEventListener('click', fecharModalMapa);
        modalFundoMapa.addEventListener('click', (event) => { if (event.target === modalFundoMapa) fecharModalMapa(); });

        document.querySelectorAll('.vila-pin').forEach(pin => {
            pin.addEventListener('click', (e) => {
                const idVila = e.currentTarget.dataset.vilaId;
                const nomeVila = e.currentTarget.textContent.trim();
                estadoDoJogo.localizacaoAtual = idVila;
                adicionarLog(`Você viajou para: ${nomeVila}!`);
                fecharModalMapa();
                renderizarTudo();
            });
        });

        document.querySelectorAll('.aba').forEach(aba => {
            aba.addEventListener('click', () => mostrarPainel(aba.dataset.alvo, aba));
        });
        
        ui.botaoPrincipal.addEventListener('click', procurarInimigo);
        document.getElementById('habilidade-ataque').addEventListener('click', () => usarHabilidade('ataque'));
        document.getElementById('habilidade-ataque-poderoso').addEventListener('click', () => usarHabilidade('ataque-poderoso'));
        document.getElementById('habilidade-usar-pocao').addEventListener('click', () => usarHabilidade('usar-pocao'));
        
        setInterval(calcularRendaPassiva, 10000);
        renderizarTudo();
        renderizarLoja();
    }

    inicializar();
});