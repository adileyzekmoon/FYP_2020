import requests
import json

# URL for the web service
scoring_uri = 'http://cb2dcef4-f051-41f3-be62-443d7d90a36e.eastasia.azurecontainer.io/score'
# If the service is authenticated, set the key or token
key = '<your key or token>'

# Two sets of data to score, so we get two results back
#data = {"data":
#        [
#            [
#                0.0199132141783263,
#                0.0506801187398187,
#                0.104808689473925,
#                0.0700725447072635,
#                -0.0359677812752396,
#                -0.0266789028311707,
#                -0.0249926566315915,
#                -0.00259226199818282,
#                0.00371173823343597,
#                0.0403433716478807
#            ],
#            [
#                -0.0127796318808497,
#                -0.044641636506989,
#                0.0606183944448076,
#                0.0528581912385822,
#                0.0479653430750293,
#                0.0293746718291555,
#                -0.0176293810234174,
#                0.0343088588777263,
#                0.0702112981933102,
#                0.00720651632920303]
#        ]
#        }

with open("multidata.json", 'r') as file:
    data = json.loads(file.read())

#dict
print(type(data))

input_data = json.dumps(data)
#string
print(type(input_data))

# Convert to JSON string
#input_data = json.dumps(data)

# Set the content type
headers = {'Content-Type': 'application/json'}
# If authentication is enabled, set the authorization header
#headers['Authorization'] = f'Bearer {key}'

# Make the request and display the response
#with open("jsondump.json", 'rb') as file:
resp = requests.post(scoring_uri, input_data, headers=headers)
print(resp.text)
