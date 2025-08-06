from flask import Flask, request, jsonify
from flask_cors import CORS
from realitydefender import RealityDefender
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Abilita CORS per permettere le richieste dal frontend

# Configura la tua API key
REALITY_DEFENDER_API_KEY = "your-api-key"
client = RealityDefender(api_key=REALITY_DEFENDER_API_KEY)

UPLOAD_FOLDER = 'temp_uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/analyze', methods=['POST'])
def analyze_file():
    if 'file' not in request.files:
        return jsonify({'error': 'Nessun file inviato'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Nessun file selezionato'}), 400

    try:
        # Salva temporaneamente il file
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        # Analizza il file
        result = client.detect_file(filepath)

        # Rimuovi il file temporaneo
        os.remove(filepath)

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
