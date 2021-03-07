import yfinance as yf
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import alpacaPyConnection as ape

pd.options.mode.chained_assignment = None  # default='warn'

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


def getTripleMovingAvgStrat():
    df1 = exponentialMovingAverage('TSLA', '2021-1-4', '2021-1-15', 10)
    df2 = exponentialMovingAverage('TSLA', '2021-1-4', '2021-1-25', 20)
    df3 = exponentialMovingAverage('TSLA', '2021-1-4', '2021-2-5', 30)
    df = pd.DataFrame()
    df['Date'] = df1['Date']
    df['Price'] = df3['Adj Close']
    df['ema30'] = df3['ema']
    df['ema20'] = df2['ema']
    df['ema10'] = df1['ema']
    return df


def checkBuyEma(df):
    global BUY
    print(df['ema10'].iloc[-1])
    if df['ema10'].iloc[-1] > df['ema20'].iloc[-1]:
        print("Small position")
        smallPosition = True
    if smallPosition:
        if df['ema10'].iloc[-1] > df['ema30'].iloc[-1]:
            print("Medium position")
            increasePosition = True
    if increasePosition:
        if df['ema20'].iloc[-1] > df['ema30'].iloc[-1]:
            print("Big Buy")
            leverUp = True
            BUY = True
            print("LEVERED UP")


def graph(df):
    df.to_csv('bs.csv')
    ax = df.plot(kind='line', x='Date', y=['ema10', 'ema20', 'ema30', 'Price'], grid=True,
                 title='Triple Moving Avg Strat')
    ax.set_ylabel("Price")
    # plt.autoscale()
    plt.show()


'''
simpleMovingAverage('PLTR', '2021-1-4', '2021-1-15', 10)
exponentialMovingAverage('PLTR', '2021-1-4', '2021-1-15', 10)
triangularMovingAverage(10)
generateGraph()
'''
# graphTripleMovingAvgStrat();
print("Starting script")
checkStocks()
checkBuyEma(getTripleMovingAvgStrat())
graph(getTripleMovingAvgStrat())
