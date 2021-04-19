import ast
import io
import json
import time
from datetime import datetime

import bson
import requests
from pymongo import MongoClient
import pandas as pd
import alpaca_trade_api as tradeapi
import VolumeScraper as vs

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
    # print(api.list_positions())
    return api.list_positions()


def marketIsOpen():
    clock = api.get_clock()
    print('The market is {}'.format('open.' if clock.is_open else 'closed.'))
    if clock.is_open:
        return True
    return False


def update_lastTrade():
    collection = db['histrades']
    ts = time.time() - 5
    dt = datetime.utcfromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
    print(dt)
    last = api.list_orders(
        status='closed',
        limit=1
    )
    last = last[0]
    try:
        doc = {"sym": last.symbol, "side": last.side, "price": last.filled_avg_price, "qty": last.filled_qty,
               "timestamp": last.filled_at,
               "order position": float(last.filled_qty) * float(last.filled_avg_price), "traderId": "Ryan/Algo"}
        print(doc)
        collection.insert_one(doc)
    except TypeError:
        pass
        print("Type error on updating DB")


# update_lastTrade()


def get_account():
    return account


def update_acctinfo_todb():
    collection = db['accountinfo']
    myAccount = get_account()
    doc = {
       "id": myAccount.id,
        "account_number": myAccount.account_number,
        "status": myAccount.status,
        "currency": myAccount.currency,
        "buying_power": myAccount.buying_power,
        "regt_buying_power": myAccount.regt_buying_power,
        "daytrading_buying_power": myAccount.daytrading_buying_power,
        "cash": myAccount.cash,
        "portfolio_value": myAccount.portfolio_value,
        "pattern_day_trader": myAccount.pattern_day_trader,
        "trading_blocked":myAccount.trading_blocked,
        "transfers_blocked": myAccount.transfers_blocked,
        "account_blocked":myAccount.account_blocked,
        "created_at":myAccount.created_at,
        "trade_suspended_by_user": myAccount.trade_suspended_by_user,
        "multiplier": myAccount.multiplier,
        "shorting_enabled": myAccount.shorting_enabled,
        "equity": myAccount.equity,
        "last_equity": myAccount.last_equity,
        "long_market_value": myAccount.long_market_value,
        "short_market_value": myAccount.short_market_value,
        "intial_margin": myAccount.initial_margin,
        "maintenance_margin": myAccount.maintenance_margin,
        "last_maintenance_margin": myAccount.last_maintenance_margin,
        "sma": myAccount.sma,
        "daytrade_count": myAccount.daytrade_count,
        "timestamp": time.time()
    }
    collection.insert_one(doc)
    print("Added to DB")


update_acctinfo_todb()


def update_acct_balance_change():
    collection = db['histbalancechange']
    balance_change = float(account.equity) - float(account.last_equity)
    ts = time.time()
    doc = {
        "date": ts,
        "balance_change": balance_change
    }
    collection.insert_one(doc)
    print(f'Today\'s portfolio balance change: ${balance_change}')


# update_acct_balance_change()


def update_acctinfo_positions():
    collection = db['positions']
    trades = api.list_positions()
    print(trades[0])
    ts = time.time()
    date = datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S.%f')
    for position in trades:
        if int(position.qty) > 0:
            typeTrade = "buy"
        else:
            typeTrade = "sell"
        doc = {"symbol": position.symbol, "asset-class": position.asset_class, "qty": int(position.qty),
               "avg_entry_price": round(float(position.avg_entry_price), 2),
               "initial position": round(float(float(position.qty) * float(position.avg_entry_price)), 2),
               "exchange": position.exchange, "type": typeTrade, "date": date}
        query = {
            "symbol": position.symbol
        }
        collection.replace_one(query, doc, upsert=True)

    print("Added trades")


# update_acctinfo_positions()
# print("Updated positions")


def create_order(sym, qty, side, action, time_in_force):
    data = {
        "symbol": sym,
        "qty": qty,
        "side": side,
        "type": action,
        "time_in_force": time_in_force
    }
    r = requests.post(ORDERS_URL, json=data, headers=HEADERS)
    return json.loads(r.content)


def execute_trade(sym, qty, side, action, time_in_force):
    api.submit_order(
        symbol=sym,
        qty=qty,
        side=side,
        type=action,
        time_in_force=time_in_force
    )
    print("The bot " + side + " " + sym)


def portfolioHas(sym):
    try:
        position = api.get_position(sym)
        print(position)
    except Exception:
        return False
    return True


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
    '''
    api.submit_order(
        symbol='PLTR',
        qty=12,
        side='buy',
        type='market',
        time_in_force='gtc'
    )
    print("PLTR BOUGHT")
    print("Testing viewing existing orders")
    '''
    closed_orders = api.list_orders(
        status='closed',
        limit=100,
        nested=True  # show nested multi-leg orders
    )
    print(closed_orders)
    symbol = 'AAPL'
    bar = api.get_barset(symbol, 'day', limit=60).df
    bar.to_csv('bar.csv')


def getTopVolume():
    ls = vs.getTopTickers()
    df = pd.DataFrame(ls)
    df.to_csv('topVol.csv')
    for i in ls:
        print("Ticker: " + i[0])
        print("Volume: " + str(i[2]))
        print()

# test_alpaca()

# response = create_order("TSLA", 10, "buy", "market", "gtc")
# print(response)

# update_acctinfo_trades()
# update_acctinfo_todb()
