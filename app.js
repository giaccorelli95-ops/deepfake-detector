document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const resultsSection = document.querySelector('.results-section');
    const resultsDiv = document.getElementById('results');

    // Gestione click sulla zona di upload
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    // Gestione del drag and drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--accent-color)';
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--border-color)';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--border-color)';
        
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    // Gestione selezione file tramite input
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });

    function handleFile(file) {
        // Mostra un messaggio di caricamento
        resultsSection.style.display = 'block';
        resultsDiv.innerHTML = 'Analisi in corso...';

        // Crea un FormData object
        const formData = new FormData();
        formData.append('file', file);

        // Qui dovresti inserire l'URL del tuo backend
        fetch('YOUR_BACKEND_URL/analyze', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Visualizza i risultati
            displayResults(data);
        })
        .catch(error => {
            resultsDiv.innerHTML = `Errore durante l'analisi: ${error.message}`;
        });
    }

    function displayResults(data) {
        // Formatta e visualizza i risultati
        resultsDiv.innerHTML = `
            <div class="result-item">
                <h3>Risultati dell'analisi:</h3>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            </div>
        `;
    }
});
