function escrevendoLetra() {
    function ativaLetra(elemento) {
        const arrTexto = elemento.innerHTML.split('');
        elemento.innerHTML = '';
        arrTexto.forEach((letra, i) => {
            setTimeout(() => {
                elemento.innerHTML += letra;
            }, 75 * i);
        });
    }

    const titulo = document.querySelector('.digitando');
    if (titulo) ativaLetra(titulo);
}
escrevendoLetra();

function ativacaoMenu() {
    const ativaMenu = document.querySelector('.fa-bars');
    const navMenu = document.querySelector('header .navegacao-primaria');

    if (!ativaMenu || !navMenu) return;

    function alternarMenu() {
        ativaMenu.classList.toggle('fa-x');
        navMenu.classList.toggle('ativado');
    }

    ativaMenu.addEventListener('click', alternarMenu);
    ativaMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            alternarMenu();
        }
    });

    // fecha o menu ao clicar em um link (útil no mobile)
    navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('ativado');
            ativaMenu.classList.remove('fa-x');
        });
    });
}
ativacaoMenu();

function sobreMim() {
    const experiencia = document.querySelectorAll('.experience_content div');
    const botao = document.querySelectorAll('.experience_content ul li');
    const education = document.querySelectorAll('.education_content div');
    const botaoEducation = document.querySelectorAll('.education_content ul li');

    if (!experiencia.length || !education.length) return;

    experiencia[0].classList.add('ativo');
    botao[0].classList.add('ativo');
    education[0].classList.add('ativo');
    botaoEducation[0].classList.add('ativo');

    function slideShow(index) {
        experiencia.forEach((divisao) => divisao.classList.remove('ativo'));
        botao.forEach((item) => item.classList.remove('ativo'));
        experiencia[index].classList.add('ativo');
        botao[index].classList.add('ativo');
    }

    function slideShow2(index) {
        education.forEach((divisao) => divisao.classList.remove('ativo'));
        botaoEducation.forEach((item) => item.classList.remove('ativo'));
        education[index].classList.add('ativo');
        botaoEducation[index].classList.add('ativo');
    }

    botao.forEach((event, index) => {
        event.addEventListener('click', () => slideShow(index));
    });

    botaoEducation.forEach((div, index) => {
        div.addEventListener('click', () => slideShow2(index));
    });
}
sobreMim();


// FILTRO DE PROJETOS
// Cada projeto tem um data-categoria (pode ter mais de uma categoria separada por espaço).
// "all" sempre mostra tudo; os outros filtros comparam com data-categoria.
function filtroProjetos() {
    const listaItens = document.querySelectorAll('.projects_armazenamento ul li');
    const botoesFiltro = document.querySelectorAll('.project_navegacao li');

    if (!listaItens.length || !botoesFiltro.length) return;

    function mostrarCategoria(categoria) {
        listaItens.forEach((item) => {
            const categoriasDoItem = (item.dataset.categoria || '').split(' ');
            const deveMostrar = categoria === 'all' || categoriasDoItem.includes(categoria);
            item.classList.toggle('ativo', deveMostrar);
        });
    }

    // estado inicial: mostra todos
    mostrarCategoria('all');

    botoesFiltro.forEach((botao, index) => {
        botao.addEventListener('click', () => {
            botoesFiltro.forEach((item) => item.classList.remove('ativo'));
            botoesFiltro[index].classList.add('ativo');

            if (botao.classList.contains('all')) mostrarCategoria('all');
            else if (botao.classList.contains('design')) mostrarCategoria('design');
            else if (botao.classList.contains('graphic')) mostrarCategoria('graphic');
            else if (botao.classList.contains('website')) mostrarCategoria('website');
        });
    });
}
filtroProjetos();
