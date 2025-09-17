const shapeEl = document.getElementById('shape');
const widthEl = document.getElementById('width');
const heightEl = document.getElementById('height');
const fillEl = document.getElementById('fill');
const strokeEl = document.getElementById('stroke');
const strokeWidthEl = document.getElementById('strokeWidth');
const drawBtn = document.getElementById('draw');
const clearBtn = document.getElementById('clear');
const randomBtn = document.getElementById('random');
const svg = document.getElementById('canvas');

function clearCanvas() {
    while (svg.children.length > 1) svg.removeChild(svg.lastChild);
}

function centerCoordsFor(sizeW, sizeH) {
    const cx = 800 / 2;
    const cy = 420 / 2;
    return { cx, cy };
}

function drawShape(opts) {
    clearCanvas();
    const w = Math.max(1, +opts.width);
    const h = Math.max(1, +opts.height);
    const fill = opts.fill || 'transparent';
    const stroke = opts.stroke || 'none';
    const strokeWidth = +opts.strokeWidth || 0;
    const shape = opts.shape || 'square';
    const { cx, cy } = centerCoordsFor(w, h);

    if (shape === 'square' || shape === 'rectangle') {
        const x = cx - w / 2;
        const y = cy - h / 2;
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', w);
        rect.setAttribute('height', h);
        rect.setAttribute('fill', fill);
        if (strokeWidth > 0) {
            rect.setAttribute('stroke', stroke);
            rect.setAttribute('stroke-width', strokeWidth);
        }
        svg.appendChild(rect);
    } else if (shape === 'circle') {
        const r = Math.min(w, h) / 2;
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', r);
        circle.setAttribute('fill', fill);
        if (strokeWidth > 0) {
            circle.setAttribute('stroke', stroke);
            circle.setAttribute('stroke-width', strokeWidth);
        }
        svg.appendChild(circle);
    } else if (shape === 'ellipse') {
        const rx = w / 2;
        const ry = h / 2;
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        el.setAttribute('cx', cx);
        el.setAttribute('cy', cy);
        el.setAttribute('rx', rx);
        el.setAttribute('ry', ry);
        el.setAttribute('fill', fill);
        if (strokeWidth > 0) {
            el.setAttribute('stroke', stroke);
            el.setAttribute('stroke-width', strokeWidth);
        }
        svg.appendChild(el);
    } else if (shape === 'triangle') {
        const x1 = cx;
        const y1 = cy - h / 2;
        const x2 = cx - w / 2;
        const y2 = cy + h / 2;
        const x3 = cx + w / 2;
        const y3 = cy + h / 2;
        const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        poly.setAttribute('points', `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
        poly.setAttribute('fill', fill);
        if (strokeWidth > 0) {
            poly.setAttribute('stroke', stroke);
            poly.setAttribute('stroke-width', strokeWidth);
        }
        svg.appendChild(poly);
    } else if (shape === 'polygon') {
        const sides = 5;
        const radius = Math.min(w, h) / 2;
        const points = [];
        for (let i = 0; i < sides; i++) {
            const angle = -Math.PI / 2 + (2 * Math.PI * i) / sides;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            points.push(`${x},${y}`);
        }
        const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        poly.setAttribute('points', points.join(' '));
        poly.setAttribute('fill', fill);
        if (strokeWidth > 0) {
            poly.setAttribute('stroke', stroke);
            poly.setAttribute('stroke-width', strokeWidth);
        }
        svg.appendChild(poly);
    } else {
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', cx);
        c.setAttribute('cy', cy);
        c.setAttribute('r', 20);
        c.setAttribute('fill', fill);
        svg.appendChild(c);
    }
}

drawBtn.addEventListener('click', () => {
    const opts = {
        shape: shapeEl.value,
        width: widthEl.value,
        height: heightEl.value,
        fill: fillEl.value,
        stroke: strokeEl.value,
        strokeWidth: strokeWidthEl.value
    };
    drawShape(opts);
});

clearBtn.addEventListener('click', () => {
    clearCanvas();
});

randomBtn.
    addEventListener('click', () => {
        const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        shapeEl.value = ['square', 'rectangle', 'triangle', 'circle', 'ellipse', 'polygon'][Math.floor(Math.random() * 6)];
        widthEl.value = Math.floor(Math.random() * 280) + 40;
        heightEl.value = Math.floor(Math.random() * 220) + 40;
        fillEl.value = randomColor();
        strokeEl.value = randomColor();
        strokeWidthEl.value = Math.floor(Math.random() * 6);
        drawBtn.click();
    });

document.addEventListener('DOMContentLoaded', () => {
    drawBtn.click();
});

svg.addEventListener('click', (e) => {
    if (svg.children.length > 1) {
        clearCanvas();
    } else {
        drawBtn.click();
    }
}, false);