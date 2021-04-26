# Rules of strategy
# Market: S&P 500
# Trend: S&P 500 above the 200-moving day average
# Entry: 10-period RSI below 30 (buy on the next day's open)
# Exit: 10-period RSI above 40 or after 10 trading days (sell at the next day's open)
import time
from multiprocessing import Process

import alpaca_trade_api
import yfinance as yf
import alpacaPyConnection as alpaca
import pandas as pd
import pandas_ta as ta

API_KEY = 'PKTSOANLV7FIXQR8NJSR'
SECRET_KEY = 'H211M4TJ7C7D8AUUuPt50IyAUh6AKTd4idPRWLZc'
BASE_URL = "https://paper-api.alpaca.markets"


def getSPMA(ticker):
    # data = yf.download(tickers='SPY', period='200d', interval='1d')
    data = yf.download(tickers=ticker, period='3650d', interval='1d')
    xVals = data.index.tolist()
    df = pd.DataFrame(data)
    df['Date'] = xVals
    df['Price'] = df['Adj Close']
    df['ema'] = df['Adj Close'].ewm(span=200).mean()
    # df.to_csv('sp500.csv')
    return df


def getRSI(df):
    return ta.rsi(df['Adj Close'], 10)


def algo(sym, qty=100):
    if not alpaca.marketIsOpen():
        print("Market CLOSED")
        time.sleep(60)
    else:
        print("Let the games begin")
    while alpaca.marketIsOpen():
        for x in sym:
            df = getSPMA(x)
            rsiSeries = getRSI(df)
            df['rsi'] = rsiSeries
            long_position = alpaca.portfolioHas(sym)
            if df['ema'][-1] > df['Price'][-1] and df['rsi'][-1] < 30 and not long_position:
                try:
                    alpaca.execute_trade(sym, qty, 'buy', 'market', 'fok')
                    alpaca.update_lastTrade()
                    print("Bought shares")
                except alpaca_trade_api.rest.APIError:
                    print("Insufficient buying power")
                    pass
            elif long_position and df['rsi'][-1] > 40:
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


if __name__ == '__main__':
    while True:
        print("Entering market loop")
        ls = ['DIS', 'DKNG', 'IWM', 'IHI', 'VO', 'VOO', 'AGZ', 'ANGL', 'ARKK', 'CLIX', 'DLN', 'DSI', 'IEO', 'XOP', 'PXI', 'RWJ', 'FCG', 'THCX']
        print(ls)
        print()
        setItems = set(ls)
        ls = list(setItems)
        # p1 = Process(target=momentumStrategy(ls))
        # p1.start()
        p2 = Process(target=algo(ls, 10))
        p2.start()
