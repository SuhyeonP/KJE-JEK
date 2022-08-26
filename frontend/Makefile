run-frontend:
	yarn dev

docker-build:
	docker build -f docker/modak-front/Dockerfile -t modak-front .

docker-push:
	docker push modak-front

docker-run:
	docker run -it --rm -p 80:80 modak-front
