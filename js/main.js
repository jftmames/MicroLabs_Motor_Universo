import { services } from './services.js';

const catalog = [
    { id: 'dyn_fnet_01', path: './sims/dyn_fnet_01.js' }
];

async function initFeed() {
    const feed = document.getElementById('app-feed');
    for (const item of catalog) {
        const container = document.createElement('div');
        container.className = 'microlab-container';
        feed.appendChild(container);
        
        const mod = await import(item.path);
        mod.mount(container, services);
    }
}

initFeed();
