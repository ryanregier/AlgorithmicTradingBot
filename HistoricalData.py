import time

import schedule as schedule
import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
import plotly.graph_objects as go
from mplfinance.original_flavor import candlestick_ohlc
import matplotlib.dates as mpdates
from matplotlib import style
from pymongo import MongoClient
import alpacaPyConnection as alpaca
from pandas_datareader import data as web
import plotly.offline as py
import os

if not os.path.exists("images"):
    os.mkdir("images")

style.use('ggplot')

DATABASE_NAME = "tradingbot"
DATABASE_HOST = "cluster0-shard-00-02.b3s46.mongodb.net:27017"

DATABASE_USERNAME = "ryanregier"
DATABASE_PASSWORD = "admin123"
client = MongoClient(
    "mongodb+srv://ryanregier:admin123@cluster0.b3s46.mongodb.net/<dbname>?retryWrites=true&w=majority")

# plt.style.use('dark_background')
global stock
stock = None


def getTicker(sym):
    global stock
    try:
        stock = yf.Ticker(sym)
        print(stock)
    except Exception:
        print("Stock not found!")


def stockIsEmpty():
    if stock is None:
        print("Commands not available because no ticker found!")
        return True
    return False


def commands(cmd):
    if stockIsEmpty():
        return
    if cmd == 'd':
        print(stock.dividends)
    elif cmd == 'f':
        print(stock.financials)
    elif cmd == 'bs':
        print(stock.balance_sheet)
    elif cmd == 'e':
        print(stock.earnings)
    elif cmd == 'h':
        print(stock.history(period="max"))
    elif cmd == 'i':
        print(stock.info)
    elif cmd == 'type':
        print(stock.info['quoteType'])
    elif cmd == 'a':
        buildAnalysis()


def alternateCS(df):
    df['Date'] = pd.to_datetime(df['Date'])

    # apply map function
    df['Date'] = df['Date'].map(mpdates.date2num)

    # creating Subplots
    fig, ax = plt.subplots()

    # plotting the data
    candlestick_ohlc(ax, df.values, width=0.6,
                     colorup='green', colordown='red',
                     alpha=0.8)

    # allow grid
    ax.grid(True)

    # Setting labels
    ax.set_xlabel('Date')
    ax.set_ylabel('Price')

    # setting title
    plt.title('Prices For the Period')

    # Formatting Date
    date_format = mpdates.DateFormatter('%d-%m-%Y')
    ax.xaxis.set_major_formatter(date_format)
    fig.autofmt_xdate()

    fig.tight_layout()

    # show the plot
    plt.show()


def queryHistData(period=None, interval=None, start=None, end=None):
    if stockIsEmpty():
        return
    if period is not None:
        print(stock.history(period=period))
    elif interval is not None:
        print(stock.history(interval=interval))
    else:
        df = pd.DataFrame.from_dict(stock.history(start=start, end=end))
        df.to_csv("info.csv")
        xVals = df.index.tolist()
        df['Date'] = xVals
        print(stock.info)
        ax = df.plot(kind='line', x='Date', y='Close', grid=True,
                     title='Price of ' + stock.info['shortName'] + ' vs Time (range: ' + start + ',' + end + ')')
        ax.set_ylabel("Price (USD)")
        plt.autoscale()
        plt.savefig('foo.png')
        plt.show()
        ax1 = df.plot(kind='line', x='Date', y='Volume', grid=True,
                      title='Volume of ' + stock.info['shortName'] + ' vs Time (range: ' + start + ',' + end + ')')
        ax1.set_ylabel("Shares")
        plt.autoscale()
        plt.savefig('foo1.png')
        plt.show()
        fig = go.Figure(data=[go.Candlestick(x=df['Date'],
                                             open=df['Open'],
                                             high=df['High'],
                                             low=df['Low'],
                                             close=df['Close'])])
        fig.show()
        fig.write_html("fig0.html")
        fig = go.Figure(data=[go.Candlestick(x=df['Date'],
                                             open=df['Open'], high=df['High'],
                                             low=df['Low'], close=df['Close'])
                              ])

        fig.update_layout(xaxis_rangeslider_visible=False)
        fig.show()
        fig.write_html("fig00.html")
        alternateCS(df)
        # print(stock.history(start=start, end=end))


def buildCS(sym):
    stock = sym
    df = web.DataReader(stock, data_source='yahoo', start='01-01-2021')
    # Calculate and define moving average of 30 periods
    avg_30 = df.Close.rolling(window=30, min_periods=1).mean()
    avg_20 = df.Close.rolling(window=20, min_periods=1).mean()
    avg_10 = df.Close.rolling(window=10, min_periods=1).mean()
    trace1 = {
        'x': df.index,
        'open': df.Open,
        'close': df.Close,
        'high': df.High,
        'low': df.Low,
        'type': 'candlestick',
        'name': sym,
        'showlegend': True
    }
    trace2 = {
        'x': df.index,
        'y': avg_30,
        'type': 'scatter',
        'mode': 'lines',
        'line': {
            'width': 1,
            'color': 'blue'
        },
        'name': 'Moving Average of 30 periods'
    }
    trace3 = {
        'x': df.index,
        'y': avg_20,
        'type': 'scatter',
        'mode': 'lines',
        'line': {
            'width': 1,
            'color': 'green'
        },
        'name': 'Moving Average of 20 periods'
    }
    trace4 = {
        'x': df.index,
        'y': avg_10,
        'type': 'scatter',
        'mode': 'lines',
        'line': {
            'width': 1,
            'color': 'red'
        },
        'name': 'Moving Average of 10 periods'
    }
    data = [trace1, trace2, trace3, trace4]
    # Config graph layout
    layout = go.Layout({
        'title': {
            'text': sym + ' Analysis',
            'font': {
                'size': 15
            }
        }
    })
    fig = go.Figure(data=data, layout=layout)
    fig.write_image("images/fig1.png")
    py.plot(fig, "fig1.html")


def buildAnalysis():
    if stockIsEmpty():
        return
    try:
        info = stock.info
        db = client['tradingbot']
        collection = db['stockinfo']
        collection.replace_one({'symbol': info['symbol']}, info, True)
        # print(info)
        f = open("analysis.txt", "w")
        f.write("Stock Analysis for: " + info['shortName'] + "\n")
        f.write("Symbol: " + info['symbol'] + "\n")
        f.write("Type: " + info['quoteType'] + "\n")
        f.write("Market: " + info['market'] + "\n")
        f.write("Info: " + info['longBusinessSummary'] + "\n")
        try:
            f.write("Sector: " + info['sector'] + "\n")
        except KeyError:
            pass
        try:
            f.write("Country: " + info['country'] + "\n")
        except KeyError:
            pass
        f.write("Closing Price: " + str(info['previousClose']) + "\n")
        f.write("Financials:\n")
        f.write("\tDividend Rate: " + str(info['dividendRate']) + "\n")
        f.write("\tBeta: " + str(info['beta']) + "\n")
        f.write("\tPrice to Book: " + str(info['priceToBook']) + "\n")
        f.write("\tMarket Cap: " + str(info['marketCap']) + "\n")
        try:
            f.write("\tTrailing PE: " + str(info['trailingPE']) + "\n")
        except KeyError:
            pass
        f.write("\tForward PE: " + str(info['forwardPE']) + "\n")
        f.write("\t52 wk. high: " + str(info['fiftyTwoWeekHigh']) + "\n")
        f.write("\tPayout Ratio: " + str(info['payoutRatio']) + "\n")
        f.write("\tTrailingAnnualDividendYield: " + str(info['trailingAnnualDividendYield']) + "\n")
        f.write("\tAverageDailyVolume10Day: " + str(info['averageDailyVolume10Day']) + "\n")
        f.write("\tAverage Volume:" + str(info['averageVolume']) + "\n")
        f.close()
    except Exception:
        pass


def job():
    stocks = alpaca.api.list_assets(status='active')
    for i in stocks:
        getTicker(i.symbol)
        buildAnalysis()


schedule.every().day.at("6:00").do(job)
while True:
    schedule.run_pending()
    time.sleep(1)

'''
ls = alpacaScript.getPositions()
for i in ls:
    getTicker(i.symbol)
    commands("a")
'''

# buildCS('TSLA')
# alpacaScript.update_acct_balance_change()
# getTicker("AAPL")
# commands("a")
# queryHistData(start="2020-1-1", end="2021-1-1")
'''
queryHistData(period="ytd")
queryHistData(period="max")
queryHistData(period="1d")
queryHistData(interval="1wk")
'''
