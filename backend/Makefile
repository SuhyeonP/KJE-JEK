format:
	poetry run black . 
	poetry run isort . --skip-gitignore --profile black

lint:
	PYTHONPATH=src/ poetry run pylint modak

check: format lint
