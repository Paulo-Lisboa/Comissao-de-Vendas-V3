// script.js

// Obtém referências aos elementos do DOM
const tabelaClientes = document.getElementById('tabela-clientes');
const adicionarClienteBtn = document.getElementById('adicionar-cliente');
const calcularBtn = document.getElementById('calcular');
const resultado = document.getElementById('resultado');
const imprimirBtn = document.getElementById('imprimir');

// Função para adicionar uma nova linha na tabela
adicionarClienteBtn.addEventListener('click', () => {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <td><input type="text" pattern="[A-Za-z ]+" required></td>
        <td><input type="number" step="0.01" required></td>
        <td><input type="number" step="0.01" required></td>
        <td><input type="date" required></td>
    `;
    tabelaClientes.appendChild(novaLinha);
});

// Função para obter os nomes dos próximos três meses
function obterProximosMeses() {
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth();
    const proximosMeses = [
        meses[(mesAtual + 1) % 12],
        meses[(mesAtual + 2) % 12],
        meses[(mesAtual + 3) % 12],
    ];
    return proximosMeses;
}

// Função para calcular a comissão
calcularBtn.addEventListener('click', () => {
    const linhas = tabelaClientes.querySelectorAll('tr');
    let totalAtivacoes = 0;
    let totalMensalidades = 0;
    let numVendas = 0;

    // Itera sobre as linhas da tabela para calcular os totais
    linhas.forEach(linha => {
        const inputs = linha.querySelectorAll('input');
        const valorAtivacao = parseFloat(inputs[1]?.value) || 0;
        const valorMensalidade = parseFloat(inputs[2]?.value) || 0;

        totalAtivacoes += valorAtivacao;
        totalMensalidades += valorMensalidade;
        if (valorAtivacao > 0 || valorMensalidade > 0) {
            numVendas++;
        }
    });

    // Calcula a comissão com base no número de vendas
    let comissaoAtivacao = 0;
    if (numVendas >= 1 && numVendas <= 4) {
        comissaoAtivacao = totalAtivacoes * 0.3;
    } else if (numVendas >= 7 && numVendas <= 8) {
        comissaoAtivacao = totalAtivacoes * 0.35;
    } else if (numVendas >= 10 && numVendas <= 14) {
        comissaoAtivacao = totalAtivacoes * 0.40;
    } else if (numVendas >= 15) {
        comissaoAtivacao = totalAtivacoes * 0.50;
    }

    // Calcula o bônus adicional de 5% para vendas acima de 8
    let bonusMensalidades = 0;
    if (numVendas > 8) {
        bonusMensalidades = totalMensalidades * 0.05;
    }

    // Obtém os próximos três meses
    const proximosMeses = obterProximosMeses();

    // Atualiza o resultado com os novos dados e o aviso de bonificação
    resultado.innerHTML = `
        <strong>Resultados:</strong><br>
        Total de Vendas: ${numVendas}<br>
        Total de Ativações: R$${totalAtivacoes.toFixed(2)}<br>
        Total de Mensalidades: R$${totalMensalidades.toFixed(2)}<br>
        Comissão sobre Ativações: R$${comissaoAtivacao.toFixed(2)}<br>
        Bônus sobre Mensalidades: R$${bonusMensalidades.toFixed(2)}<br>
        <strong>Total de Comissão: R$${(comissaoAtivacao + bonusMensalidades).toFixed(2)}</strong><br>
        <em>A bonificação será paga nos meses de ${proximosMeses.join(", ")}.</em>
    `;
});

/* Função para exportar o resumo como PDF
imprimirBtn.addEventListener('click', () => {
    const { jsPDF } = window.jspdf; // Obtém o objeto jsPDF
    const doc = new jsPDF();
    const resumoTexto = document.getElementById('resultado').innerHTML;

    // Adiciona o resumo ao PDF
    doc.setFontSize(14);
    doc.text("Resumo do Cálculo de Comissão", 10, 10);

    //Adiciona o conteudo ao PDF
    doc.html(document.getElementById('resultado'), {
        callback: function (doc) {
            doc.save('resumo-comissao.pdf'); //Salva o arquivo PDF
        },
        margin: [10, 10, 10, 10],
        x: 10,
        y: 20
    });
});*/

//Função para imprimir no windows
imprimirBtn.addEventListener('click', () => {
    window.print();
    /* Cria um iframe para isolar o conteúdo que será impresso
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.top = '-10000px';
    document.body.appendChild(iframe);
    
    // Insere o conteúdo a ser impresso no iframe
    const doc = iframe.contentWindow || iframe.contentDocument.document || iframe.contentDocument;
    doc.document.open();
    doc.document.write(`
        <html>
        <head>
            <title>Imprimir Resumo</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .resultado { font-size: 14px; line-height: 1.5; }
            </style>
        </head>
        <body>
            <h1>Resumo do Cálculo de Comissão</h1>
            ${document.getElementById('resultado').innerHTML}
        </body>
        </html>
    `);
    doc.document.close();

    // Aguarda o carregamento e chama a função de impressão
    iframe.onload = () => {
        doc.focus();
        doc.print();
        document.body.removeChild(iframe); // Remove o iframe após a impressão
    };*/
});