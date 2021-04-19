import json
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import ssl
import time

import alpaca
import schedule

print("Starting email functionality")


def morning_update():
    alpaca.update_acctinfo_todb()
    port = 465
    password = "PW6969@$"
    context = ssl.create_default_context()
    sender_email = "wheatonstockbotllp@gmail.com"
    receiver_email = ["ryan.regier@my.wheaton.edu", "steven.barker@my.wheaton.edu", "jack.bennett@my.wheaton.edu",
                      "william.carrera@my.wheaton.edu"]
    positions = alpaca.getPositions()
    totalPosition = 0
    initialValue = 0
    currentValue = 0
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "Morning Portfolio Update"
    msg['From'] = sender_email
    for x in positions:
        print(x)
        totalPosition += x.get('qty')
        initialValue += x.get('initial position')
        currentValue += x.get('market_value')

    text = """Your positions:\n""" + "Total Position: " + str(totalPosition) + "\nInitial Value: " + "${:,.2f}".format(
        initialValue) + "\nCurrent Value: " + "${:,.2f}".format(currentValue) + "\n " + json.dumps(
        alpaca.getPositions(),
        indent=4, sort_keys=True)
    part1 = MIMEText(text, 'plain')
    msg.attach(part1)
    for i in receiver_email:
        msg['To'] = i
        with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
            server.login("wheatonstockbotllp@gmail.com", password)
            # TODO: Send email here
            server.sendmail(sender_email, i, msg.as_string())


def afternoon_update():
    alpaca.update_acctinfo_todb()
    port = 465
    password = "PW6969@$"
    context = ssl.create_default_context()
    sender_email = "wheatonstockbotllp@gmail.com"
    receiver_email = ["ryan.regier@my.wheaton.edu", "steven.barker@my.wheaton.edu", "jack.bennett@my.wheaton.edu",
                      "william.carrera@my.wheaton.edu"]
    positions = alpaca.getPositions()
    totalPosition = 0
    initialValue = 0
    currentValue = 0
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "Afternoon Portfolio Update"
    msg['From'] = sender_email
    for x in positions:
        print(x)
        totalPosition += x.get('qty')
        initialValue += x.get('initial position')
        currentValue += x.get('market_value')

    text = """Your positions:\n""" + "Total Position: " + str(totalPosition) + "\nInitial Value: " + "${:,.2f}".format(
        initialValue) + "\nCurrent Value: " + "${:,.2f}".format(currentValue) + "\n " + " Equity: " + \
           "${:,.2f}".format(float(alpaca.get_equity())) + "\nBalance change: " \
           + "${:,.2f}".format((alpaca.get_balance_change())) + "\n" + json.dumps(alpaca.getPositions(), indent=4,
                                                                                     sort_keys=True)
    part1 = MIMEText(text, 'plain')
    msg.attach(part1)
    for i in receiver_email:
        msg['To'] = i
        with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
            server.login("wheatonstockbotllp@gmail.com", password)
            # TODO: Send email here
            server.sendmail(sender_email, i, msg.as_string())
    alpaca.update_acctinfo_positions()
    alpaca.update_acct_balance_change()


schedule.every().day.at("13:00").do(morning_update)
schedule.every().day.at("20:27").do(afternoon_update)
# alpaca.update_acctinfo_positions()
while True:
    schedule.run_pending()
    time.sleep(1)

