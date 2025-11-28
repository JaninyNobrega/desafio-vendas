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
    console.log("\n=== RESULTADO ===");
    console.log("✅ O pagamento está em dia! Não há juros.");
    console.log(`Valor a pagar: R$ ${valorOriginal.toFixed(2)}`);
    console.log("=================\n");
    return;
  }
  
  
  const taxaMultaDiaria = 0.025; // 2,5%
  const percentualMultaTotal = diasAtraso * taxaMultaDiaria;
  const valorMulta = valorOriginal * percentualMultaTotal;
  const valorTotal = valorOriginal + valorMulta;
  
  
  console.log("\n=== CÁLCULO DE JUROS ===");
  console.log(`Valor original: R$ ${valorOriginal.toFixed(2)}`);
  console.log(`Data de vencimento: ${vencimento.toLocaleDateString('pt-BR')}`);
  console.log(`Data de hoje: ${hoje.toLocaleDateString('pt-BR')}`);
  console.log(`Dias de atraso: ${diasAtraso}`);
  console.log(`Taxa de multa: 2,5% ao dia`);
  console.log(`Percentual total: ${(percentualMultaTotal * 100).toFixed(2)}%`);
  console.log(`Valor da multa: R$ ${valorMulta.toFixed(2)}`);
  console.log(`--------------------------`);
  console.log(`💰 VALOR TOTAL A PAGAR: R$ ${valorTotal.toFixed(2)}`);
  console.log("========================\n");
}


function iniciar() {
  console.log("\n💳 CALCULADORA DE JUROS E MULTAS 💳\n");
  
  rl.question("Digite o valor original (ex: 1000.50): R$ ", (valorStr) => {
    rl.question("Digite a data de vencimento (AAAA-MM-DD, ex: 2025-11-15): ", (data) => {
      const valor = parseFloat(valorStr);
      
      if (isNaN(valor) || valor <= 0) {
        console.log("\n❌ Valor inválido!\n");
        rl.close();
        return;
      }
      
      calcularJuros(valor, data);
      rl.close();
    });
  });
}


iniciar();