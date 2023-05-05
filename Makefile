IMAGE_NAME=fazool-ui
STABLE_TAG=0.1.0
UNIQUE_TAG=${STABLE_TAG}-${shell date "+%Y.%m.%d"}-${shell git rev-parse --short HEAD}

init:
	sudo apt-get update
	sudo apt-get upgrade
	sudo apt install npm
	npm install

run:
	npm start

run-docker:
	docker run --rm \
	-p 5173:5173 \
	${IMAGE_NAME}:${UNIQUE_TAG}

build:
	docker build \
	-t ${IMAGE_NAME}:${STABLE_TAG} \
	-t ${IMAGE_NAME}:${UNIQUE_TAG} \
	.