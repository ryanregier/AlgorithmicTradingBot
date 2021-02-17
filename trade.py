import ast
import io
import json
import bson
import requests
from pymongo import MongoClient
import pandas as pd
import alpaca_trade_api as tradeapi

BASE_URL = "https://paper-api.alpaca.markets"
API_KEY = 'PKTSOANLV7FIXQR8NJSR'
SECRET_KEY = 'H211M4TJ7C7D8AUUuPt50IyAUh6AKTd4idPRWLZc'
ACCOUNT_URL = "{}/v2/account".format(BASE_URL)
ORDERS_URL = "{}/v2/orders".format(BASE_URL)
HEADERS = {'APCA-API-KEY-ID': API_KEY, 'APCA-API-SECRET-KEY': SECRET_KEY}

client = MongoClient(
    "mongodb+srv://ryanregier:admin123@cluster0.b3s46.mongodb.net/<dbname>?retryWrites=true&w=majority")
db = client['tradingbot']

api = tradeapi.REST(API_KEY, SECRET_KEY, base_url='https://paper-api.alpaca.markets')  # or use ENV Vars shown below
account = api.get_account()


def getPositions():
    print(api.list_positions())


def Convert(lst):
    res_dct = {lst[i]: lst[i + 1] for i in range(0, len(lst), 2)}
    return res_dct


def get_account():
    return account


def update_acctinfo_todb():
    collection = db['accountinfo']
    collection.insert_one(get_account())
    print("Added to DB")


def update_acctinfo_trades():
    collection = db['histrades']
    # print(api.list_orders())
    df = api.list_orders().df
    collection.insert_many(df)
    print("Added to DB")


update_acctinfo_trades()


def create_order(sym, qty, side, type, time_in_force):
    data = {
        "symbol": sym,
        "qty": qty,
        "side": side,
        "type": type,
        "time_in_force": time_in_force
    }
    r = requests.post(ORDERS_URL, json=data, headers=HEADERS)
    return json.loads(r.content)


def test_alpaca():
    print("Print account info:")
    print(api.get_account())
    print()
    print()
    print("Listing all the orders")
    print(api.list_orders())
    print()
    print()
    print("Getting clock")
    print(api.get_clock())
    print()
    print()
    print("Portfolio history")
    print(api.get_portfolio_history())
    print()
    print()
    print("Getting last quote for TSLA")
    print(api.get_last_quote("TSLA"))
    print()
    print()
    print("Getting last trade for TSLA")
    print(api.get_last_trade("TSLA"))
    print()
    print()
    print("Displaying account buying power")
    print('${} is available as buying power.'.format(account.buying_power))
    print("Displaying balance change")
    balance_change = float(account.equity) - float(account.last_equity)
    print(f'Today\'s portfolio balance change: ${balance_change}')
    print("Checking if the market is open")
    clock = api.get_clock()
    print('The market is {}'.format('open.' if clock.is_open else 'closed.'))
    print()
    print()
    # Get daily price data for AAPL over the last 2 trading days.
    barset = api.get_barset('AAPL', 'day', limit=2)
    aapl_bars = barset['AAPL']
    print(aapl_bars)
    print()
    print()
    print("Scheduling an order for some Palantir")
    # Submit a market order to buy 1 share of Apple at market price
    api.submit_order(
        symbol='PLTR',
        qty=12,
        side='buy',
        type='market',
        time_in_force='gtc'
    )
    print("PLTR BOUGHT")
    print("Testing viewing existing orders")
    closed_orders = api.list_orders(
        status='closed',
        limit=100,
        nested=True  # show nested multi-leg orders
    )
    print(closed_orders)
    symbol = 'AAPL'
    bar = api.get_barset(symbol, 'day', limit=60).df
    print(bar)


test_alpaca()

# response = create_order("TSLA", 10, "buy", "market", "gtc")
# print(response)

# update_acctinfo_trades()
# update_acctinfo_todb()
