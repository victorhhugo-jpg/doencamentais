document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    
    // Elementos do novo painel de acessibilidade
    const toggleBtn = document.getElementById('toggleAcessibilidade');
    const closeBtn = document.getElementById('closeAcessibilidade');
    const panel = document.getElementById('accessibilityPanel');


    // ------------------------------------
    // 1. FUNÇÕES DE APLICAÇÃO DE ESTILOS
    // ------------------------------------

    /**
     * Aplica a classe de tamanho de texto ao <body>
     * @param {string} size - 'grande', 'padrao', ou 'pequeno'
     */
    function applyTextSize(size) {
        // Remove classes antigas de texto
        body.classList.remove('text-large', 'text-default', 'text-small');
        
        // Adiciona a nova classe
        if (size === 'grande') {
            body.classList.add('text-large');
        } else if (size === 'pequeno') {
            body.classList.add('text-small');
        } 
        // Se for 'padrao', nenhuma classe é adicionada, usando o CSS base.
    }

    /**
     * Aplica a classe de largura ao <body>
     * @param {string} width - 'largo' ou 'padrao'
     */
    function applyLayoutWidth(width) {
        // Remove classes antigas de largura
        body.classList.remove('layout-default', 'layout-wide'); 

        // Adiciona a nova classe
        if (width === 'padrao') {
            body.classList.add('layout-default');
        } else {
            // Se for 'largo', nenhuma classe é adicionada, usando o CSS base.
        }
    }

    /**
     * Aplica a classe de esquema de cores ao <body>
     * @param {string} scheme - 'claro' ou 'escuro'
     */
    function applyColorScheme(scheme) {
        // Remove classes antigas de esquema de cores
        body.classList.remove('scheme-light', 'scheme-dark'); 

        // Adiciona a nova classe
        if (scheme === 'claro') {
            body.classList.add('scheme-light');
        } else if (scheme === 'escuro') {
            body.classList.add('scheme-dark');
        }
    }


    // ------------------------------------
    // 2. LISTENERS DE EVENTOS (Botão e Radios)
    // ------------------------------------
    
    // Listener para **ABRIR** o painel
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            panel.classList.remove('hidden');
            toggleBtn.style.display = 'none'; // Esconde o botão ao abrir o painel
            panel.setAttribute('aria-hidden', 'false');
        });
    }

    // Listener para **FECHAR** o painel
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            panel.classList.add('hidden');
            toggleBtn.style.display = 'block'; // Mostra o botão ao fechar o painel
            panel.setAttribute('aria-hidden', 'true');
        });
    }

    // Listener para o **TEXTO**
    document.querySelectorAll('input[name="tamanho-texto"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const size = e.target.id.split('-')[1]; // Pega 'grande', 'padrao', 'pequeno'
            applyTextSize(size);
        });
    });

    // Listener para a **LARGURA**
    document.querySelectorAll('input[name="largura"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const width = e.target.id.split('-')[1]; // Pega 'padrao', 'largo'
            applyLayoutWidth(width);
        });
    });
    
    // Listener para a **COR**
    document.querySelectorAll('input[name="cor"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const scheme = e.target.id.split('-')[1]; // Pega 'claro', 'escuro'
            applyColorScheme(scheme);
        });
    });

    // ------------------------------------
    // 3. INICIALIZAÇÃO
    // ------------------------------------
    
    // Aplica as classes iniciais baseadas nos botões "checked" no HTML (Se o painel existir)
    if (panel) {
        // Texto inicial
        const initialText = document.querySelector('input[name="tamanho-texto"]:checked').id.split('-')[1];
        applyTextSize(initialText);

        // Largura inicial
        const initialWidth = document.querySelector('input[name="largura"]:checked').id.split('-')[1];
        applyLayoutWidth(initialWidth);
        
        // Cor inicial
        const initialColor = document.querySelector('input[name="cor"]:checked').id.split('-')[1];
        applyColorScheme(initialColor);
        
        // Garante que o painel comece fechado e acessível para leitores de tela
        panel.classList.add('hidden');
        panel.setAttribute('aria-hidden', 'true');
    }

});