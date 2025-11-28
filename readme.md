# 📊 Desafio de Programação - Sistema de Vendas e Estoque

Projeto desenvolvido para resolver três desafios de programação: cálculo de comissões, controle de estoque e cálculo de juros com multa.


---

## 🎯 Sobre o Projeto

Este projeto contém três programas independentes que resolvem problemas comuns no mundo empresarial:

1. **Sistema de Comissões**: Calcula automaticamente a comissão de vendedores baseado em suas vendas
2. **Sistema de Estoque**: Gerencia entrada e saída de produtos com histórico de movimentações
3. **Calculadora de Juros**: Calcula multa por atraso de pagamento com taxa diária

---

## 🛠 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **JavaScript** - Linguagem de programação
- **Readline** - Módulo nativo do Node.js para entrada de dados

---

## ⚙️ Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- **Node.js** (versão 14 ou superior)
- **VSCode** (ou qualquer editor de código)
- **Terminal/Prompt de Comando**

### 📥 Como instalar o Node.js

1. Acesse: [https://nodejs.org/](https://nodejs.org/)
2. Baixe a versão **LTS** (recomendada)
3. Execute o instalador e siga as instruções
4. Após a instalação, verifique se foi instalado corretamente:

```bash
node --version
```

Deve aparecer algo como: `v20.11.0`

```bash
npm --version
```

Deve aparecer algo como: `10.2.4`

---

## 📦 Instalação

### Passo 1: Clone ou baixe o projeto

Se você tem o Git instalado:
```bash
git clone https://github.com/JaninyNobrega/desafio-vendas.git
cd desafio-vendas
```

## 🚀 Como Executar

Abra o terminal integrado do VSCode (`` Ctrl + ` `` ou Menu **Terminal > New Terminal**)

### Executar Desafio 1 (Comissões)
```bash
node src/desafio1.js
```

### Executar Desafio 2 (Estoque)
```bash
node src/desafio2.js
```

### Executar Desafio 3 (Juros)
```bash
node src/desafio3.js
```

---

## 📚 Desafios

### Desafio 1 - Cálculo de Comissões

**Objetivo**: Calcular a comissão total de cada vendedor baseado em suas vendas.

**Como funciona**:
- O programa lê um JSON com registro de vendas
- Calcula a comissão de cada venda seguindo as regras estabelecidas
- Agrupa por vendedor e exibe o total

**Saída esperada**:
```
=== COMISSÕES DOS VENDEDORES ===

João Silva: R$ 507.55
Maria Souza: R$ 445.53
Carlos Oliveira: R$ 372.60
Ana Lima: R$ 421.63
```

**Regras de comissão**:
- Vendas < R$ 100,00 → Sem comissão
- R$ 100,00 ≤ Vendas < R$ 500,00 → 1% de comissão
- Vendas ≥ R$ 500,00 → 5% de comissão

---

### Desafio 2 - Controle de Estoque

**Objetivo**: Sistema interativo para gerenciar entrada e saída de produtos no estoque.

**Como usar**:

1. Execute o programa
2. Você verá o menu:
   ```
   --- SISTEMA DE ESTOQUE ---
   1. Ver estoque
   2. Dar entrada
   3. Dar saída
   4. Sair
   --------------------------
   ```

3. **Opção 1 - Ver estoque**: Mostra todos os produtos e suas quantidades

4. **Opção 2 - Dar entrada**: Adicionar produtos ao estoque
   - Digite o código do produto (ex: 101)
   - Digite a quantidade (ex: 50)
   - Digite a descrição da movimentação (ex: "Compra do fornecedor X")

5. **Opção 3 - Dar saída**: Remover produtos do estoque
   - Digite o código do produto (ex: 102)
   - Digite a quantidade (ex: 10)
   - Digite a descrição da movimentação (ex: "Venda para cliente Y")

6. **Opção 4 - Sair**: Encerra o programa

**Exemplo de movimentação**:
```
=== MOVIMENTAÇÃO REALIZADA ===
ID da Movimentação: 1
Descrição: Compra de mais canetas
Produto: Caneta Azul (Código: 101)
Tipo: ENTRADA
Quantidade: 50
Estoque Anterior: 150
Estoque Final: 200
==============================
```

**Produtos disponíveis**:
- 101 - Caneta Azul (150 unidades)
- 102 - Caderno Universitário (75 unidades)
- 103 - Borracha Branca (200 unidades)
- 104 - Lápis Preto HB (320 unidades)
- 105 - Marcador de Texto Amarelo (90 unidades)

**Funcionalidades**:
- ✅ ID único para cada movimentação
- ✅ Descrição personalizada de cada movimentação
- ✅ Validação de estoque insuficiente
- ✅ Exibição do estoque anterior e final

---

### Desafio 3 - Cálculo de Juros

**Objetivo**: Calcular o valor total a pagar considerando multa por atraso.

**Como usar**:

1. Execute o programa
2. Digite o valor original (ex: 1000.50)
3. Digite a data de vencimento no formato **AAAA-MM-DD** (ex: 2025-11-15)
4. O programa calculará automaticamente os dias de atraso e a multa

**Exemplo de uso**:
```bash
💳 CALCULADORA DE JUROS E MULTAS 💳

Digite o valor original (ex: 1000.50): R$ 1000
Digite a data de vencimento (AAAA-MM-DD, ex: 2025-11-15): 2025-11-20
```

**Saída esperada**:
```
=== CÁLCULO DE JUROS ===
Valor original: R$ 1000.00
Data de vencimento: 20/11/2025
Data de hoje: 28/11/2025
Dias de atraso: 8
Taxa de multa: 2,5% ao dia
Percentual total: 20.00%
Valor da multa: R$ 200.00
--------------------------
💰 VALOR TOTAL A PAGAR: R$ 1200.00
========================
```

**Regra de cálculo**:
- Multa de **2,5% ao dia** sobre o valor original
- Se não houver atraso, não há multa
- Data de hoje é automaticamente obtida pelo sistema

**Formato de data**: 
- ✅ Correto: `2025-11-15` (Ano-Mês-Dia)
- ❌ Errado: `15/11/2025` ou `15-11-2025`

---

## 📝 Notas

- Os programas não salvam dados permanentemente (não usam banco de dados)
- Ao fechar o programa, todas as movimentações são perdidas
- Para uso em produção, seria necessário implementar persistência de dados

---

## 👨‍💻 Autor

Janiny Nóbrega - Desenvolvido como solução para o desafio técnico de programação.

---

## 📄 Licença

Este projeto é livre para uso educacional e em testes técnicos.

---

**Última atualização**: Novembro de 2025