from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.post("/test")
def test():
    content = request.json
    print(content)
    return {}

if __name__ == '__main__':
    context = ('local.crt', 'local.key')#certificate and key files
    app.run(debug=True, ssl_context=context)
