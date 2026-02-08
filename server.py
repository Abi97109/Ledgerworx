#!/usr/bin/env python3
"""
Password-protected HTTP server for LedgerWorx website
Serve files from 'Existing Web code' folder with basic auth
"""

import http.server
import socketserver
import os
import base64
from urllib.parse import unquote

# Configuration
PORT = 7777
USERNAME = "ledgerworx_demo"
PASSWORD = "Ledger@2026#worx"
SERVE_DIR = "Existing Web code"

class AuthHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Check authentication
        auth_header = self.headers.get('Authorization')
        
        if not auth_header:
            self.send_response(401)
            self.send_header('WWW-Authenticate', 'Basic realm="LedgerWorx - Confidential"')
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(b'<h1>401 Unauthorized</h1><p>Username and password required.</p>')
            return
        
        # Parse auth header
        try:
            auth_type, auth_string = auth_header.split(' ', 1)
            if auth_type.lower() != 'basic':
                raise ValueError("Invalid auth type")
            
            decoded = base64.b64decode(auth_string).decode('utf-8')
            username, password = decoded.split(':', 1)
            
            if username != USERNAME or password != PASSWORD:
                self.send_response(401)
                self.send_header('WWW-Authenticate', 'Basic realm="LedgerWorx - Confidential"')
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(b'<h1>401 Unauthorized</h1><p>Invalid credentials.</p>')
                return
        except:
            self.send_response(400)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(b'<h1>400 Bad Request</h1>')
            return
        
        # Authentication successful, serve file
        super().do_GET()
    
    def translate_path(self, path):
        # Serve from the Existing Web code directory
        path = unquote(path)
        if path.startswith('/'):
            path = path[1:]
        
        # Default to index.html
        if path == '' or path.endswith('/'):
            path = path + 'index.html'
        
        return os.path.join(SERVE_DIR, path)

os.chdir(os.path.dirname(os.path.abspath(__file__)))

handler = AuthHandler
httpd = socketserver.TCPServer(("", PORT), handler)

print(f"✅ LedgerWorx Server Started")
print(f"📍 Local URL: http://localhost:{PORT}/")
print(f"🔐 Username: {USERNAME}")
print(f"🔒 Password: {PASSWORD}")
print(f"📁 Serving from: {SERVE_DIR}/")
print(f"\n⚠️  Share the URL with your team, they'll need to login with the credentials above.")
print(f"Press Ctrl+C to stop the server.")

try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\n\n❌ Server stopped.")
    httpd.server_close()
