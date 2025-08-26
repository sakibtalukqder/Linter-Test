FROM python:slim as base

WORKDIR /app
COPY req.txt /app/

RUN pip install -r req.txt

FROM base as Flask-App
CMD [ "python", "app.py" ]

FROM base as linter-test

RUN pip install pylint
CMD ["sh", "-c", "pylint $(find . -type f -name '*.py')"]

FROM base as unit-test

RUN pip install pytest
CMD [ "pytest","app.py" ]