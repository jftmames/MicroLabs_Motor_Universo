export const services = {
    rng: (seed) => {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    },
    ui: {
        button: (text, callback) => {
            const b = document.createElement('button');
            b.innerText = text;
            b.onclick = callback;
            return b;
        },
        slider: (label, min, max, val, cb) => {
            const container = document.createElement('div');
            container.innerHTML = `<label>${label}: <b>${val}</b></label><br>`;
            const s = document.createElement('input');
            s.type = 'range'; s.min = min; s.max = max; s.value = val;
            s.oninput = (e) => {
                container.querySelector('b').innerText = e.target.value;
                cb(parseFloat(e.target.value));
            };
            container.appendChild(s);
            return container;
        }
    },
    saveAttempt: (id, data) => {
        const history = JSON.parse(localStorage.getItem('ml_history') || '{}');
        history[id] = { ...data, timestamp: Date.now() };
        localStorage.setItem('ml_history', JSON.stringify(history));
    }
};
