**Repository Name**: `ClusterVisualizer`

---

# ClusterVisualizer

**Beschreibung**:

ClusterVisualizer ist eine webbasierte Anwendung zur Visualisierung von Clustern in einem quadratischen Gittermuster. Die Anwendung bietet die Möglichkeit, Cluster mithilfe von SVG oder Canvas darzustellen und unterstützt einen Dunkelmodus für eine bessere Benutzererfahrung.

![Bildschirmfoto vom 2024-08-08 12-52-50](https://github.com/user-attachments/assets/b1e09d57-20eb-46c6-9a51-bfa996bd82f3)
![Bildschirmfoto vom 2024-08-08 12-52-55](https://github.com/user-attachments/assets/3fd993c0-b7f5-42e2-96c1-88b57475af0e)
![Bildschirmfoto vom 2024-08-08 12-53-09](https://github.com/user-attachments/assets/455d0afb-928b-4f16-99cd-e359d9e33731)



## Demo: [https://codepen.io/ogerly/pen/poXrNme](https://codepen.io/ogerly/pen/poXrNme)


## Inhaltsverzeichnis

1. [Features](#features)
2. [Installation](#installation)
3. [Nutzung](#nutzung)
4. [Projektstruktur](#projektstruktur)
5. [Detaillierte Code-Erklärung](#detaillierte-code-erklärung)
6. [Beitragen](#beitragen)
7. [Lizenz](#lizenz)

## Features

- **Dynamische Cluster-Anordnung**: Passt die Anzahl der angezeigten Cluster dynamisch an und ordnet sie in einem quadratischen Gitter an.
- **SVG und Canvas Unterstützung**: Wähle zwischen SVG- und Canvas-Darstellung für die Cluster.
- **Dunkelmodus**: Schalte zwischen Hell- und Dunkelmodus um, um die Sichtbarkeit je nach Vorlieben zu optimieren.
- **Responsives Design**: Die Anwendung ist für verschiedene Bildschirmgrößen optimiert und sorgt für eine konsistente Darstellung.

## Installation

1. **Repository Klonen**

   ```bash
   git clone https://github.com/DeinBenutzername/ClusterVisualizer.git
   ```

2. **In das Verzeichnis wechseln**

   ```bash
   cd ClusterVisualizer
   ```

3. **Starten**

   Öffne die `index.html` Datei in deinem bevorzugten Webbrowser.

## Nutzung

1. **Cluster-Anzahl auswählen**

   Verwende das Dropdown-Menü, um die gewünschte Anzahl von Clustern auszuwählen. Die Anwendung passt das Gitter entsprechend an.

2. **Darstellungstyp wählen**

   Ändere den URL-Parameter `type` zu `svg` oder `canvas`, um den Darstellungstyp zu wählen. Beispiel: `index.html?type=canvas`

3. **Dunkelmodus aktivieren/deaktivieren**

   Klicke auf den Button "Dunkelmodus" oder "Hellmodus", um zwischen den Modi zu wechseln.

## Projektstruktur

- `index.html`: Hauptdatei der Anwendung, die das Grundgerüst der Seite definiert.
- `styles.css`: Enthält die CSS-Stile für das Layout und das Design.
- `script.js`: Beinhaltet die JavaScript-Logik für die Cluster-Erstellung und -Darstellung.

## Detaillierte Code-Erklärung

### index.html

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>ClusterVisualizer</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>ClusterVisualizer</h1>
    </header>
    <main>
        <div>
            <label for="cluster-select">Anzahl der Cluster:</label>
            <select id="cluster-select">
                <option value="4">4</option>
                <option value="9">9</option>
                <option value="16">16</option>
                <option value="25">25</option>
                <option value="36">36</option>
            </select>
            <button id="toggle-dark-mode">Dunkelmodus</button>
        </div>
        <h2 id="example-title">Beispiel</h2>
        <div id="output" class="output-container"></div>
    </main>
    <script src="script.js"></script>
</body>
</html>
```

**Erklärung**:

- **Header**: Enthält den Titel der Anwendung.
- **Main**: Beinhaltet die Steuerungselemente (Cluster-Auswahl und Dunkelmodus-Toggle) sowie den Bereich, in dem die Cluster dargestellt werden.
- **Script**: Bindet die JavaScript-Datei ein, die die Logik der Anwendung steuert.

### styles.css

```css
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header {
  background-color: #333;
  color: white;
  padding: 10px 0;
  width: 100%;
  text-align: center;
}

main {
  width: 80%;
  margin: 20px auto;
  text-align: center;
}

#output {
  display: grid;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  margin: 0 auto;
}

svg, canvas {
  width: 150px;
  height: 150px;
}

body.dark-mode {
  background-color: #121212;
  color: white;
}

body.dark-mode svg,
body.dark-mode canvas {
  border-color: white;
}

body.dark-mode .dark-line {
  stroke: white;
}

body.dark-mode .dark-point {
  fill: white;
}
```

**Erklärung**:

- **Grundlegendes Layout**: Stellt sicher, dass die Elemente zentriert und ordentlich angeordnet sind.
- **Dunkelmodus**: Definiert die Farben für den Dunkelmodus, um eine angenehme Darstellung bei schwachem Licht zu gewährleisten.

### script.js

```javascript
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
```

**Erklärung**:

- **Dunkelmodus-Toggle**: Überwacht den Klick auf den Dunkelmodus-Button und passt die Darstellung entsprechend an.
- **Cluster-Erstellung**: Je nach ausgewählter Anzahl werden die Cluster entweder mit SVG oder Canvas gezeichnet.
- **Gitteranpassung**: Passt das Gitter dynamisch an die Anzahl der Cluster an, um ein ausgewogenes quadratisches Muster zu gewährleisten.

## Beitragen

Beiträge sind herzlich willkommen! Wenn du Fehler findest oder Verbesserungen vorschlagen möchtest, öffne bitte ein Issue oder erstelle einen Pull Request.




 
## Cross-Origin Resource Sharing (CORS) Server

Um das Projekt lokal zu testen und sicherzustellen, dass keine CORS-Probleme auftreten, wird ein einfacher Python-Server (`cors_server.py`) bereitgestellt. Dieser Server fügt die notwendigen CORS-Header hinzu, um den Zugriff von verschiedenen Quellen zu ermöglichen.

### Starten des CORS-Servers

1. Stelle sicher, dass Python installiert ist (Python 3 empfohlen).
2. Navigiere in das Projektverzeichnis.
3. Starte den Server mit folgendem Befehl:
   ```sh
   python3 cors_server.py
   ```
4. Der Server wird auf `http://localhost:8000` laufen.

Der `cors_server.py` ist im Projekt enthalten, um sicherzustellen, dass die HTML-Dateien problemlos von einem lokalen Server geladen werden können, ohne dass CORS-Probleme auftreten. Dies ist besonders nützlich, wenn das Projekt auf verschiedene Domains oder Subdomains verteilt wird.


## Lizenz

Dieses Projekt steht unter der [MIT Lizenz](LICENSE).
