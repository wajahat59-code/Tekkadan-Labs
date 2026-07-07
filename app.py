from flask import Flask, render_template, request
import datetime

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html", now=datetime.datetime.now())

@app.route("/about")
def about():
    return render_template("about.html", now=datetime.datetime.now())

@app.route('/signup')
def signup():
    return render_template('signup.html', now=datetime.datetime.now())

@app.route('/signin')
def signin():
    return render_template('signin.html', now=datetime.datetime.now())

@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form.get("name", "")
        email = request.form.get("email", "")
        subject = request.form.get("subject", "")
        message = request.form.get("message", "")
        print(f"Message from {name} ({email}): {subject} - {message}")
        # You can add email sending functionality here later
    return render_template("contact.html", now=datetime.datetime.now())

@app.route("/send_message", methods=["POST"])
def send_message():
    name = request.form.get("name", "")
    email = request.form.get("email", "")
    subject = request.form.get("subject", "")
    message = request.form.get("message", "")
    print(f"Message from {name} ({email}): {subject} - {message}")
    # Redirect back to contact page after submission
    return render_template("contact.html", now=datetime.datetime.now())

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
# For Vercel
app = app