import alpaca

positions = alpaca.getPositions()
print(positions)
info = alpaca.getPositionBeta('ZOM')
print(info['beta'])
totalBeta = 0
num = 0
for x in positions:
    try:
        info = alpaca.getPositionBeta(x['symbol'])
        print(info)
        totalBeta += info['beta']
        num += 1
    except TypeError:
        totalBeta += 1
        num += 1
        print(x['symbol'] + " missing beta")

portfolioBeta = float(totalBeta / num)
print(round(portfolioBeta, 4))
