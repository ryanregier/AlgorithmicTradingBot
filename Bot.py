import threading
import VolumeScraper as VS
import MovingAverages as MA
import alpacaPyConnection as alpaca


def getStocks():
    print(VS.getTopTickers())
    return VS.getTopTickers()


def startAlgo(sym, qty, side, action, time_in_force='gtc'):
    print("Beginning Algo")
    alpaca.create_order(sym, qty, side, action, time_in_force)


def enterStocks(ls):
    for i in ls:
        threading.Thread(target=startAlgo(i[0])).start()


enterStocks(getStocks())
