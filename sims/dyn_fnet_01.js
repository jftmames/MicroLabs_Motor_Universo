export const meta = {
    id: "dyn_fnet_01",
    title: "El Tirón Invisible",
    area: "Dinámica",
    level: "1º Bach",
    estTimeSec: 90
};

export function mount(containerEl, services) {
    let state = { f1: 50, f2: 0, phase: 'hook', result: null };
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const render = () => {
        ctx.fillStyle = "#000"; ctx.fillRect(0,0,300,150);
        // El bloque
        ctx.fillStyle = services.ui.accent || "#38bdf8";
        ctx.fillRect(130, 60, 40, 40);
        // Vectores
        drawVector(130, 80, -state.f1, "F1");
        drawVector(170, 80, state.f2, "F2");
    };

    function drawVector(x, y, len, label) {
        if (len === 0) return;
        ctx.strokeStyle = "white"; ctx.beginPath();
        ctx.moveTo(x, y); ctx.lineTo(x + len, y); ctx.stroke();
        ctx.fillText(label, x + len/2, y - 5);
    }

    const showHook = () => {
        containerEl.innerHTML = `<h2>${meta.title}</h2><p>Dos personas tiran del bloque. F1 tira con 50N a la izquierda. ¿Cuánta fuerza debe hacer F2 para que el bloque no se mueva?</p>`;
        const btn = services.ui.button("Predecir", () => {
            state.phase = 'action';
            showAction();
        });
        containerEl.appendChild(btn);
    };

    const showAction = () => {
        containerEl.innerHTML = `<h3>Ajusta F2</h3>`;
        containerEl.appendChild(canvas);
        const slider = services.ui.slider("Fuerza F2 (Derecha)", 0, 100, 0, (v) => {
            state.f2 = v;
            if (v === 50) {
                services.saveAttempt(meta.id, { success: true });
                alert("¡Equilibrio alcanzado! Fuerza Neta = 0");
            }
        });
        containerEl.appendChild(slider);
    };

    showHook();
    const anim = setInterval(render, 30);

    return { destroy: () => clearInterval(anim) };
}
