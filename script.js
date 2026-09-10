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
// As categorias válidas são lidas direto das classes dos botões de filtro
// (all, design, graphic, games, website...), então adicionar uma categoria nova
// no HTML basta — não precisa mexer aqui.
//
// Animação: display:none/flex sozinho não anima. Por isso o card entra em
// duas etapas — 1) recebe .ativo (vira display:flex, mas ainda opacity:0),
// 2) no frame seguinte recebe .mostrar (dispara a transição de opacity/
// transform já definida no CSS). Cada card ganha um pequeno atraso
// (transition-delay) proporcional à sua posição, criando o efeito cascata.
function filtroProjetos() {
    const listaItens = document.querySelectorAll('.projects_armazenamento ul li');
    const botoesFiltro = document.querySelectorAll('.project_navegacao li');

    if (!listaItens.length || !botoesFiltro.length) return;

    const categoriasValidas = ['all', 'design', 'graphic', 'games', 'website'];
    const ATRASO_ENTRE_CARDS_MS = 60;

    // Se o usuário clicar em dois filtros bem rápido, a animação do clique
    // anterior (dentro do requestAnimationFrame) não pode "vazar" e mexer nos
    // cards do clique novo. Por isso cada chamada recebe um número (token);
    // só a chamada com o token mais recente tem permissão de aplicar 'mostrar'.
    let chamadaAtual = 0;

    function mostrarCategoria(categoria) {
        chamadaAtual += 1;
        const minhaChamada = chamadaAtual;

        // tira a animação de quem está saindo e some de cara com todos
        listaItens.forEach((item) => {
            item.classList.remove('mostrar');
            item.classList.remove('ativo');
            item.style.transitionDelay = '0s';
        });

        const itensParaMostrar = Array.from(listaItens).filter((item) => {
            const categoriasDoItem = (item.dataset.categoria || '').split(' ');
            return categoria === 'all' || categoriasDoItem.includes(categoria);
        });

        // etapa 1: entra no grid (display:flex) já com o delay calculado
        itensParaMostrar.forEach((item, i) => {
            item.style.transitionDelay = `${i * ATRASO_ENTRE_CARDS_MS}ms`;
            item.classList.add('ativo');
        });

        // etapa 2: no frame seguinte, dispara a transição de opacity/transform
        // — só se nenhum outro clique aconteceu nesse meio-tempo
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (minhaChamada !== chamadaAtual) return;
                itensParaMostrar.forEach((item) => item.classList.add('mostrar'));
            });
        });
    }

    // estado inicial: mostra todos, com animação de entrada
    mostrarCategoria('all');

    botoesFiltro.forEach((botao, index) => {
        botao.addEventListener('click', () => {
            botoesFiltro.forEach((item) => item.classList.remove('ativo'));
            botoesFiltro[index].classList.add('ativo');

            const categoriaClicada = categoriasValidas.find((categoria) =>
                botao.classList.contains(categoria)
            );

            if (categoriaClicada) mostrarCategoria(categoriaClicada);
        });
    });
}
filtroProjetos();
