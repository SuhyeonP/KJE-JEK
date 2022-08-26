FROM python:3.10.6-buster

ENV MODAK_ROOT /opt/modak

WORKDIR $MODAK_ROOT

RUN pip install --upgrade pip
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -

COPY poetry.lock $MODAK_ROOT/poetry.lock
COPY pyproject.toml $MODAK_ROOT/pyproject.toml

RUN ln -sf $HOME/.poetry/bin/poetry /usr/local/bin

COPY Makefile $MODAK_ROOT/Makefile
COPY src $MODAK_ROOT/src

RUN poetry install

CMD ["make", "run-server"]
