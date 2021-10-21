FROM ubuntu:20.04

SHELL ["/bin/bash", "-c"]

RUN apt update
RUN apt install -y curl

RUN mkdir /usr/local/nvm
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 14.18.1

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash \
		&& source $NVM_DIR/nvm.sh \
		&& nvm install v$NODE_VERSION \

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN mkdir /usr/app

WORKDIR /usr/app

COPY . /usr/app
RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]

