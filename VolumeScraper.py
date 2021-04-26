# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9'}
url = 'https://finance.yahoo.com/most-active'
response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.content, 'lxml')


def getTopTickers():
    topTradedStocks = []
    for item in soup.select('.simpTblRow'):
        ticker = item.select('[aria-label=Symbol]')[0].get_text()
        name = item.select('[aria-label=Name]')[0].get_text()
        vol = item.select('[aria-label=Volume]')[0].get_text()
        topTradedStocks.append(ticker)
    return topTradedStocks


print(getTopTickers())
