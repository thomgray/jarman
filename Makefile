cucumber_js = ./node_modules/.bin/cucumber-js
mocha = ./node_modules/.bin/mocha
dockerfile = ./docker/Dockerfile
dockerimagev = ./.dockerimg
package_json = ./package.json

$(cucumber_js): install
$(mocha): install

$(dockerimagev): $(dockerfile)
	docker build docker --tag jarmantestimage | tee $@

docker_args_tty =  -v $(PWD):/jarman -w /jarman jarmantestimage
docker_args = -it $(docker_args_tty)

docker: $(dockerimagev)

install:
	yarn install

test: install docker
	docker run $(docker_args) $(mocha) lib/test

test-ci: install docker
	docker run $(docker_args_tty) $(mocha) lib/test

cucumber: install docker
	docker run $(docker_args) $(cucumber_js)

cucumber-ci: install docker
	docker run $(docker_args_tty) $(cucumber_js)

cucumber-wip: install docker
	docker run $(docker_args) $(cucumber_js) -t @wip

test-all: test cucumber

test-all-ci: test-ci cucumber-ci

docker-run:	docker
	docker run $(docker_args) /bin/bash

.PHONY:
clean:
	rm -rd node_modules
	rm $(dockerimagev)
