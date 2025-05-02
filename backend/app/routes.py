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
import json

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
  model_id="ibm/granite-3-8b-instruct",
  api_client=client,
  project_id=project_id,
  params = {
      "max_new_tokens": 300
  }
)


@api.route("/watsonx", methods=["POST"])
def watsonx_generate():
    data = request.json
    prompt = data.get("prompt")
    
    print("Prompt received:", prompt) 
    
    try:
        result = model.generate_text(prompt)
        return jsonify({"response": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route("/api/tasks", methods=["POST"])
def generate_tasks():
    try:
        emails = request.json.get("emails")
        if not emails:
            return jsonify({"error": "No email data provided"}), 400

        # Construct prompt
        prompt = f"""
        You are an AI assistant that analyzes a list of emails and returns a structured list of grouped tasks.

        Each email includes:
        - id, subject, sender, body
        - attachments (filename, filetype, summary_hint)
        - metadata (priority, deadline, instructions)

        Your job is to:
        1. Group related emails into task groups.
        2. For each task, return:
        - task id and name
        - list of emailIds that belong to the task
        - combined list of attachments from all related emails
        - rank each attachment by focus priority: "high", "medium", "low", or "ignore"

        Respond strictly in the following JSON format:

        [
        {{
            "id": "task001",
            "name": "Audit Summary for Q4",
            "emailIds": ["email001", "email004"],
            "attachments": [
            {{
                "emailId": "email001",
                "filename": "Vendor_Reconciliation.xlsx",
                "filetype": "xlsx",
                "priority": "high"
            }}
            ]
        }}
        ]

        Emails:
        {json.dumps(emails, indent=2)}
        """

        response = model.generate_text(prompt)
        print("WatsonX raw response:", response)

        # Try to extract the JSON part from the output
        start = response.find("[")
        end = response.rfind("]") + 1
        tasks_json = response[start:end]

        tasks = json.loads(tasks_json)
        return jsonify(tasks)

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500
