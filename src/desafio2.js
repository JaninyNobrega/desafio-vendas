// DESAFIO 2: Sistema de movimentação de estoque (com persistência em JSON)

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Caminhos dos arquivos
const caminhoEstoque = path.join(__dirname, '..', 'data', 'estoque.json');
const caminhoMovimentacoes = path.join(__dirname, '..', 'data', 'movimentacoes.json');

// Interface para ler entrada do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Carregar dados do arquivo
function carregarEstoque() {
  try {
    const dados = fs.readFileSync(caminhoEstoque, 'utf8');
    return JSON.parse(dados);
  } catch (erro) {
    console.error('❌ Erro ao carregar estoque:', erro.message);
    process.exit(1);
  }
}

function carregarMovimentacoes() {
  try {
    const dados = fs.readFileSync(caminhoMovimentacoes, 'utf8');
    return JSON.parse(dados);
  } catch (erro) {
    return { movimentacoes: [], proximoId: 1 };
  }
}

// Salvar dados no arquivo
function salvarEstoque(dados) {
  fs.writeFileSync(caminhoEstoque, JSON.stringify(dados, null, 2));
}

function salvarMovimentacoes(dados) {
  fs.writeFileSync(caminhoMovimentacoes, JSON.stringify(dados, null, 2));
}

// Variáveis globais
let estoque = carregarEstoque();
let movimentacoes = carregarMovimentacoes();

// Função para encontrar um produto pelo código
function encontrarProduto(codigo) {
  return estoque.estoque.find(p => p.codigoProduto === codigo);
}

// Função para realizar movimentação de estoque
function movimentarEstoque(codigoProduto, quantidade, tipoMovimentacao, descricao) {
  const produto = encontrarProduto(codigoProduto);
  
  if (!produto) {
    console.log(`\n❌ Produto com código ${codigoProduto} não encontrado!\n`);
    return;
  }
  
  const idMovimentacao = movimentacoes.proximoId++;
  const estoqueAnterior = produto.estoque;
  
  // Aplica a movimentação
  if (tipoMovimentacao === 'entrada') {
    produto.estoque += quantidade;
  } else if (tipoMovimentacao === 'saida') {
    if (produto.estoque < quantidade) {
      console.log(`\n❌ Estoque insuficiente! Disponível: ${produto.estoque}\n`);
      return;
    }
    produto.estoque -= quantidade;
  }
  
  // Registra a movimentação
  const movimentacao = {
    id: idMovimentacao,
    codigoProduto: codigoProduto,
    descricaoProduto: produto.descricaoProduto,
    tipo: tipoMovimentacao,
    quantidade: quantidade,
    descricao: descricao,
    estoqueAnterior: estoqueAnterior,
    estoqueFinal: produto.estoque,
    dataHora: new Date().toISOString()
  };
  
  movimentacoes.movimentacoes.push(movimentacao);
  
  // Salva nos arquivos
  salvarEstoque(estoque);
  salvarMovimentacoes(movimentacoes);
  
  // Exibe o resultado
  console.log("\n╔═══════════════════════════════════════╗");
  console.log("║    MOVIMENTAÇÃO REALIZADA COM SUCESSO ║");
  console.log("╚═══════════════════════════════════════╝");
  console.log(`📋 ID: ${idMovimentacao}`);
  console.log(`📝 Descrição: ${descricao}`);
  console.log(`📦 Produto: ${produto.descricaoProduto} (${produto.codigoProduto})`);
  console.log(`🔄 Tipo: ${tipoMovimentacao.toUpperCase()}`);
  console.log(`📊 Quantidade: ${quantidade}`);
  console.log(`📉 Estoque Anterior: ${estoqueAnterior}`);
  console.log(`📈 Estoque Final: ${produto.estoque}`);
  console.log(`🕐 Data/Hora: ${new Date().toLocaleString('pt-BR')}`);
  console.log("═══════════════════════════════════════\n");
}

// Função para mostrar o estoque atual
function mostrarEstoque() {
  console.log("\n╔═══════════════════════════════════════════════╗");
  console.log("║            ESTOQUE ATUAL                      ║");
  console.log("╚═══════════════════════════════════════════════╝\n");
  estoque.estoque.forEach(p => {
    const status = p.estoque < 100 ? '⚠️' : '✅';
    console.log(`${status} [${p.codigoProduto}] ${p.descricaoProduto}`);
    console.log(`   Quantidade: ${p.estoque} unidades\n`);
  });
}

// Função para mostrar histórico de movimentações
function mostrarHistorico() {
  console.log("\n╔═══════════════════════════════════════════════╗");
  console.log("║         HISTÓRICO DE MOVIMENTAÇÕES            ║");
  console.log("╚═══════════════════════════════════════════════╝\n");
  
  if (movimentacoes.movimentacoes.length === 0) {
    console.log("   Nenhuma movimentação registrada.\n");
    return;
  }
  
  movimentacoes.movimentacoes.slice(-10).reverse().forEach(mov => {
    const icone = mov.tipo === 'entrada' ? '⬆️' : '⬇️';
    console.log(`${icone} ID ${mov.id} - ${mov.descricaoProduto}`);
    console.log(`   ${mov.tipo.toUpperCase()} de ${mov.quantidade} unidades`);
    console.log(`   ${mov.descricao}`);
    console.log(`   ${new Date(mov.dataHora).toLocaleString('pt-BR')}\n`);
  });
}

// Menu principal
function menu() {
  console.log("┌─────────────────────────────────┐");
  console.log("│   📦 SISTEMA DE ESTOQUE 📦      │");
  console.log("├─────────────────────────────────┤");
  console.log("│ 1. Ver estoque                  │");
  console.log("│ 2. Dar entrada                  │");
  console.log("│ 3. Dar saída                    │");
  console.log("│ 4. Ver histórico                │");
  console.log("│ 5. Sair                         │");
  console.log("└─────────────────────────────────┘\n");
  
  rl.question("➤ Escolha uma opção: ", (opcao) => {
    switch(opcao) {
      case '1':
        mostrarEstoque();
        menu();
        break;
        
      case '2':
        rl.question("📦 Código do produto: ", (codigo) => {
          rl.question("📊 Quantidade: ", (qtd) => {
            rl.question("📝 Descrição da movimentação: ", (desc) => {
              movimentarEstoque(parseInt(codigo), parseInt(qtd), 'entrada', desc);
              menu();
            });
          });
        });
        break;
        
      case '3':
        rl.question("📦 Código do produto: ", (codigo) => {
          rl.question("📊 Quantidade: ", (qtd) => {
            rl.question("📝 Descrição da movimentação: ", (desc) => {
              movimentarEstoque(parseInt(codigo), parseInt(qtd), 'saida', desc);
              menu();
            });
          });
        });
        break;
        
      case '4':
        mostrarHistorico();
        menu();
        break;
        
      case '5':
        console.log("\n✅ Todos os dados foram salvos!");
        console.log("👋 Até logo!\n");
        rl.close();
        break;
        
      default:
        console.log("\n❌ Opção inválida!\n");
        menu();
    }
  });
}

// Inicia o programa
console.log("\n🎉 BEM-VINDO AO SISTEMA DE ESTOQUE 🎉");
console.log("💾 Carregando dados dos arquivos JSON...\n");
mostrarEstoque();
menu();