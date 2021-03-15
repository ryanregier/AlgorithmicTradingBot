# if a stock trades above vwap it is bullish
# if a stock trades below vwap signals buyers selling and have control of price
# put stop loss below vwap
import pandas_ta as ta
import pandas as pd
import yfinance as yf
import numpy as np

pd.options.mode.chained_assignment = None  # default='warn'


def getStock(sym, start, end):
    stock = yf.download(sym, start, end)
    return stock


def vwap(sym, start, end, period=1):
    stock = yf.download(sym, start, end)
    xVals = stock.index.tolist()
    stock['Date'] = xVals
    stock.set_index(pd.DatetimeIndex(stock["Date"]), inplace=True)
    stock['VWAP'] = ta.vwap(stock['High'], stock['Low'], stock['Adj Close'], stock['Volume'])
    return stock


def generateSignals(df, num=1):
    df['Buy'] = np.nan
    df['Sell'] = np.nan
    long = False
    priceBought = 0
    for i in range(0, len(df)):
        profit = (priceBought * num) - (num * df['Adj Close'][i])
        if df['VWAP'][i] > df['Adj Close'][i] and not long:
            df['Buy'][i] = df['Adj Close'][i]
            priceBought = df['Adj Close'][i]
            long = True
        elif df['VWAP'][i] < df['Adj Close'][i] and long:
            long = False
            df['Sell'][i] = df['Adj Close'][i]
        elif (long and profit > (priceBought * 1.15)) or (profit < 0 and long):
            long = False
            df['Sell'][i] = df['Adj Close'][i]
    return df


df = vwap('PLTR', '2021-01-01', '2021-03-14')
df = generateSignals(df)
df.to_csv("VWAP.csv")
