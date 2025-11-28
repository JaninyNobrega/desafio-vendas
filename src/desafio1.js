// DESAFIO 1: Calcular comissão de vendedores (lendo de arquivo JSON)

const fs = require('fs');
const path = require('path');

// Caminho para o arquivo JSON
const caminhoArquivo = path.join(__dirname, '..', 'data', 'vendas.json');

// Função que calcula a comissão de uma venda
function calcularComissao(valorVenda) {
  if (valorVenda < 100) {
    return 0; // Não gera comissão
  } else if (valorVenda < 500) {
    return valorVenda * 0.01; // 1% de comissão
  } else {
    return valorVenda * 0.05; // 5% de comissão
  }
}

// Função principal
function processarComissoes() {
  try {
    // Lê o arquivo JSON
    const dados = fs.readFileSync(caminhoArquivo, 'utf8');
    const vendas = JSON.parse(dados);
    
    console.log('📂 Arquivo lido com sucesso!\n');
    
    // Objeto para armazenar as comissões de cada vendedor
    const comissoesPorVendedor = {};
    const detalhesPorVendedor = {};
    
    // Percorrer todas as vendas
    vendas.vendas.forEach(venda => {
      const vendedor = venda.vendedor;
      const comissao = calcularComissao(venda.valor);
      
      // Se o vendedor ainda não existe no objeto, inicializa
      if (!comissoesPorVendedor[vendedor]) {
        comissoesPorVendedor[vendedor] = 0;
        detalhesPorVendedor[vendedor] = {
          totalVendas: 0,
          quantidadeVendas: 0,
          vendasComComissao: 0
        };
      }
      
      // Acumula os dados
      comissoesPorVendedor[vendedor] += comissao;
      detalhesPorVendedor[vendedor].totalVendas += venda.valor;
      detalhesPorVendedor[vendedor].quantidadeVendas++;
      if (comissao > 0) {
        detalhesPorVendedor[vendedor].vendasComComissao++;
      }
    });
    
    // Mostrar os resultados
    console.log("╔════════════════════════════════════════════════════════╗");
    console.log("║          RELATÓRIO DE COMISSÕES - VENDEDORES          ║");
    console.log("╚════════════════════════════════════════════════════════╝\n");
    
    for (const vendedor in comissoesPorVendedor) {
      const comissaoTotal = comissoesPorVendedor[vendedor];
      const detalhes = detalhesPorVendedor[vendedor];
      const ticketMedio = detalhes.totalVendas / detalhes.quantidadeVendas;
      
      console.log(`👤 ${vendedor}`);
      console.log(`   💰 Comissão Total: R$ ${comissaoTotal.toFixed(2)}`);
      console.log(`   📊 Total em Vendas: R$ ${detalhes.totalVendas.toFixed(2)}`);
      console.log(`   🛒 Quantidade de Vendas: ${detalhes.quantidadeVendas}`);
      console.log(`   ✅ Vendas com Comissão: ${detalhes.vendasComComissao}`);
      console.log(`   📈 Ticket Médio: R$ ${ticketMedio.toFixed(2)}`);
      console.log('');
    }
    
    // Salvar resultado em um arquivo
    const resultado = {
      dataProcessamento: new Date().toISOString(),
      comissoes: comissoesPorVendedor,
      detalhes: detalhesPorVendedor
    };
    
    const caminhoSaida = path.join(__dirname, '..', 'data', 'resultado-comissoes.json');
    fs.writeFileSync(caminhoSaida, JSON.stringify(resultado, null, 2));
    
    console.log('✅ Resultado salvo em: data/resultado-comissoes.json\n');
    
  } catch (erro) {
    console.error('❌ Erro ao processar arquivo:', erro.message);
  }
}

// Executar o programa
processarComissoes();