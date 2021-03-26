const Alpaca = require('@alpacahq/alpaca-trade-api')
const alpaca = new Alpaca({
    keyId: 'PKTSOANLV7FIXQR8NJSR',
    secretKey: 'H211M4TJ7C7D8AUUuPt50IyAUh6AKTd4idPRWLZc',
    paper: true,
    usePolygon: false
})

export const getStocks = async () => { 
    var stocks = await alpaca.getAssets({ status: 'active' })
    return stocks;
};

function getAcctInfo(){
    alpaca.getAccount().then((account) => {
        console.log('Current Account:', account)
        return account
    })
}

function checkIfTradable(sym){
    try {
        alpaca.getAsset(sym)
            .then((asset) => {
                if (asset.tradable) {
                    console.log('We can trade ' + sym)
                    return true
                }
            })
    } catch (e) {
        console.log('ERROR')
        return false
    }
}
//needs to work when it can't trade symbol and shouldn't crash
checkIfTradable('MSFT')

export function manualTrade(sym, qty, side, type, time_in_force){
    alpaca.createOrder({
        symbol: sym,
        qty: qty,
        side: side,
        type: type,
        time_in_force: time_in_force,
    })
}

function manualTradeLim(sym, qty, side, type, time_in_force, limit_price){
    alpaca.createOrder({
        symbol: sym,
        qty: qty,
        side: side,
        type: type,
        time_in_force: time_in_force,
        limit_price: limit_price
    })
}

function getClosedOrders(){
    // Get the last 100 of our closed orders
    const closedOrders = alpaca.getOrders({
        status: 'closed',
        limit: 100,
        nested: true  // show nested multi-leg orders
    }).then((closedOrders) => {
        // Get only the closed orders for a particular stock
        const closedAaplOrders = closedOrders.filter(order => order.symbol == 'AAPL')
        console.log(closedAaplOrders)
    })
}
//getClosedOrders()

function getAssetList(){
    // Get a list of all active assets.
    const activeAssets = alpaca.getAssets({
        status: 'active'
    }).then((activeAssets) => {
        // Filter the assets down to just those on NASDAQ.
        const nasdaqAssets = activeAssets.filter(asset => asset.exchange == 'NASDAQ')
        console.log(nasdaqAssets)
    })
}
//getAssetList()

function getPrice(sym){

}


export default manualTrade;
//manualTrade('MSFT',8,'buy','market','day')
//console.log("Committed trade!")
