import threading
from asyncio.subprocess import Process

import alpaca_trade_api

import VolumeScraper as VS
import alpacaPyConnection as alpaca
import requests
import yfinance as yf
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np
import time


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
    if df['emaShort'][-1] > df['emaLong'][-1]:
        df['BUY'] = "B"
        df['SELL'] = np.nan
        return True
    elif df['emaShort'][-1] < df['emaMed'][-1]:
        df['BUY'] = np.nan
        df['SELL'] = "S"
        return False


def getStocks():
    print(VS.getTopTickers())
    return VS.getTopTickers()


def startAlgo(sym, qty=1, action="market", time_in_force='fok'):
    # alpaca.execute_trade(sym, 1, 'buy', 'market', 'fok')
    priceBought = 0
    profit = 0
    qtyOwned = 0
    own = False
    while True:
        # time.sleep(1)
        own = alpaca.portfolioHas(sym)
        data = yf.download(tickers=sym, period='1d', interval='1m')
        xVals = data.index.tolist()
        df = pd.DataFrame(data)
        df['Date'] = xVals
        df['emaShort'] = df['Adj Close'].ewm(span=15).mean()
        df['emaMed'] = df['Adj Close'].ewm(span=25).mean()
        df['emaLong'] = df['Adj Close'].ewm(span=50).mean()
        # df.to_csv('df.csv')
        # df = MA.getTripleMovingAvgStrat(sym)
        # break
        signal = generateSignal(df)
        print(signal)
        print("Price: " + str(df['Adj Close'][-1]))
        print(str(df['BUY'][-1]))
        print(str(df['SELL'][-1]))
        if own:
            profit += qty * df['Adj Close'][-1]
        if signal:
            try:
                alpaca.execute_trade(sym, qty, 'buy', 'market', 'fok')
                priceBought = float(getPrice(sym))
                qtyOwned += qty
                print(qtyOwned)
                print("Price Bought: " + str(priceBought * 1.0009))
                print("We bought shares of " + sym)
                # alpaca.update_lastTrade(sym)
                own = True
            except alpaca_trade_api.rest.APIError:
                print("Insufficient buying power")
                pass
        if own and not signal:  # or (own and profit > 0):
            alpaca.create_order(sym, qtyOwned, 'sell', action, 'fok')
            print("We sold all our shares")
            print("Profit: " + str(profit))
            # alpaca.update_lastTrade(sym)
            qtyOwned = 0
            own = False
            profit = 0


def enterStocks(ls):
    for i in ls:
        if alpaca.marketIsOpen():
            print("Algo starting on: " + i[0])
            threading.Thread(target=startAlgo(i[0])).start()
        else:
            print("Sorry, market is closed.")
            print("Try buying: " + i[0] + " tomorrow!")


def main():
    if alpaca.marketIsOpen():
        startAlgo(sym='SNDL')
    else:
        print("Sorry, market is closed.")
        print("Try buying tomorrow!")


# enterStocks(getStocks())
# print("Hello world!")
# startAlgo(sym='TSLA')

if __name__ == '__main__':
    main()
