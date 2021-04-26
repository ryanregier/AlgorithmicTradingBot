import React from 'react';

const Http = new XMLHttpRequest();



function AlgoPage({setPage}){
    return (
        <div>
            
            Algo page
            It is currently making money

            The two main algorithms the WSB utilizes are a Triple Moving Averages algorithm and Volume Weighted Average Price (VWAP) algorithm.
            The triple moving averages algo employs three moving averages of different time periods. A fast, medium, and slow moving average.
            The algo will use three different time periods to help confirm buy and sell signals as using only two weighted averages (exponential weighted averages in our case)
            can trigger false signals. The VWAP algo provides us with a more accurate depiction of a fair value for a stock by using volume in the weighting of the price. This helps
            us see if we think a stock is under or overvalued based on the trading price of the equity in relation to the VWAP calculation. A stock may be undervalued if the VWAP is greater than the trading price.
            The formula for vwap is (summation of [volume * price])/(summation[volume]). The reason we utilize algorithmic trading on top of our manual trading is because an algorithm
            is the most effective way to sustainably day trade. Instead of spending constant hours in front of several monitors viewing information flow and manually executing trades, an algorithm
            can calculate much quicker the signals and execute a trade with much better accuracy. We also have our expert trading teams monitoring these algos throughout the market hours to ensure client satisfation and
            reliable profit. We have a top notch quant research team looking for new ways to beat the markets.
        </div>

    )
}

export default AlgoPage