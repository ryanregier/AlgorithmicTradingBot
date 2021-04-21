import { getConstructorTypeOfClassLikeDeclaration } from 'tsutils';

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

export function getAcctInfo(){
    return alpaca.getAccount().then((account) => {
        return account
    })
}

export function manualTrade(sym, qty, side, type, time_in_force){
    try{
    alpaca.createOrder({
        symbol: sym,
        qty: qty,
        side: side,
        type: type,
        time_in_force: time_in_force,
    }).then(()=>{console.log("fulfilled")},()=>{console.log("rejected")})
    } catch (e){
        //shut up
    }
   
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

export function getPos(){
    return alpaca.getPositions();
}

export function getPrice(sym){
    const barset = alpaca.getBars(
        'day',
        'AAPL',
        {
            limit: 5
        }
    ).then((barset) => {
        console.log(barset['AAPL']);
    
        })

}

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



export default manualTrade;