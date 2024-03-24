from flask import Flask, request, jsonify
import cv2
import numpy as np
import base64
import tensorflow as tf


app = Flask(__name__)

def perform_object_detection(image_path):
    image = cv2.imread(image_path)
    
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return gray_image

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return jsonify({'error': 'No file provided'})

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    try:
        image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
        processed_image = perform_object_detection(image)
        retval, buffer = cv2.imencode('.jpg', processed_image)
        processed_image_encoded = base64.b64encode(buffer).decode('utf-8')
        return jsonify({'processed_image': processed_image_encoded})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
