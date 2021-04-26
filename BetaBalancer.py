import alpaca


def totalBeta():
    positions = alpaca.getPositions()
    print(positions)
    info = alpaca.getPositionBeta('ZOM')
    print(info['beta'])
    beta = 0
    num = 0
    for x in positions:
        try:
            info = alpaca.getPositionBeta(x['symbol'])
            print(info)
            beta += info['beta']
            num += 1
        except TypeError:
            beta += 1
            num += 1
            print(x['symbol'] + " missing beta")
    portfolioBeta = float(beta / num)
    print("Portfolio beta: " + str(round(portfolioBeta, 4)))
    return portfolioBeta
