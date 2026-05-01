from flask import Blueprint, request, jsonify
from services.groq_service import chat
from services.booking_service import create_booking

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/message", methods=["POST"])
def message():
    body     = request.json
    messages = body.get("messages", [])

    if not messages:
        return jsonify({"error": "No messages provided"}), 400

    result = chat(messages)

    if result.get("action") == "create_booking" and result.get("data"):
        try:
            booking_result = create_booking(result["data"])
            return jsonify({
                "reply":     result["reply"],
                "action":    "booking_created",
                "booking":   booking_result["booking"],
                "itinerary": booking_result["itinerary"],
                "amount":    booking_result["amount"],
            })
        except Exception as e:
            return jsonify({
                "reply": result["reply"] + f"\n\n⚠️ Booking error: {str(e)}"
            }), 500

    return jsonify({
        "reply":  result["reply"],
        "action": result.get("action"),
        "data":   result.get("data"),
    })