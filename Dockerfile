FROM python:slim

WORKDIR /app
COPY req.txt /app/

RUN pip install -r req.txt

CMD [ "python", "app.py" ]
