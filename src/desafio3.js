// DESAFIO 3: Calcular juros com multa de 2,5% ao dia

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function calcularJuros(valorOriginal, dataVencimento) {
  const hoje = new Date();
  const vencimento = new Date(dataVencimento);
  
  
  hoje.setHours(0, 0, 0, 0);
  vencimento.setHours(0, 0, 0, 0);
  
 
  const diferencaEmMs = hoje - vencimento;
  const diasAtraso = Math.floor(diferencaEmMs / (1000 * 60 * 60 * 24));
  
  if (diasAtraso <= 0) {
    console.log("\n╔═══════════════════════════════════════╗");
    console.log("║           ✅ PAGAMENTO EM DIA         ║");
    console.log("╚═══════════════════════════════════════╝");
    console.log(`💰 Valor a pagar: R$ ${valorOriginal.toFixed(2)}`);
    console.log(`📅 Vencimento: ${vencimento.toLocaleDateString('pt-BR')}`);
    console.log(`🎉 Não há juros ou multas!`);
    console.log("═══════════════════════════════════════\n");
    return {
      emDia: true,
      valorTotal: valorOriginal
    };
  }
  
  const taxaMultaDiaria = 0.025; // 2,5%
  const percentualMultaTotal = diasAtraso * taxaMultaDiaria;
  const valorMulta = valorOriginal * percentualMultaTotal;
  const valorTotal = valorOriginal + valorMulta;

  console.log("\n╔═══════════════════════════════════════════════════╗");
  console.log("║         ⚠️  CÁLCULO DE JUROS E MULTAS ⚠️          ║");
  console.log("╚═══════════════════════════════════════════════════╝\n");
  console.log(`📊 DADOS DO PAGAMENTO:`);
  console.log(`   💵 Valor original: R$ ${valorOriginal.toFixed(2)}`);
  console.log(`   📅 Data de vencimento: ${vencimento.toLocaleDateString('pt-BR')}`);
  console.log(`   📆 Data de hoje: ${hoje.toLocaleDateString('pt-BR')}`);
  console.log(`   ⏰ Dias de atraso: ${diasAtraso} dia(s)`);
  console.log(`\n📈 CÁLCULO DA MULTA:`);
  console.log(`   📊 Taxa: 2,5% ao dia`);
  console.log(`   📉 Percentual aplicado: ${(percentualMultaTotal * 100).toFixed(2)}%`);
  console.log(`   💸 Valor da multa: R$ ${valorMulta.toFixed(2)}`);
  console.log(`\n${'='.repeat(51)}`);
  console.log(`💰 VALOR TOTAL A PAGAR: R$ ${valorTotal.toFixed(2)}`);
  console.log(`${'='.repeat(51)}\n`);
  
  return {
    emDia: false,
    valorOriginal: valorOriginal,
    diasAtraso: diasAtraso,
    percentualMulta: percentualMultaTotal * 100,
    valorMulta: valorMulta,
    valorTotal: valorTotal
  };
}


function validarData(dataStr) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dataStr)) {
    return false;
  }
  const data = new Date(dataStr);
  return data instanceof Date && !isNaN(data);
}

function menu() {
  console.log("\n┌──────────────────────────────────────────┐");
  console.log("│  💳 CALCULADORA DE JUROS E MULTAS 💳     │");
  console.log("├──────────────────────────────────────────┤");
  console.log("│  1. Calcular juros de um pagamento       │");
  console.log("│  2. Calcular múltiplos pagamentos        │");
  console.log("│  3. Sair                                 │");
  console.log("└──────────────────────────────────────────┘\n");
  
  rl.question("➤ Escolha uma opção: ", (opcao) => {
    switch(opcao) {
      case '1':
        calcularUmPagamento();
        break;
      case '2':
        calcularMultiplosPagamentos();
        break;
      case '3':
        console.log("\n👋 Até logo!\n");
        rl.close();
        break;
      default:
        console.log("\n❌ Opção inválida!\n");
        menu();
    }
  });
}

function calcularUmPagamento() {
  rl.question("\n💵 Digite o valor original (ex: 1000.50): R$ ", (valorStr) => {
    rl.question("📅 Digite a data de vencimento (AAAA-MM-DD): ", (data) => {
      const valor = parseFloat(valorStr);
      
      if (isNaN(valor) || valor <= 0) {
        console.log("\n❌ Valor inválido!\n");
        menu();
        return;
      }
      
      if (!validarData(data)) {
        console.log("\n❌ Data inválida! Use o formato AAAA-MM-DD (ex: 2025-11-15)\n");
        menu();
        return;
      }
      
      calcularJuros(valor, data);
      menu();
    });
  });
}

function calcularMultiplosPagamentos() {
  const pagamentos = [];
  
  function adicionarPagamento() {
    rl.question("\n💵 Valor (ou 'fim' para calcular): R$ ", (valorStr) => {
      if (valorStr.toLowerCase() === 'fim') {
        if (pagamentos.length === 0) {
          console.log("\n❌ Nenhum pagamento foi adicionado!\n");
          menu();
          return;
        }
        
        
        console.log("\n\n" + "=".repeat(60));
        console.log("           📊 RESUMO DE TODOS OS PAGAMENTOS");
        console.log("=".repeat(60));
        
        let totalOriginal = 0;
        let totalMultas = 0;
        let totalPagar = 0;
        
        pagamentos.forEach((pag, index) => {
          const resultado = calcularJuros(pag.valor, pag.data);
          totalOriginal += pag.valor;
          if (!resultado.emDia) {
            totalMultas += resultado.valorMulta;
            totalPagar += resultado.valorTotal;
          } else {
            totalPagar += resultado.valorTotal;
          }
        });
        
        console.log("\n" + "=".repeat(60));
        console.log(`💵 Total Original: R$ ${totalOriginal.toFixed(2)}`);
        console.log(`💸 Total em Multas: R$ ${totalMultas.toFixed(2)}`);
        console.log(`💰 TOTAL A PAGAR: R$ ${totalPagar.toFixed(2)}`);
        console.log("=".repeat(60) + "\n");
        
        menu();
        return;
      }
      
      const valor = parseFloat(valorStr);
      if (isNaN(valor) || valor <= 0) {
        console.log("❌ Valor inválido!");
        adicionarPagamento();
        return;
      }
      
      rl.question("📅 Data de vencimento (AAAA-MM-DD): ", (data) => {
        if (!validarData(data)) {
          console.log("❌ Data inválida!");
          adicionarPagamento();
          return;
        }
        
        pagamentos.push({ valor, data });
        console.log(`✅ Pagamento ${pagamentos.length} adicionado!`);
        adicionarPagamento();
      });
    });
  }
  
  console.log("\n📝 Adicione os pagamentos (digite 'fim' quando terminar)");
  adicionarPagamento();
}

// Inicia o programa
console.log("\n🎉 BEM-VINDO À CALCULADORA DE JUROS 🎉");
menu();