import os
import pickle
import json
import time
from keras.models import load_model
from keras.preprocessing.image import img_to_array, load_img
import numpy as np

#constants
img_width, img_height = 160, 120    

class_names=['H', 'Hi5', 'Still', 'T']

# Called when the deployed service starts
def init():
    global model

    # Get the path where the deployed model can be found.
    model_path = os.path.join(os.getenv('AZUREML_MODEL_DIR'), 'my_model.h5')
    # load models   
    model = load_model(model_path, compile=False)

# Handle requests to the service
def run(file):
    try:
        # Pick out the text property of the JSON request.
        # This expects a request in the form of {"text": "some text to score for sentiment"}
        data = json.loads(file)
        prediction = predict(data)
        #Return prediction
        return prediction
    except Exception as e:
        error = str(e)
        return error

def predict(data):
    xjson = np.asarray(data['data'])
    result = []
    result.append(len(xjson))
    for i in range(len(xjson)):
        preds = model.predict_classes(xjson[i])
        prob = model.predict_proba(xjson[i])
        #    print(preds, prob)
        result.append(class_names[np.argmax(prob)])
    return result
    