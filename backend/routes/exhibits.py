from flask import Blueprint, jsonify
import json, os

exhibits_bp = Blueprint("exhibits", __name__)

@exhibits_bp.route("/", methods=["GET"])
def list_exhibits():
    path = os.path.join(os.path.dirname(__file__), "../data/exhibits.json")
    with open(path) as f:
        return jsonify(json.load(f))