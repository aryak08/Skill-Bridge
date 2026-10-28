#!/usr/bin/env python3
"""
SkillBridge Local Development Server
Provides zero-configuration local hosting with correct ES module MIME types and CORS headers.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and caching headers for seamless local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def guess_type(self, path):
        # Ensure JavaScript modules are served with standard application/javascript
        if path.endswith('.js') or path.endswith('.mjs'):
            return 'application/javascript'
        if path.endswith('.css'):
            return 'text/css'
        if path.endswith('.json'):
            return 'application/json'
        return super().guess_type(path)

def run(port=PORT):
    # Try preferred port, increment if occupied
    attempts = 0
    while attempts < 10:
        try:
            with socketserver.TCPServer(("", port), Handler) as httpd:
                print(f"=======================================================")
                print(f"  SKILLBRIDGE LOCAL SERVER RUNNING")
                print(f"  Url: http://localhost:{port}")
                print(f"  Document Root: {DIRECTORY}")
                print(f"  Press Ctrl+C to terminate server")
                print(f"=======================================================")
                
                # Open browser automatically if running interactively
                if "--no-browser" not in sys.argv:
                    try:
                        webbrowser.open(f"http://localhost:{port}")
                    except Exception:
                        pass
                
                httpd.serve_forever()
        except OSError as e:
            if "Address already in use" in str(e) or e.errno == 98 or e.errno == 10048:
                port += 1
                attempts += 1
            else:
                raise e

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 and sys.argv[1].isdigit() else PORT
    run(port)
