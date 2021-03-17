# Rules of strategy
# Market: S&P 500
# Trend: S&P 500 above the 200-moving day average
# Entry: 10-period RSI below 30 (buy on the next day's open)
# Exit: 10-period RSI above 40 or after 10 trading days (sell at the next day's open)


import yfinance as yf
import alpacaPyConnection as alpaca
import pandas as pd
import pandas_ta as ta


def getSPMA():
    data = yf.download(tickers='SPY', period='200d', interval='1d')
    xVals = data.index.tolist()
    df = pd.DataFrame(data)
    df['Date'] = xVals
    df['Price'] = df['Adj Close']
    df['ema'] = df['Adj Close'].ewm(span=200).mean()
    # df.to_csv('sp500.csv')
    return df


def getRSI(df):
    return ta.rsi(df['Adj Close'], 10)


def algo(sym='SPY', qty=100):
    df = getSPMA()
    rsiSeries = getRSI(df)
    df['rsi'] = rsiSeries
    # df.to_csv('rsi.csv')
    long_position = False
    if df['ema'][-1] > df['Price'][-1] and df['rsi'][-1] < 40 and not long_position:
        alpaca.execute_trade(sym, qty, 'buy', 'market', 'fok')
        long_position = True
    elif long_position and df['rsi'][-1] > 40:
        alpaca.execute_trade(sym, qty, 'sell', 'market', 'fok')
        long_position = False
    print(long_position)


algo()
