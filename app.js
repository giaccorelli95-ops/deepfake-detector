document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const fileName = document.getElementById('fileName');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const loading = document.getElementById('loading');
    const resultContent = document.getElementById('resultContent');

    const API_KEY = 'rd_c2844e6917327e83_f8f1fac356d5ef247c5ba0ecc194e809'; // Sostituisci con la tua API key
    const API_ENDPOINT = 'https://api.realitydefender.ai/v1/analyze';

    let selectedFile = null;

    fileInput.addEventListener('change', (e) => {
        selectedFile = e.target.files[0];
        
        if (selectedFile) {
            fileName.textContent = `File selezionato: ${selectedFile.name}`;
            analyzeBtn.disabled = false;
            console.log('File details:', {
                name: selectedFile.name,
                type: selectedFile.type,
                size: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
            });
        } else {
            fileName.textContent = '';
            analyzeBtn.disabled = true;
        }
    });

    analyzeBtn.addEventListener('click', async () => {
        if (!selectedFile) return;

        try {
            loading.style.display = 'block';
            resultContent.innerHTML = '';
            analyzeBtn.disabled = true;

            console.log('Starting analysis...');

            // Test prima della chiamata API reale
            console.log('Testing API connectivity...');
            try {
                const testResponse = await fetch(API_ENDPOINT, {
                    method: 'OPTIONS',
                    headers: {
                        'X-API-KEY': API_KEY
                    }
                });
                console.log('API test response:', testResponse);
            } catch (testError) {
                console.log('API test failed:', testError);
            }

            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'X-API-KEY': API_KEY,
                    // Rimuoviamo Content-Type per lasciare che il browser lo imposti automaticamente con FormData
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response received:', data);
            displayResults(data);

        } catch (error) {
            console.error('Detailed error:', error);
            
            resultContent.innerHTML = `
                <div class="error">
                    <h4>Errore durante l'analisi</h4>
                    <p>Dettagli: ${error.message}</p>
                    <p>Suggerimenti:</p>
                    <ul>
                        <li>Verifica la tua connessione internet</li>
                        <li>Controlla che la tua API key sia corretta</li>
                        <li>Il file non deve superare i 10MB</li>
                        <li>Formati supportati: jpg, png, mp4, wav, mp3</li>
                    </ul>
                </div>
            `;
        } finally {
            loading.style.display = 'none';
            analyzeBtn.disabled = false;
        }
    });

    function displayResults(result) {
        resultContent.innerHTML = `
            <h3>Risultati dell'analisi:</h3>
            <div class="result-details">
                <p><strong>Status:</strong> ${result.status || 'N/A'}</p>
                ${result.prediction ? `
                    <p><strong>Prediction:</strong> ${result.prediction}</p>
                    <p><strong>Confidence:</strong> ${(result.confidence * 100).toFixed(2)}%</p>
                ` : ''}
            </div>
            <details>
                <summary>Dettagli completi</summary>
                <pre>${JSON.stringify(result, null, 2)}</pre>
            </details>
        `;
    }
});
