import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
import plotly.graph_objects as go
from mplfinance.original_flavor import candlestick_ohlc
import matplotlib.dates as mpdates

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
        ax1.set_ylabel("Price (USD)")
        plt.autoscale()
        plt.savefig('foo1.png')
        plt.show()
        fig = go.Figure(data=[go.Candlestick(x=df['Date'],
                                             open=df['Open'],
                                             high=df['High'],
                                             low=df['Low'],
                                             close=df['Close'])])
        fig.show()
        fig = go.Figure(data=[go.Candlestick(x=df['Date'],
                                             open=df['Open'], high=df['High'],
                                             low=df['Low'], close=df['Close'])
                              ])

        fig.update_layout(xaxis_rangeslider_visible=False)
        fig.show()
        alternateCS(df)
        # print(stock.history(start=start, end=end))


def buildAnalysis():
    if stockIsEmpty():
        return
    info = stock.info
    print(info)


getTicker("AAPL")
commands("type")
queryHistData(start="2021-1-1", end="2021-3-5")
'''
queryHistData(period="ytd")
queryHistData(period="max")
queryHistData(period="1d")
queryHistData(interval="1wk")
'''
