import threading
import VolumeScraper as VS
import MovingAverages as MA


def getStocks():
    print(VS.getTopTickers())
    return VS.getTopTickers()


def startAlgo(sym):
    print("Beginning Algo")
    print(sym)


def enterStocks(ls):
    for i in ls:
        threading.Thread(target=startAlgo(i[0])).start()


enterStocks(getStocks())
