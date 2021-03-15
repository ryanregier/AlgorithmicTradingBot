import threading
import VolumeScraper as VS
import MovingAverages as MA
import alpacaPyConnection as alpaca


def getStocks():
    print(VS.getTopTickers())
    return VS.getTopTickers()


def startAlgo(sym, qty=1, side="buy", action="market", time_in_force='gtc'):
    print("Beginning Algo for: " + sym)
    alpaca.create_order(sym, qty, side, action, time_in_force)


def enterStocks(ls):
    for i in ls:
        if alpaca.marketIsOpen():
            threading.Thread(target=startAlgo(i[0])).start()
        else:
            print("Sorry, market is closed.")
            print("Try buying: " + i[0] + " tomorrow!")


enterStocks(getStocks())
