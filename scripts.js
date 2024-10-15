const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-task');
const modalErro = document.getElementById('erroModal'); // Seleciona a tela de erro

let MinhaListaDeItens = [];
let erroVisivel = false; // Variável de controle para a visibilidade do erro

function AdicionarNovaTarefa() {
    // Verifica se o campo de entrada está vazio
    if (input.value.trim() === '') {
        exibirErro(); // Exibe a tela de erro
        return; // Não adiciona a tarefa se o input estiver vazio
    }

    MinhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    });

    mostrarTarefa();
    input.value = ''; // Limpa o campo de entrada após adicionar a tarefa
}

function mostrarTarefa() {
    let NovaLi = '';

    MinhaListaDeItens.forEach((item, posicao) => {
        NovaLi += `
            <li class="task ${item.concluida ? "done" : ""}">
                <img src="./img/checked.png" alt="checked" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="./img/trash.png" alt="trash" onclick="deletaritem(${posicao})">
            </li>
        `;
    });

    listaCompleta.innerHTML = NovaLi;
    localStorage.setItem('lista', JSON.stringify(MinhaListaDeItens));
}

function concluirTarefa(posicao) {
    MinhaListaDeItens[posicao].concluida = !MinhaListaDeItens[posicao].concluida;
    mostrarTarefa();
}

function deletaritem(posicao) {
    MinhaListaDeItens.splice(posicao, 1);
    mostrarTarefa();
}

function recarregarTarefa() {
    const tarefasDoLocalStorage = localStorage.getItem('lista');

    if (tarefasDoLocalStorage) {
        MinhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
    }

    mostrarTarefa();
}

// Função para exibir a tela de erro
function exibirErro() {
    if (!erroVisivel) { // Verifica se o erro já está visível
        erroVisivel = true; // Define que o erro está visível
        modalErro.classList.add('show'); // Adiciona a classe que torna o modal visível

        // Fecha automaticamente após 5 segundos
        setTimeout(() => {
            fecharErro();
        }, 1000); // 5000 milissegundos = 5 segundos
    }
}

// Função para fechar a tela de erro
function fecharErro() {
    modalErro.classList.remove('show'); // Remove a classe para esconder o modal
    erroVisivel = false; // Permite que o erro seja exibido novamente
}

recarregarTarefa();
button.addEventListener('click', AdicionarNovaTarefa);
