from keras.models import load_model
from keras.preprocessing.image import img_to_array, load_img
import numpy as np
import matplotlib.pyplot as plt
import json
import tensorflowjs as tfjs

img_width, img_height = 160, 120    

class_names=['H', 'Hi5', 'Still', 'T']

test_model = load_model('my_model.h5')

# Python
tfjs.converters.save_keras_model(test_model, CNN_model)