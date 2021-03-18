from datetime import datetime
import alpacaPyConnection as alpaca


def sample_responses(input_text):
    user_message = str(input_text).lower()

    if user_message in ("/hello", "/hi", "/sup",):
        return "Hey! How's it going?"
    if user_message in ("who are you", "who are you?"):
        return "I am Wheaton Stock Bot"
    if user_message in "/marketopen":
        return str(alpaca.marketIsOpen())
    if user_message in "/buyspy":
        alpaca.create_order('SPY', 1, 'buy', 'market', 'gtc')
        return "Bought a share of SPY"
    if user_message in "/sellspy":
        alpaca.create_order('SPY', 1, 'sell', 'market', 'gtc')
        return "Sold a share of SPY"
    if user_message in "/yoloorder":
        alpaca.create_order('GME', 1, 'buy', 'market', 'gtc')
        return "Yoloing GME because r/WSB"
    if user_message in ("/time"):
        now = datetime.now()
        date_time = now.strftime("%d/%m/%y, %H:%M:%S")
        return date_time
    return "I don't understand you."
