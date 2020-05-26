cucumber_js = ./node_modules/.bin/cucumber-js
mocha = ./node_modules/.bin/mocha
dockerfile = ./docker/Dockerfile
dockerimagev = ./.dockerimg
package_json = ./package.json

$(cucumber_js): install
$(mocha): install

$(dockerimagev): $(dockerfile)
	docker build docker --tag jarmantestimage > $@

docker_args = -it -v $(PWD):/jarman -w /jarman jarmantestimage

docker: $(dockerimagev)

install:
	yarn install

test: install
	docker run $(docker_args) $(mocha) lib/test

cucumber: install
	docker run $(docker_args) $(cucumber_js)

test-all: test cucumber

docker-run:	docker
	docker run $(docker_args) /bin/bash

.PHONY:
clean:
	rm -rd node_modules
	rm $(dockerimagev)
