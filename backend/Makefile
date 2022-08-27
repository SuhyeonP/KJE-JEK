##################
# Set up project #
##################
install-poetry:
	if [ `which poetry` ]; then\
		echo "Poetry already installed.";\
	elif [ `command -v brew` ]; then\
		brew install poetry;\
	else\
		curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python - ;\
	fi;\

init: install-poetry
	@echo "Initialize project";\
	poetry install

format:
	poetry run black .
	poetry run isort . --skip-gitignore --profile black

lint:
	PYTHONPATH=src/ poetry run pylint modak

check: format lint

#######################
# Run server in local #
#######################

POSTGRES_CONTAINER_NAME := postgres
POSTGRES_USER := modak
POSTGRES_PASSWORD := modaki2017!
POSTGRES_DB := modak
POSTGRES_LOCAL_MOUNT_DIR := ~/pgdata

docker-rerun-postgres: docker-stop-postgres docker-run-postgres

docker-stop-postgres:
	@echo "Stopping postgres";
	@if [ `docker ps -f name=$(POSTGRES_CONTAINER_NAME) -q` ];\
		then docker stop $$(docker ps -f name=$(POSTGRES_CONTAINER_NAME) -q);\
		echo "Postgres Stopped";\
	else\
		echo "No postgres is running";\
	fi;

docker-run-postgres:
	docker run -d --rm -it \
	  --name postgres \
	  -e POSTGRES_USER=$(POSTGRES_USER) \
	  -e POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) \
	  -e POSTGRES_DB=$(POSTGRES_DB) \
	  -p 5432:5432 \
	  -v ${POSTGRES_LOCAL_MOUNT_DIR}:/var/lib/postgresql/data \
	  postgres:14.0
	@echo "You can access PostgreSQL on localhost:5432 now"
	@echo "user: $(POSTGRES_USER), password: $(POSTGRES_PASSWORD), default_database: $(POSTGRES_DB)"

# run-server: docker-rerun-postgres
run-server:
	@echo "Run server";\
	PYTHONPATH=src/
	poetry run uvicorn src.modak.main:app --reload --host=0.0.0.0 --port=8080 --no-access-log

discard-postgres-data:
	@echo "Discard postgres data";\
	rm -rf ${POSTGRES_LOCAL_MOUNT_DIR}

########################
# Docker build and run #
########################

docker-build:
	@echo "Build docker image";\
	docker build -f docker/modak/Dockerfile -t modak .

docker-run:
	@echo "Run docker image";\
	docker run -it --rm -p 8080:8080 modak
