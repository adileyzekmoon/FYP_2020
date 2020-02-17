from keras.models import load_model
from keras.preprocessing.image import img_to_array, load_img
import numpy as np
import matplotlib.pyplot as plt
import json

img_width, img_height = 160, 120    

class_names=['H', 'Hi5', 'Still', 'T']

test_model = load_model('my_model.h5')

datalist = []

for i in range(2):
    print(i)
    img = load_img('image_to_predict_'+str(i)+'.png',False,target_size=(img_width,img_height))
    x = img_to_array(img)/255 #rescaling similar to training 
    x = np.expand_dims(x, axis=0)
    datalist.append(x.tolist())
    with open("jsondump.json", 'w', encoding="utf8") as outfile:
        jdata = {'data': x.tolist()}
        json.dump(jdata, outfile)
    
    with open("jsondump.json", 'r') as file:
        data = json.load(file)
    
    xjson = np.asarray(data['data'])
    
    preds = test_model.predict_classes(x)
    prob = test_model.predict_proba(x)
    print("Original numpy array result:")
    print(preds, prob, class_names[np.argmax(prob)])
    
    predsjson = test_model.predict_classes(xjson)
    probjson = test_model.predict_proba(xjson)
    print("Converted numpy array result:")
    print(predsjson, probjson, class_names[np.argmax(probjson)])
    
print(len(datalist))
multidata = {'data': datalist}
with open ("multidata.json", 'w', encoding='utf8') as f:
    json.dump(multidata, f)


#    plt.figure(figsize=(5,5))
#    plt.grid(False)
#    plt.imshow(img, cmap=plt.cm.binary)
#    plt.title(class_names[np.argmax(prob)])
#    plt.show()