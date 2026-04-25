/* Aldia Premium Chat Controller */
(function() {
    const WEBHOOK_URL = 'https://n8n.srv1584504.hstgr.cloud/webhook/49df9dd1-40e8-4ead-b4bf-57006d49a439';
    let sessionId = localStorage.getItem('aldia_chat_session') || ('aldia_' + Math.random().toString(36).substr(2, 9));
    localStorage.setItem('aldia_chat_session', sessionId);

    // Inyectar HTML
    const chatHTML = `
        <div id="aldia-chat-trigger">Aldia.</div>
        <div id="aldia-chat-window">
            <div class="chat-header">
                <div class="header-info">
                    <div class="status-dot"></div>
                    <div>
                        <h4>Aldia Assistant</h4>
                        <p>Potenciado por IA</p>
                    </div>
                </div>
                <button id="close-chat">&times;</button>
            </div>
            <div id="chat-messages">
                <div class="msg bot">¡Hola! Soy el asistente de Aldia Project. ¿Cómo podemos ayudarte hoy?</div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Escribe tu mensaje..." autocomplete="off">
                <button id="send-msg">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatHTML);

    const win = document.getElementById('aldia-chat-window');
    const trig = document.getElementById('aldia-chat-trigger');
    const close = document.getElementById('close-chat');
    const send = document.getElementById('send-msg');
    const input = document.getElementById('chat-input');
    const msgs = document.getElementById('chat-messages');

    trig.onclick = () => {
        win.classList.toggle('active');
        if (win.classList.contains('active')) {
            setTimeout(() => input.focus(), 300);
        }
    };
    
    close.onclick = () => win.classList.remove('active');

    function addMsg(role, text) {
        const d = document.createElement('div');
        d.className = 'msg ' + role;
        d.innerText = text;
        msgs.appendChild(d);
        msgs.scrollTop = msgs.scrollHeight;
    }

    async function handleSend() {
        const val = input.value.trim();
        if (!val) return;

        addMsg('user', val);
        input.value = '';

        const typeInd = document.createElement('div');
        typeInd.className = 'msg bot typing';
        typeInd.innerHTML = '<span></span><span></span><span></span>';
        msgs.appendChild(typeInd);
        msgs.scrollTop = msgs.scrollHeight;

        try {
            const res = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*'
                },
                mode: 'cors',
                body: JSON.stringify({ chatInput: val, sessionId })
            });

            if (!res.ok) throw new Error('Error ' + res.status);

            // Intentamos leer como JSON, si falla leemos como texto
            const contentType = res.headers.get("content-type");
            let botReply = "";

            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await res.json();
                botReply = data.output || data.response || data.text || JSON.stringify(data);
            } else {
                botReply = await res.text();
            }

            if (typeInd.parentNode) msgs.removeChild(typeInd);
            addMsg('bot', botReply || "No he recibido una respuesta clara del servidor.");
        } catch (e) {
            if(typeInd.parentNode) msgs.removeChild(typeInd);
            addMsg('bot', 'Error de conexión. Por favor, inténtalo de nuevo.');
        }
    }

    send.onclick = handleSend;
    input.onkeypress = (e) => {
        if (e.key === 'Enter') handleSend();
    };
})();
