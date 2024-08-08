document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const exampleType = urlParams.get('type') || 'svg';
    const clusterSelect = document.getElementById('cluster-select');
    const outputDiv = document.getElementById('output');
    const exampleTitle = document.getElementById('example-title');
    const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');

    toggleDarkModeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            toggleDarkModeBtn.textContent = 'Hellmodus';
        } else {
            toggleDarkModeBtn.textContent = 'Dunkelmodus';
        }
        updateExample();  // Redraw clusters to apply dark mode styles
    });

    function drawSVGClusters(count) {
        const svgNS = "http://www.w3.org/2000/svg";
        const size = 150;
        outputDiv.innerHTML = '';  // Clear existing content

        for (let i = 0; i < count; i++) {
            const svg = document.createElementNS(svgNS, 'svg');
            svg.setAttribute('width', size);
            svg.setAttribute('height', size);
            svg.style.border = '1px solid black';
            
            const points = [];
            for (let j = 0; j < 10; j++) {
                points.push({
                    x: Math.random() * size,
                    y: Math.random() * size
                });
            }
            
            points.forEach(point => {
                const circle = document.createElementNS(svgNS, 'circle');
                circle.setAttribute('cx', point.x);
                circle.setAttribute('cy', point.y);
                circle.setAttribute('r', 2);
                circle.setAttribute('fill', 'black');
                if (document.body.classList.contains('dark-mode')) {
                    circle.classList.add('dark-point');
                }
                svg.appendChild(circle);
            });
            
            for (let j = 0; j < points.length - 1; j++) {
                const line = document.createElementNS(svgNS, 'line');
                line.setAttribute('x1', points[j].x);
                line.setAttribute('y1', points[j].y);
                line.setAttribute('x2', points[j + 1].x);
                line.setAttribute('y2', points[j + 1].y);
                line.setAttribute('stroke', 'black');
                line.setAttribute('stroke-width', 1);
                if (document.body.classList.contains('dark-mode')) {
                    line.classList.add('dark-line');
                }
                svg.appendChild(line);
            }
            
            outputDiv.appendChild(svg);
        }

        adjustGridSize(count);
    }
    
    function drawCanvasClusters(count) {
        const size = 150;
        outputDiv.innerHTML = '';  // Clear existing content

        for (let i = 0; i < count; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            canvas.style.border = '1px solid black';
            const ctx = canvas.getContext('2d');
            
            const points = [];
            for (let j = 0; j < 10; j++) {
                points.push({
                    x: Math.random() * size,
                    y: Math.random() * size
                });
            }
            
            points.forEach(point => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = document.body.classList.contains('dark-mode') ? 'white' : 'black';
                ctx.fill();
            });
            
            for (let j = 0; j < points.length - 1; j++) {
                ctx.beginPath();
                ctx.moveTo(points[j].x, points[j].y);
                ctx.lineTo(points[j + 1].x, points[j + 1].y);
                ctx.strokeStyle = document.body.classList.contains('dark-mode') ? 'white' : 'black';
                ctx.stroke();
            }
            
            outputDiv.appendChild(canvas);
        }

        adjustGridSize(count);
    }

    function adjustGridSize(count) {
        const gridSize = Math.ceil(Math.sqrt(count));
        const container = document.querySelector('.output-container');
        container.style.display = 'grid';
        container.style.gridTemplateColumns = `repeat(${gridSize}, 150px)`;
        container.style.gridTemplateRows = `repeat(${gridSize}, 150px)`;
        container.style.gap = '10px';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        container.style.margin = '0 auto';
        container.style.width = `${gridSize * 150 + (gridSize - 1) * 10}px`;  // Set the width based on grid size
    }
    
    function updateExample() {
        const count = parseInt(clusterSelect.value, 10);
        if (exampleType === 'svg') {
            exampleTitle.textContent = `SVG Beispiel mit ${count} Clustern`;
            drawSVGClusters(count);
        } else if (exampleType === 'canvas') {
            exampleTitle.textContent = `Canvas Beispiel mit ${count} Clustern`;
            drawCanvasClusters(count);
        }
    }
    
    clusterSelect.addEventListener('change', updateExample);
    updateExample();  // Initial draw
});
