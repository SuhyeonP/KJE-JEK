run-frontend:
	make -C frontend run-frontend

init-backend:
	make -C backend init

run-backend:
	make -C backend docker-rerun-postgres
	make -C backend run-server
