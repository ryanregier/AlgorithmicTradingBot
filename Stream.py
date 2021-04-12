import json
import websocket

BASE_URL = "https://paper-api.alpaca.markets"
API_KEY = 'PKTSOANLV7FIXQR8NJSR'
SECRET_KEY = 'H211M4TJ7C7D8AUUuPt50IyAUh6AKTd4idPRWLZc'


def on_open(ws):
    print("opened")
    auth_data = {
        "action": "authenticate",
        "data": {"key_id": API_KEY, "secret_key": SECRET_KEY}
    }

    ws.send(json.dumps(auth_data))

    listen_message = {"action": "listen", "data": {"streams": ["AM.*"]}}

    ws.send(json.dumps(listen_message))


def on_message(ws, message):
    print("received a message")
    print(message)


def on_close(ws):
    print("closed connection")


socket = "wss://data.alpaca.markets/stream"

ws = websocket.WebSocketApp(socket, on_open=on_open, on_message=on_message, on_close=on_close)
ws.run_forever()
