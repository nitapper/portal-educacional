// Função para simular a ação do botão "Entrar" no cabeçalho
function loginFicticio() {
    alert("Botão 'Entrar' clicado! (Ação fictícia para o protótipo SenaiTech)");
}

document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll('.sidebar-nav a');
    const contentArea = document.querySelector('.content-area');

    // Guarda o conteúdo original da aula 5.2 (incluindo o Quiz)
    const conteudoOficial52 = contentArea.innerHTML;

    // Função que ativa o comportamento interativo das perguntas do Quiz
    function inicializarQuiz() {
        const quizItems = document.querySelectorAll('.quiz-item');

        quizItems.forEach(item => {
            const correctAnswer = item.getAttribute('data-correct');
            const buttons = item.querySelectorAll('.quiz-btn');
            const feedback = item.querySelector('.quiz-feedback');

            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const selected = btn.getAttribute('data-option');

                    // Desabilita os botões da pergunta após a resposta
                    buttons.forEach(b => b.disabled = true);

                    if (selected === correctAnswer) {
                        btn.classList.add('correct-choice');
                        feedback.textContent = "✓ Resposta Correta!";
                        feedback.className = "quiz-feedback correct-text";
                    } else {
                        btn.classList.add('wrong-choice');
                        // Destaca qual era a alternativa correta
                        const correctBtn = item.querySelector(`[data-option="${correctAnswer}"]`);
                        if (correctBtn) correctBtn.classList.add('correct-choice');

                        feedback.textContent = `✕ Resposta Incorreta. A alternativa certa era a letra (${correctAnswer.toUpperCase()}).`;
                        feedback.className = "quiz-feedback wrong-text";
                    }
                });
            });
        });
    }

    // Ativa o quiz na primeira carga da página
    inicializarQuiz();

    // Controle dos links da barra lateral
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const itemTexto = link.textContent.trim();

            if (itemTexto.includes("5.2")) {
                contentArea.innerHTML = conteudoOficial52;
                inicializarQuiz(); // Reativa a lógica do Quiz ao voltar ao módulo 5.2
            } else {
                contentArea.innerHTML = `
                    <div class="empty-state-card">
                        <div class="empty-icon">📂</div>
                        <h2>Ainda não tem conteúdo</h2>
                        <p>O módulo <strong>"${itemTexto}"</strong> está em desenvolvimento e será disponibilizado em breve.</p>
                        <button class="btn-voltar" id="btnVoltar52">Ir para o Módulo 5.2 (Disponível)</button>
                    </div>
                `;

                document.getElementById('btnVoltar52').addEventListener('click', () => {
                    const link52 = document.querySelector('a[href="#modulo-52"]');
                    if (link52) link52.click();
                });
            }
        });
    });
});