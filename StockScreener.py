import finviz
from finviz.screener import Screener

# https://finviz.com/screener.ashx?v=111&f=cap_small,exch_nasd,sh_avgvol_o300,sh_float_u100,sh_relvol_o2,ta_sma20_pa10

# Shows companies in the Nasdaq that are small cap, have an average volume of over 300M, a float under 100M,
# relative volume over 2 and a SMA20 of 10 When adding the filters you need to manually add them on the FinViz
# website and you take the url and pick out the different indicators as shown above

filters = ['exch_nasd', 'cap_small', 'avgvol_o300', 'float_u100', 'relvol_o2', 'sma20_pa10']

stock_list = Screener(filters=filters, order='ticker')

for stock in stock_list[0:5]:  # Loop through 10th - 20th stocks
    print(stock['Ticker'], stock['Price'])  # Print symbol and price


def sort():
    for STOCK in stock_list[0:5]:
        print("hey")
        price_target = finviz.get_analyst_price_targets(STOCK['Ticker'])
        print(price_target)

# sort()

print(stock_list)
