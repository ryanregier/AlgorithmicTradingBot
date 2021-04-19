import time

from pymongo import MongoClient
import pandas as pd

DATABASE_NAME = "tradingbot"
DATABASE_HOST = "cluster0-shard-00-02.b3s46.mongodb.net:27017"

DATABASE_USERNAME = "ryanregier"
DATABASE_PASSWORD = "admin123"

client = MongoClient("mongodb+srv://ryanregier:admin123@cluster0.b3s46.mongodb.net/<dbname>?retryWrites=true&w=majority")
db = client['tradingbot']
collection = db['users']
ts = time.time()
doc = {
        "username": "STMA",
        "role": "algo",
        "accountId": 7,
        "dateCreated": ts,
        "email": "ryan.regier@my.wheaton.edu",
        "password": "password",
        "firstName": "Ryan",
        "lastName": "Regier"
}
collection.insert_one(doc)
print(db.list_collection_names())
results = collection.find({})
df = pd.DataFrame(results)
with pd.option_context('display.max_rows', None, 'display.max_columns', None):  # more options can be specified also
    print(df)

