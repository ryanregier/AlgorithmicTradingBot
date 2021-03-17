import threading
import VolumeScraper as VS
import MovingAverages as MA
import alpacaPyConnection as alpaca
import requests
import time
import yfinance as yf
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np


def getPrice(sym):
    start = time.time()
    link = 'https://finance.yahoo.com/quote/' + sym
    url = requests.get(link)
    soup = BeautifulSoup(url.text, features="html.parser")
    price = soup.find_all("div", {'class': 'My(6px) Pos(r) smartphone_Mt(6px)'})[0].find('span').text
    end = time.time()
    print("Execution time:  " + str(end - start))
    return price


def generatePastSignals(df):
    if ((df['emaLong'] < df['emaMed'] < df['emaShort']) or (
            df['emaLong'] > df['emaMed'] > df['emaShort'])):
        df['BUY'] = "B"
        df['SELL'] = np.nan
    elif df['emaShort'] < df['emaMed'] or df['emaShort'] > df['emaMed']:
        df['BUY'] = np.nan
        df['SELL'] = "S"


def generateSignal(df):
    if ((df['emaLong'][-1] < df['emaMed'][-1] < df['emaShort'][-1]) or (
            df['emaLong'][-1] > df['emaMed'][-1] > df['emaShort'][-1])):
        df['BUY'] = "B"
        df['SELL'] = np.nan
        return True
    elif df['emaShort'][-1] < df['emaMed'][-1] or df['emaShort'][-1] > df['emaMed'][-1]:
        df['BUY'] = np.nan
        df['SELL'] = "S"
        return False


def algoRun(sym, num=1):
    own = True
    while True:
        data = yf.download(tickers=sym, period='1d', interval='1m')
        xVals = data.index.tolist()
        df = pd.DataFrame(data)
        df['Date'] = xVals
        df['emaShort'] = df['Adj Close'].ewm(span=10).mean()
        df['emaMed'] = df['Adj Close'].ewm(span=30).mean()
        df['emaLong'] = df['Adj Close'].ewm(span=50).mean()
        df.to_csv('df.csv')
        # df = MA.getTripleMovingAvgStrat(sym)
        signal = generateSignal(df)
        print(signal)
        # break
        print("Price: " + str(df['Price'][-1]))
        print(str(df['Buy'][-1]))
        print(str(df['Sell'][-1]))
        if not own and signal:
            alpaca.execute_trade(sym, 1, 'buy', 'market', 'fok')
            own = True
            print("We bought a share of " + sym)
        elif own and not signal:
            alpaca.execute_trade(sym, 1, 'sell', 'market', 'fok')
            print("We sold a share of TSLA")
            own = False
        # price = getPrice('TSLA')
        # print("The current price: " + str(price))


def getStocks():
    print(VS.getTopTickers())
    return VS.getTopTickers()


def startAlgo(sym, qty=1, side="buy", action="market", time_in_force='fok'):
    # alpaca.execute_trade(sym, 1, 'buy', 'market', 'fok')
    own = alpaca.portfolioHas(sym)
    while True:
        data = yf.download(tickers=sym, period='1d', interval='1m')
        xVals = data.index.tolist()
        df = pd.DataFrame(data)
        df['Date'] = xVals
        df['emaShort'] = df['Adj Close'].ewm(span=10).mean()
        df['emaMed'] = df['Adj Close'].ewm(span=30).mean()
        df['emaLong'] = df['Adj Close'].ewm(span=50).mean()
        df.to_csv('df.csv')
        # df = MA.getTripleMovingAvgStrat(sym)
        signal = generateSignal(df)
        print(signal)
        # break
        print("Price: " + str(df['Price'][-1]))
        print(str(df['Buy'][-1]))
        print(str(df['Sell'][-1]))
        if not own and signal:
            alpaca.execute_trade(sym, 1, 'buy', 'market', 'fok')
            own = True
            print("We bought a share of " + sym)
        elif own and not signal:
            alpaca.execute_trade(sym, 1, 'sell', 'market', 'fok')
            print("We sold a share of TSLA")
            own = False
            alpaca.create_order(sym, qty, side, action, time_in_force)


def enterStocks(ls):
    for i in ls:
        if alpaca.marketIsOpen():
            threading.Thread(target=startAlgo(i[0])).start()
        else:
            print("Sorry, market is closed.")
            print("Try buying: " + i[0] + " tomorrow!")


# enterStocks(getStocks())
# algoRun('TSLA')
