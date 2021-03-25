import http.server
import socketserver
import MovingAverages as MA

import sys

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)

        # Setting the header
        self.send_header("Content-type", "html")

        # Whenever using 'send_header', you also have to call 'end_headers'
        self.end_headers()

        # Produce graph from Ryan's stuff
        # send the html

       # self.wfile.write(bytes(html, "utf8"))





