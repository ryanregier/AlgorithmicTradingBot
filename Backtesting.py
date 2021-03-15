import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import yfinance as yf

plt.style.use('fivethirtyeight')


def getHistoricalData(sym):
    stock = yf.Ticker(sym)
    df = pd.DataFrame.from_dict(stock.history(start="2019-01-01", end="2021-01-01"))
    df.to_csv("stockbacktest.csv")
    return df


def getEMAs(df):
    ShortEMA = df.Close.ewm(span=10, adjust=False).mean()
    MiddleEMA = df.Close.ewm(span=20, adjust=False).mean()
    LongEMA = df.Close.ewm(span=50, adjust=False).mean()
    df['Short'] = ShortEMA
    df['Middle'] = MiddleEMA
    df['Long'] = LongEMA
    return df


def buy_sell_function(data):
    buy_list = []
    sell_list = []
    flag_long = False
    flag_short = False
    for i in range(0, len(data)):
        if data['Long'][i] > data['Middle'][i] > data['Short'][i] and not flag_long and not flag_short:
            buy_list.append(data['Close'][i])
            sell_list.append(np.nan)
            flag_short = True
        elif data['Long'][i] < data['Middle'][i] < data['Short'][i] and not flag_short and not flag_long:
            buy_list.append(data['Close'][i])
            sell_list.append(np.nan)
            flag_long = True
        elif flag_short and data['Short'][i] > data['Middle'][i]:
            sell_list.append(data['Close'][i])
            buy_list.append(np.nan)
            flag_short = False
        elif flag_long and data['Short'][i] < data['Middle'][i]:
            sell_list.append(data['Close'][i])
            buy_list.append(np.nan)
            flag_long = False
        else:
            buy_list.append(np.nan)
            sell_list.append(np.nan)
    return buy_list, sell_list


def calculatePNL(df, num):
    profit = 0.0
    priceBought = 0.0
    for i in range(len(df)):
        if df['Buy'][i] > 0:
            priceBought = (num * df['Buy'][i])
        elif df['Sell'][i] > 0:
            profit += (num * df['Sell'][i]) - (num * priceBought)
    print(profit)


def testDiamondHands(df):
    profit = df['Close'][-1] - df['Close'][0]
    print(profit)


def runBacktest(sym):
    df = getHistoricalData(sym)
    df = getEMAs(df)
    df['Buy'] = buy_sell_function(df)[0]
    df['Sell'] = buy_sell_function(df)[1]
    calculatePNL(df, 1)
    # plot(df)
    testHold = getHistoricalData(sym)
    testDiamondHands(testHold)


runBacktest('Z')
