FROM python:3.12-slim

WORKDIR /app

COPY app.py /app/app.py
RUN pip install --no-cache-dir pylint
# Run the script when the container starts
CMD ["python", "app.py"]
