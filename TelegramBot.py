from telegram.ext import *
import Responses as R

TELEGRAM_API = '1733243546:AAF_hVw9BiJSVFx2Nbrehz_4_2aWzBr0RMg'
updater = Updater(token=TELEGRAM_API, use_context=True)
dispatcher = updater.dispatcher

print("Bot started....")


def start_command(update, context):
    update.message.reply_text('Type something random to get started!')


def help_command(update, context):
    update.message.reply_text('Ask for help on google!')


def handle_message(update, context):
    text = str(update.message.text).lower()
    response = R.sample_responses(text)
    update.message.reply_text(response)


def error(update, context):
    print(f"Update {update} caused error {context.error}")


def main():
    updater = Updater(TELEGRAM_API, use_context=True)
    dp = updater.dispatcher
    dp.add_handler(CommandHandler("start", start_command))
    dp.add_handler(CommandHandler("help", help_command))
    dp.add_handler(MessageHandler(Filters.text, handle_message))

    dp.add_error_handler(error)
    updater.start_polling(5)
    updater.idle()


if __name__ == '__main__':
    main()
