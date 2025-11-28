const readline = require('readline');

const estoque = {
  "estoque": [
    {
      "codigoProduto": 101,
      "descricaoProduto": "Caneta Azul",
      "estoque": 150
    },
    {
      "codigoProduto": 102,
      "descricaoProduto": "Caderno Universitário",
      "estoque": 75
    },
    {
      "codigoProduto": 103,
      "descricaoProduto": "Borracha Branca",
      "estoque": 200
    },
    {
      "codigoProduto": 104,
      "descricaoProduto": "Lápis Preto HB",
      "estoque": 320
    },
    {
      "codigoProduto": 105,
      "descricaoProduto": "Marcador de Texto Amarelo",
      "estoque": 90
    }
  ]
};


let proximoId = 1;


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function encontrarProduto(codigo) {
  return estoque.estoque.find(p => p.codigoProduto === codigo);
}

function movimentarEstoque(codigoProduto, quantidade, tipoMovimentacao, descricao) {
  const produto = encontrarProduto(codigoProduto);
  
  if (!produto) {
    console.log(`\n❌ Produto com código ${codigoProduto} não encontrado!\n`);
    return;
  }
  
  const idMovimentacao = proximoId++;
  const estoqueAnterior = produto.estoque;

  if (tipoMovimentacao === 'entrada') {
    produto.estoque += quantidade;
  } else if (tipoMovimentacao === 'saida') {
    if (produto.estoque < quantidade) {
      console.log(`\n❌ Estoque insuficiente! Disponível: ${produto.estoque}\n`);
      return;
    }
    produto.estoque -= quantidade;
  }

  console.log("\n=== MOVIMENTAÇÃO REALIZADA ===");
  console.log(`ID da Movimentação: ${idMovimentacao}`);
  console.log(`Descrição: ${descricao}`);
  console.log(`Produto: ${produto.descricaoProduto} (Código: ${produto.codigoProduto})`);
  console.log(`Tipo: ${tipoMovimentacao.toUpperCase()}`);
  console.log(`Quantidade: ${quantidade}`);
  console.log(`Estoque Anterior: ${estoqueAnterior}`);
  console.log(`Estoque Final: ${produto.estoque}`);
  console.log("==============================\n");
}


function mostrarEstoque() {
  console.log("\n=== ESTOQUE ATUAL ===");
  estoque.estoque.forEach(p => {
    console.log(`[${p.codigoProduto}] ${p.descricaoProduto}: ${p.estoque} unidades`);
  });
  console.log("=====================\n");
}

function menu() {
  console.log("--- SISTEMA DE ESTOQUE ---");
  console.log("1. Ver estoque");
  console.log("2. Dar entrada");
  console.log("3. Dar saída");
  console.log("4. Sair");
  console.log("--------------------------");
  
  rl.question("Escolha uma opção: ", (opcao) => {
    switch(opcao) {
      case '1':
        mostrarEstoque();
        menu();
        break;
        
      case '2':
        rl.question("Código do produto: ", (codigo) => {
          rl.question("Quantidade: ", (qtd) => {
            rl.question("Descrição da movimentação: ", (desc) => {
              movimentarEstoque(parseInt(codigo), parseInt(qtd), 'entrada', desc);
              menu();
            });
          });
        });
        break;
        
      case '3':
        rl.question("Código do produto: ", (codigo) => {
          rl.question("Quantidade: ", (qtd) => {
            rl.question("Descrição da movimentação: ", (desc) => {
              movimentarEstoque(parseInt(codigo), parseInt(qtd), 'saida', desc);
              menu();
            });
          });
        });
        break;
        
      case '4':
        console.log("\nEncerrando sistema...");
        rl.close();
        break;
        
      default:
        console.log("\n❌ Opção inválida!\n");
        menu();
    }
  });
}

console.log("\n🔷 BEM-VINDO AO SISTEMA DE ESTOQUE 🔷\n");
mostrarEstoque();
menu();