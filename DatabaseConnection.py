from pymongo import MongoClient
import pandas as pd

DATABASE_NAME = "tradingbot"
DATABASE_HOST = "cluster0-shard-00-02.b3s46.mongodb.net:27017"

DATABASE_USERNAME = "ryanregier"
DATABASE_PASSWORD = "admin123"

client = MongoClient("mongodb+srv://ryanregier:admin123@cluster0.b3s46.mongodb.net/<dbname>?retryWrites=true&w=majority")
db = client['tradingbot']
collection = db['users']
print(db.list_collection_names())
results = collection.find({})
df = pd.DataFrame(results)
print(df)
