FROM ubuntu:20.04

RUN apt update
RUN apt install -y wget gnupg
RUN wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -

RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | \
		tee /etc/apt/sources.list.d/mongodb-org-5.0.list

RUN apt update
RUN apt install -y mongodb-org=5.0.2 mongodb-org-database=5.0.2 mongodb-org-server=5.0.2  \
		mongodb-org-shell=5.0.2 mongodb-org-mongos=5.0.2 mongodb-org-tools=5.0.2
EXPOSE 27017
ENTRYPOINT ["/usr/bin/mongod", "-f", "/etc/mongod.conf"]
