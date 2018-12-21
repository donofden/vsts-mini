import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from config import mailconfig

def send(receiver_email, subject, email_message):
    # read config parameters
    params = mailconfig()
    sender_email = params['email']
    password = params['password']
    host = params['host']
    port = params['port']
    # Create secure connection with server and send email

    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = sender_email
    message["To"] = receiver_email

    # Turn these into plain/html MIMEText objects
    #textEmail = MIMEText(email_message, "plain")
    htmlEmail = MIMEText(email_message, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(htmlEmail)

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(host, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(
            sender_email, receiver_email, message.as_string()
        )