# Deepfake-detector

Un'applicazione web per l'analisi di contenuti multimediali utilizzando RealityDefender API.

## Struttura del Progetto

```
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── backend/
│   ├── app.py
│   └── requirements.txt
└── README.md
```

## Installazione

### Backend

1. Crea un ambiente virtuale Python:
```bash
python -m venv venv
source venv/bin/activate  # Per Linux/Mac
# oppure
venv\Scripts\activate  # Per Windows
```

2. Installa le dipendenze:
```bash
pip install -r requirements.txt
# oppure
poetry install
```

3. Configura la tua API key RealityDefender:
   - Crea un file `.env` nella cartella backend
   - Aggiungi: `REALITY_DEFENDER_API_KEY=your-api-key`

4. Avvia il server:
```bash
python app.py
```

### Frontend

1. Il frontend è statico e può essere servito direttamente da GitHub Pages
2. Modifica l'URL del backend in `app.js` per puntare al tuo server

## Utilizzo

1. Apri l'applicazione nel browser
2. Trascina un file o clicca per selezionarlo
3. Attendi l'analisi
4. Visualizza i risultati

## Note

- Il backend deve essere ospitato su un server che supporti Python (es. Heroku, PythonAnywhere)
- Il frontend è ospitato su GitHub Pages
- Assicurati di configurare correttamente CORS nel backend per permettere le richieste dal tuo dominio GitHub Pages
