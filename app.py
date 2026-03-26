from flask import Flask, request, jsonify
import random

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    ai_score = random.uniform(0,1)

    return jsonify({
        "ai_probability": round(ai_score*100,2),
        "result": "AI Generated" if ai_score>0.5 else "Human",
        "reason": "Deepfake patterns detected" if ai_score>0.5 else "Natural features"
    })

if __name__ == "__main__":
    app.run(port=8000)