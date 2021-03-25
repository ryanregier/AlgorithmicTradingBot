from datetime import datetime
import alpacaPyConnection as alpaca
import HistoricalData as hd
import pandas as pd


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
    if user_message in "/time":
        now = datetime.now()
        date_time = now.strftime("%m/%d/%y, %H:%M:%S")
        return date_time
    if "/stock" in user_message:
        stock = user_message[7:].upper()
        print(user_message)
        print(stock)
        hd.getTicker(stock)
        hd.queryHistData(start="2021-1-1", end="2021-3-24")
        return stock
    if "/sell" in user_message:
        stock = user_message[6:].upper()
        print(stock)
        alpaca.create_order(stock, 1, 'sell', 'market', 'gtc')
        return "Sold a share of: " + stock
    if "/buy" in user_message:
        stock = user_message[5:].upper()
        print(stock)
        alpaca.create_order(stock, 1, 'buy', 'market', 'gtc')
        return "Bought a share of: " + stock
    if "/portfolio" in user_message:
        acct = alpaca.get_account()
        text = "Your Acct Info\n" + "Balance: $" + acct.equity + "\nTrader: Algo and Ryan\n" \
               + " Acct. Number: " + acct.account_number + "\nCreated Date: " + str(acct.created_at)
        return text
    if "/positions" in user_message:
        portfolio = alpaca.getPositions()
        # Get a list of all of our positions.
        # Print the quantity of shares for each position.
        string = "Current positions\n"
        for position in portfolio:
            string += ("{} shares of {}".format(position.qty, position.symbol)) + "\n"
        return string
    if "/holds" in user_message:
        sym = user_message[7:].upper()
        print(sym)
        print(len(sym))
        return alpaca.portfolioHas(sym)
    return "I don't understand you."
