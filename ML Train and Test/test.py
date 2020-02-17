from keras.models import load_model
from keras.preprocessing.image import img_to_array, load_img
import numpy as np
import matplotlib.pyplot as plt

img_width, img_height = 160, 120    

class_names=['H', 'Hi5', 'Still', 'T']

test_model = load_model('my_model.h5')

for i in range(6):   
    img = load_img('image_to_predict_'+str(i)+'.png',False,target_size=(img_width,img_height))
    x = img_to_array(img)/255 #rescaling similar to training 
    x = np.expand_dims(x, axis=0)
    preds = test_model.predict_classes(x)
    prob = test_model.predict_proba(x)
    print(preds, prob)
    
#    img = load_img('image_to_predict_'+str(i)+'.png',False,target_size=(img_width,img_height))
#    x = img_to_array(img)/255 #rescaling similar to training 
#    preds = test_model.predict_classes(x)
#    prob = test_model.predict_proba(x)
#    print(preds, prob)

    plt.figure(figsize=(5,5))
    plt.grid(False)
    plt.imshow(img, cmap=plt.cm.binary)
    plt.title(class_names[np.argmax(prob)])
    plt.show()