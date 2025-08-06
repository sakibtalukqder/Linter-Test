FROM python:slim as base

WORKDIR /app
COPY req.txt /app/

RUN pip install -r req.txt

CMD [ "python", "app.py" ]

FROM base as linter-test

RUN pip install pylint
CMD [ "pylint","app.py" ]