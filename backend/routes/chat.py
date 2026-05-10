from flask import Blueprint, request, jsonify
from services.groq_service import chat
from services.booking_service import create_booking

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/message", methods=["POST"])
def message():
    body       = request.json
    messages   = body.get("messages", [])
    user_name  = body.get("user_name")
    user_email = body.get("user_email")

    if not messages:
        return jsonify({"error": "No messages provided"}), 400

    result = chat(messages, user_name=user_name, user_email=user_email)

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
        except ValueError as e:
            # Slot capacity error — return as a bot message
            return jsonify({
                "reply":  str(e),
                "action": None,
                "data":   None,
            })
        except Exception as e:
            return jsonify({
                "reply": f"⚠️ Booking error: {str(e)}"
            }), 500

    return jsonify({
        "reply":  result["reply"],
        "action": result.get("action"),
        "data":   result.get("data"),
    })