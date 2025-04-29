from flask import Blueprint, request, jsonify
# from .services.summarizer import summarize_email

from flask import Flask, request, jsonify
from flask import render_template
import requests
from ibm_watsonx_ai import APIClient
from ibm_watsonx_ai import Credentials
from ibm_watsonx_ai.foundation_models import ModelInference
from dotenv import load_dotenv
import os

api = Blueprint("api", __name__)

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


@api.route("/watsonx", methods=["POST"])
def watsonx_generate():
    data = request.json
    prompt = data.get("prompt")
    
    try:
        result = model.generate_text(prompt)
        return jsonify({"response": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# @api.route("/summarize", methods=["POST"])
# def summarize():
#     data = request.json
#     result = summarize_email(data)
#     return jsonify(result)
