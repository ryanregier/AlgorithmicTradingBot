from typing import Dict, List, Any

import finviz
from finviz.screener import Screener

# https://finviz.com/screener.ashx?v=111&f=cap_small,exch_nasd,sh_avgvol_o300,sh_float_u100,sh_relvol_o2,ta_sma20_pa10

# Shows companies in the Nasdaq that are small cap, have an average volume of over 300M, a float under 100M,
# relative volume over 2 and a SMA20 of 10 When adding the filters you need to manually add them on the FinViz
# website and you take the url and pick out the different indicators as shown above

filters = ['exch_nasd', 'cap_small', 'avgvol_o300', 'float_u100', 'relvol_o2', 'sma20_pa10', ]

stock_list = Screener(filters=filters, table='Performance', order='price')

new_list = []


def printStockList():
    for stock in stock_list[0:5]:  # Loop through 1 - 5 stocks
        print(stock['Ticker'], stock['Price'])  # Print symbol and price


def sort():
    for STOCK in stock_list[0:500]:

        if float(STOCK['Price']) > 10:
            new_list.append(STOCK)
            # print(new_list)


def checkNews():  # one of the specifcations is that the stock needs to have a good amount of news, this function
    # counts the number of headlines the stock has
    for STOCK in new_list[0:5]:
        news = finviz.get_news(STOCK['Ticker'])
        print(news)


def printNewList():
    print('Here is the New List with Stocks with a price over $10:')
    print(new_list)


printNewList()
sort()
printNewList()

checkNews()
# print(stock_list)
