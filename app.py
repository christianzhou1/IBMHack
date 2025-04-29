from flask import Flask, request, jsonify
from flask import render_template
import requests
from ibm_watsonx_ai import APIClient
from ibm_watsonx_ai import Credentials
from ibm_watsonx_ai.foundation_models import ModelInference
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("WATSONX_API_KEY")
project_id = os.getenv("WATSONX_PROJECT_ID")

credentials = Credentials(
    url = "https://us-south.ml.cloud.ibm.com",
    api_key = api_key,
)

client = APIClient(credentials)


model = ModelInference(
  model_id="ibm/granite-13b-instruct-v2",
  api_client=client,
  project_id=project_id,
  params = {
      "max_new_tokens": 100
  }
)

# prompt = 'How far is Paris from Bangalore?'
# print(model.generate(prompt))
# print(model.generate_text(prompt))






app = Flask(__name__)

# Replace with your actual Watsonx.ai endpoint and API key
WATSONX_API_URL = "https://us-south.ml.cloud.ibm.com"
API_KEY = "your_api_key_here"

@app.route("/query", methods=["POST"])
def query_watsonx():
    user_input = request.json.get("prompt")

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }

    payload = {
        "model_id": "your-model-id",
        "input": user_input,
        # Modify depending on model (prompt, parameters, etc.)
    }

    response = requests.post(WATSONX_API_URL, headers=headers, json=payload)

    if response.ok:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Watsonx request failed", "details": response.text}), 500
      

@app.route("/")
def home():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
