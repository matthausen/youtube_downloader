FROM python:3.7

WORKDIR /api

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

EXPOSE 8080

COPY . .

CMD ["python", "application.py"]