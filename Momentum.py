import time
from datetime import datetime, timedelta

import alpaca_trade_api
import numpy as np
import alpaca_trade_api as tradeapi
import datetime as dt
from tzlocal import get_localzone
import pandas as pd
import pandas_ta as ta
from multiprocessing import Process
import alpacaPyConnection as alpaca

TZ = 'America/Chicago'

API_KEY = 'PKTSOANLV7FIXQR8NJSR'
SECRET_KEY = 'H211M4TJ7C7D8AUUuPt50IyAUh6AKTd4idPRWLZc'
BASE_URL = "https://paper-api.alpaca.markets"

api = tradeapi.REST(key_id=API_KEY, secret_key=SECRET_KEY, base_url=BASE_URL)
clock = api.get_clock()


def momentumStrategy(symbols):
    print("triple ema starting")
    barTimeFrame = "1Min"
    today = datetime.today() - timedelta(days=50)
    start = today.strftime("%Y-%m-%d")
    today = (datetime.today() - timedelta(days=0)).strftime("%Y-%m-%d") + "T15:00"
    end = pd.Timestamp(today, tz=TZ).isoformat()
    print(start)
    while clock.is_open or True:
        for sym in symbols:
            buy_list = []
            sell_list = []
            data = api.get_barset(sym, barTimeFrame, limit=1000, end=end)
            df = data[sym].df
            df.to_csv("alpacaData.csv")
            SMA10 = df.close.ewm(span=10).mean()
            SMA20 = df.close.ewm(span=25).mean()
            SMA50 = df.close.ewm(span=50).mean()
            dfTemp = pd.DataFrame()
            dfTemp['PRICE'] = df['close']
            dfTemp['FAST'] = SMA10
            dfTemp['MEDIUM'] = SMA20
            dfTemp['SLOW'] = SMA50
            price_bought = 0
            long = False
            for i in range(0, len(dfTemp)):
                if dfTemp['FAST'][i] > dfTemp['SLOW'][i] and dfTemp['FAST'][i] > dfTemp['MEDIUM'][i] and not long:
                    buy_list.append(dfTemp['PRICE'][i])
                    price_bought = dfTemp['PRICE'][i]
                    sell_list.append(np.nan)
                    long = True
                elif dfTemp['FAST'][i] < dfTemp['MEDIUM'][i] and dfTemp['FAST'][i] < dfTemp['SLOW'][i] and long:
                    sell_list.append(dfTemp['PRICE'][i])
                    buy_list.append(np.nan)
                    long = False
                else:
                    sell_list.append(np.nan)
                    buy_list.append(np.nan)
            dfTemp['BUY'] = buy_list
            dfTemp['SELL'] = sell_list
            dfTemp.to_csv("backtestMomentum.csv")
            # time.sleep(300)
            print("Sleeping 5 min on triple moving avg.")
            return


def vwap(symbols, qty=10):
    print("vwap starting")
    barTimeFrame = "1Min"
    today = datetime.today() - timedelta(days=50)
    start = today.strftime("%Y-%m-%d")
    today = (datetime.today() - timedelta(days=0)).strftime("%Y-%m-%d") + "T15:00"
    end = pd.Timestamp(today, tz=TZ).isoformat()
    if not alpaca.marketIsOpen():
        print("Market CLOSED")
        time.sleep(60)
    else:
        print("Let the games begin")
    while alpaca.marketIsOpen():
        for sym in symbols:
            buy_list = []
            sell_list = []
            data = api.get_barset(sym, barTimeFrame, limit=1000, end=end)
            df = data[sym].df
            df['PRICE'] = df['close']
            df['VWAP'] = ta.vwap(df['high'], df['low'], df['close'], df['volume'])
            price_bought = 0
            long = alpaca.portfolioHas(sym)
            if df['VWAP'][-1] > df['close'][-1] and not long:
                try:
                    alpaca.execute_trade(sym, qty, 'buy', 'market', 'fok')
                    alpaca.update_lastTrade()
                    print("Bought shares")
                    long = True
                except alpaca_trade_api.rest.APIError:
                    print("Insufficient buying power")
                    pass
            elif df['VWAP'][-1] < df['close'][-1] and long:
                try:
                    alpaca.execute_trade(sym, qty, 'sell', 'market', 'fok')
                    alpaca.update_lastTrade()
                    print("Sold shares")
                    long = False
                except alpaca_trade_api.rest.APIError:
                    print("Insufficient buying power")
                    pass
            else:
                print("Nothing happened with: " + sym)
        print("Sleeping 1 min on vwap")
        time.sleep(60)


def backTest():
    '''
    for i in range(0, len(df)):
        if df['VWAP'][i] > df['close'][i] and not long:
            buy_list.append(df['PRICE'][i])
            price_bought = df['PRICE'][i]
            sell_list.append(np.nan)
            long = True
        elif df['VWAP'][i] < df['close'][i] and long:
            sell_list.append(df['PRICE'][i])
            buy_list.append(np.nan)
            long = False
        else:
            sell_list.append(np.nan)
            buy_list.append(np.nan)
    df['BUY'] = buy_list
    df['SELL'] = sell_list
    df.to_csv("backtestVWAP.csv")
    '''


if __name__ == '__main__':
    while True:
        print("Entering market loop")
        ls = ['GME', 'PLTR', 'AMC', 'BB', 'T', 'TSLA', 'MSFT', 'AAPL', 'NOK', 'RBLX', 'ZOM', 'NFLX',
              'CCIV', 'EXPR', 'NAKD', 'SNDL', 'RICE', 'SWK', 'CAT', 'BMO', 'UL', 'KSS']
        # p1 = Process(target=momentumStrategy(ls))
        # p1.start()
        p2 = Process(target=vwap(ls))
        p2.start()
import time
from datetime import datetime, timedelta

import alpaca_trade_api
import numpy as np
import alpaca_trade_api as tradeapi
import datetime as dt
from tzlocal import get_localzone
import pandas as pd
import pandas_ta as ta
from multiprocessing import Process
import alpacaPyConnection as alpaca

TZ = 'America/Chicago'

API_KEY = 'PKTSOANLV7FIXQR8NJSR'
SECRET_KEY = 'H211M4TJ7C7D8AUUuPt50IyAUh6AKTd4idPRWLZc'
BASE_URL = "https://paper-api.alpaca.markets"

api = tradeapi.REST(key_id=API_KEY, secret_key=SECRET_KEY, base_url=BASE_URL)
clock = api.get_clock()


def momentumStrategy(symbols):
    print("triple ema starting")
    barTimeFrame = "1Min"
    today = datetime.today() - timedelta(days=50)
    start = today.strftime("%Y-%m-%d")
    today = (datetime.today() - timedelta(days=0)).strftime("%Y-%m-%d") + "T15:00"
    end = pd.Timestamp(today, tz=TZ).isoformat()
    print(start)
    while clock.is_open or True:
        for sym in symbols:
            buy_list = []
            sell_list = []
            data = api.get_barset(sym, barTimeFrame, limit=1000, end=end)
            df = data[sym].df
            df.to_csv("alpacaData.csv")
            SMA10 = df.close.ewm(span=10).mean()
            SMA20 = df.close.ewm(span=25).mean()
            SMA50 = df.close.ewm(span=50).mean()
            dfTemp = pd.DataFrame()
            dfTemp['PRICE'] = df['close']
            dfTemp['FAST'] = SMA10
            dfTemp['MEDIUM'] = SMA20
            dfTemp['SLOW'] = SMA50
            price_bought = 0
            long = False
            for i in range(0, len(dfTemp)):
                if dfTemp['FAST'][i] > dfTemp['SLOW'][i] and dfTemp['FAST'][i] > dfTemp['MEDIUM'][i] and not long:
                    buy_list.append(dfTemp['PRICE'][i])
                    price_bought = dfTemp['PRICE'][i]
                    sell_list.append(np.nan)
                    long = True
                elif dfTemp['FAST'][i] < dfTemp['MEDIUM'][i] and dfTemp['FAST'][i] < dfTemp['SLOW'][i] and long:
                    sell_list.append(dfTemp['PRICE'][i])
                    buy_list.append(np.nan)
                    long = False
                else:
                    sell_list.append(np.nan)
                    buy_list.append(np.nan)
            dfTemp['BUY'] = buy_list
            dfTemp['SELL'] = sell_list
            dfTemp.to_csv("backtestMomentum.csv")
            # time.sleep(300)
            print("Sleeping 5 min on triple moving avg.")
            return


def vwap(symbols, qty=10):
    print("vwap starting")
    barTimeFrame = "1Min"
    today = datetime.today() - timedelta(days=50)
    start = today.strftime("%Y-%m-%d")
    today = (datetime.today() - timedelta(days=0)).strftime("%Y-%m-%d") + "T15:00"
    end = pd.Timestamp(today, tz=TZ).isoformat()
    if not alpaca.marketIsOpen():
        print("Market CLOSED")
        time.sleep(60)
    else:
        print("Let the games begin")
    while alpaca.marketIsOpen():
        for sym in symbols:
            buy_list = []
            sell_list = []
            data = api.get_barset(sym, barTimeFrame, limit=1000, end=end)
            df = data[sym].df
            df['PRICE'] = df['close']
            df['VWAP'] = ta.vwap(df['high'], df['low'], df['close'], df['volume'])
            price_bought = 0
            long = alpaca.portfolioHas(sym)
            if df['VWAP'][-1] > df['close'][-1] and not long:
                try:
                    alpaca.execute_trade(sym, qty, 'buy', 'market', 'fok')
                    alpaca.update_lastTrade()
                    print("Bought shares")
                    long = True
                except alpaca_trade_api.rest.APIError:
                    print("Insufficient buying power")
                    pass
            elif df['VWAP'][-1] < df['close'][-1] and long:
                try:
                    alpaca.execute_trade(sym, qty, 'sell', 'market', 'fok')
                    alpaca.update_lastTrade()
                    print("Sold shares")
                    long = False
                except alpaca_trade_api.rest.APIError:
                    print("Insufficient buying power")
                    pass
            else:
                print("Nothing happened with: " + sym)
        print("Sleeping 1 min on vwap")
        time.sleep(60)


def backTest():
    '''
    for i in range(0, len(df)):
        if df['VWAP'][i] > df['close'][i] and not long:
            buy_list.append(df['PRICE'][i])
            price_bought = df['PRICE'][i]
            sell_list.append(np.nan)
            long = True
        elif df['VWAP'][i] < df['close'][i] and long:
            sell_list.append(df['PRICE'][i])
            buy_list.append(np.nan)
            long = False
        else:
            sell_list.append(np.nan)
            buy_list.append(np.nan)
    df['BUY'] = buy_list
    df['SELL'] = sell_list
    df.to_csv("backtestVWAP.csv")
    '''


if __name__ == '__main__':
    while True:
        print("Entering market loop")
        ls = ['GME', 'PLTR', 'AMC', 'BB', 'T', 'TSLA', 'MSFT', 'AAPL', 'NOK', 'RBLX', 'ZOM', 'NFLX',
              'CCIV', 'EXPR', 'NAKD', 'SNDL', 'RICE', 'SWK', 'CAT', 'BMO', 'UL', 'KSS']
        # p1 = Process(target=momentumStrategy(ls))
        # p1.start()
        p2 = Process(target=vwap(ls))
        p2.start()
