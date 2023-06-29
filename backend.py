from flask import Flask, request, jsonify
from flask_cors import CORS
import deepl

#DeepLのAPIkey入力
APIkey=None

translator=deepl.Translator(APIkey)

app = Flask(__name__)
CORS(app)  

@app.route('/api/text_processing', methods=['POST'])
def process_data():
    data = request.data.decode('utf-8')
    
    text_data=data
    text_data=text_data.lower()
    text_data=text_data.replace("."," .")
    text_data=text_data.replace(","," .")
    text_data=text_data.replace(":"," .")
    words=text_data.split(" ")
    word_list=[]
    for word in words:
        if word!=".":
            word=translator.translate_text(word,target_lang="JA")
            
            word_list.append(word.text)
    print(word_list)
    return jsonify({"processed_data":word_list})

if __name__ == '__main__':
    app.run()
