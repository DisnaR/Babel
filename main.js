class Aluno {
    constructor(nome, nota) {
        this.nome = nome;
        this.nota = nota;
    }
}

function filtrarAlunos(alunos) {
    return alunos.filter(aluno => aluno.nota >= 6);
}

function solicitarEntradaDados() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        readline.question('Digite o nome do aluno e sua nota, separados por vírgula (sem espaço): ', (input) => {
            readline.close();
            resolve(input);
        });
    });
}

async function processarEntradaUsuario() {
    const entrada = await solicitarEntradaDados();
    const partesEntrada = entrada.split(',');

    if (partesEntrada.length !== 2) {
        throw new Error('Entrada inválida. Por favor, insira o nome e a nota do aluno separados por vírgula (sem espaço).');
    }

    const nome = partesEntrada[0].trim();
    const nota = partesEntrada[1].trim();

    // Verificar se o nome contém apenas letras
    if (!nome.match(/^[A-Za-z]+$/)) {
        throw new Error('Nome inválido. Por favor, insira apenas letras no nome do aluno.');
    }

    // Verificar se a nota é um número válido
    if (isNaN(nota) || nota < 0 || nota > 10) {
        throw new Error('Nota inválida. Certifique-se de inserir um número entre 0 e 10.');
    }

    return new Aluno(nome, parseFloat(nota));
}

async function main() {
    const numeroAlunos = 3; // Modificado para 3 alunos

    const alunos = [];
    try {
        console.log('Insira os dados dos alunos (nome e nota, separados por vírgula e sem espaço):');
        for (let i = 0; i < numeroAlunos; i++) {
            const aluno = await processarEntradaUsuario();
            alunos.push(aluno);
        }

        const alunosAprovados = filtrarAlunos(alunos);

        console.log('\nAlunos aprovados:');
        alunosAprovados.forEach(aluno => {
            console.log(`Nome: ${aluno.nome}, Nota: ${aluno.nota}`);
        });
    } catch (error) {
        console.error('Ocorreu um erro:', error.message);
    }
}

main();