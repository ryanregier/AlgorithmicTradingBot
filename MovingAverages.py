import yfinance as yf
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import time

from pymongo import MongoClient
import pandas as pd

import alpacaPyConnection as ape

pd.options.mode.chained_assignment = None  # default='warn'

DATABASE_NAME = "tradingbot"
DATABASE_HOST = "cluster0-shard-00-02.b3s46.mongodb.net:27017"

DATABASE_USERNAME = "ryanregier"
DATABASE_PASSWORD = "admin123"

client = MongoClient(
    "mongodb+srv://ryanregier:admin123@cluster0.b3s46.mongodb.net/<dbname>?retryWrites=true&w=majority")
db = client['tradingbot']
collection = db['backtestedtrades']

# enter a long position when:
#   1) fast MA crosses above medium
#   2) fast MA crosses above slow MA
#   3) medium MA crosses over slow MA
global BUY
BUY = False

#  A signal to sell is triggered when the fast moving average crosses below
#  both the medium and the slow moving averages.
# The signal to sell is confirmed when the medium moving average crosses below the slow moving average
# When the fast moving average goes above the medium moving average, the system exits its position
global SELL
SELL = False


def simpleMovingAverage(sym, start, end, period):
    stock = yf.download(sym, start, end)
    stock['sma'] = stock['Adj Close'].rolling(period, min_periods=1).mean()
    xVals = stock.index.tolist()
    stock['Date'] = xVals
    return stock


def getStock(sym, start, end):
    stock = yf.download(sym, start, end)
    return stock


def exponentialMovingAverage(sym, start, end, period):
    stock = yf.download(sym, start, end)
    xVals = stock.index.tolist()
    stock['Date'] = xVals
    stock['ema'] = stock['Adj Close'].ewm(span=period).mean()
    return stock


def triangularMovingAverage(stock, period):
    # step 1: calculate sma
    # step 2: average the SMAs
    stock['tma'] = stock['sma'].rolling(period, min_periods=1).mean()
    xVals = stock.index.tolist()
    stock['Date'] = xVals
    print(stock)
    return stock


def generateGraph(stock):
    xVals = stock.index.tolist()
    stock['Date'] = xVals
    stock.to_csv("stonks.csv")
    ax = stock.plot(kind='line', x='Date', y=['sma', 'ema', 'tma', 'Adj Close'], grid=True,
                    title='EMA, SMA, TMA vs Time')
    ax.set_ylabel("Price")
    plt.autoscale()
    plt.show()


def checkStocks():
    if ape.marketIsOpen():
        print("Starting the algorithm")
    else:
        print("Market isn't open buddy")


def getTripleMovingAvgStrat(sym):
    df1 = exponentialMovingAverage(sym, '2021-1-1', '2021-3-16', 10)
    df2 = exponentialMovingAverage(sym, '2021-1-1', '2021-3-16', 20)
    df3 = exponentialMovingAverage(sym, '2021-1-1', '2021-3-16', 30)
    # df3 = exponentialMovingAverage('MSFT', '2021-1-4', '2021-2-23', 50)
    df = pd.DataFrame()
    df['Date'] = df1['Date']
    df['Price'] = df3['Adj Close']
    df['emaLong'] = df3['ema']
    df['emaMed'] = df2['ema']
    df['emaShort'] = df1['ema']
    return df


def calculatePNL(df, num):
    profit = 0.0
    priceBought = 0.0
    for i in range(len(df)):
        if df['Buy'][i] > 0:
            priceBought = (num * df['Buy'][i])
        elif df['Sell'][i] > 0:
            profit += (num * df['Sell'][i]) - (num * priceBought)
    return profit


def generateEma(df, sym, num=1):
    buy_list = []
    sell_list = []
    priceBought = 0.0
    daysBought = -1
    long = False
    short = False
    for i in range(0, len(df) - 1):
        profit = (num * df['Price'][i]) - (num * priceBought)
        # print(profit)
        if ((df['emaLong'][i] < df['emaMed'][i] < df['emaShort'][i]) or (
                df['emaLong'][i] > df['emaMed'][i] > df['emaShort'][i])) and not long:
            buy_list.append(df['Price'][i])
            priceBought = df['Price'][i]
            sell_list.append(np.nan)
            long = True
            doc = {
                "sym": sym,
                "qty": num,
                "price": df['Price'][i],
                "side": "buy",
                "date": df['Date'][i],
                "traderId": "Ryan",
                "algo": "movingAvgs"
            }
            # collection.insert_one(doc)
        elif (df['emaShort'][i] < df['emaMed'][i] or df['emaShort'][i] > df['emaMed'][i]) and long and profit > 0 \
                or (profit < 0 and daysBought > 5):
            sell_list.append(df['Price'][i])
            buy_list.append(np.nan)
            priceBought = 0
            daysBought = -1
            long = False
            doc = {
                "sym": sym,
                "qty": num,
                "price": df['Price'][i],
                "side": "sell",
                "date": df['Date'][i],
                "traderId": "Ryan",
                "algo": "movingAvgs"
            }
            # collection.insert_one(doc)
        else:
            if long:
                daysBought += 1
            buy_list.append(np.nan)
            sell_list.append(np.nan)
    buy_list.append(np.nan)
    sell_list.append(np.nan)
    return buy_list, sell_list


def graph(df):
    df.to_csv('bs.csv')
    ax = df.plot(kind='line', x='Date', y=['ema10', 'ema20', 'ema30', 'Price'], grid=True,
                 title='Triple Moving Avg Strat')
    plt.figure(figsize=(20, 10))
    # plot close price, short-term and long-term moving averages
    df['Price'].plot(color='k', lw=1, label='Close Price')
    df['emaShort'].plot(color='b', lw=1, label='10-day EMA')
    df['emaMed'].plot(color='g', lw=1, label='20-day EMA')
    df['emaLong'].plot(color='r', lw=1, label='30-day EMA')
    plt.plot(df['Price'], marker='*')
    plt.ylabel('Price in USD', fontsize=15)
    plt.xlabel('Date', fontsize=15)
    plt.title('EMA Crossover', fontsize=20)
    plt.legend()
    plt.grid()
    ax.set_ylabel("Price")
    plt.autoscale()
    plt.show()


def execute(sym):
    df = getTripleMovingAvgStrat(sym)
    df['Buy'] = generateEma(df, sym)[0]
    df['Sell'] = generateEma(df, sym)[1]
    df.to_csv("myTrades.csv")
    holding = df['Price'][-1] - df['Price'][0]
    print("Holding profit: " + str(holding))
    print("BOT PNL: " + str(calculatePNL(df, 1)))
    return df


execute('PLTR')

'''
tickers = ['TSLA', 'MSFT', 'AAPL', 'DIS', 'PLTR', 'AMZN', 'NOK', 'BB', 'T', 'MORN']
for i in tickers:
    execute(i)
'''
