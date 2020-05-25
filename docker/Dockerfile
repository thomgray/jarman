FROM node:8

RUN apt-get update && apt-get upgrade -y
RUN apt-get install default-jdk -y

RUN apt-get install -y vim

COPY scripts scripts
RUN chmod +x /scripts/makejar.sh
RUN chmod +x /scripts/makecustomjar.sh
COPY resources resources

ENV TEST_ENV DOCKER
