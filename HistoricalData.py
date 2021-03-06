import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt

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
        df.plot(kind='line', x='Date', y='Close', grid=True, title='Price vs Time')
        plt.autoscale()
        plt.show()
        # print(stock.history(start=start, end=end))


def buildAnalysis():
    if stockIsEmpty():
        return
    info = stock.info
    print(info)


getTicker("AAPL")
commands("type")
queryHistData(start="2021-1-1", end="2021-2-2")
'''
queryHistData(period="ytd")
queryHistData(period="max")
queryHistData(period="1d")
queryHistData(interval="1wk")
'''
