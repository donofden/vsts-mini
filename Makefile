NODE=$(shell which node)
NPM=$(shell which npm)
YARN=$(shell which yarn)
JQ=$(shell which jq)
OS := $(shell uname)

BABEL=./node_modules/.bin/babel
REMOTE="git@github.com:reactjs/react-modal"
DOCKER_NAME = vsts-mini
CURRENT_VERSION:=$(shell jq ".version" package.json)

.PHONY: explain
explain:
	### Welcome
	#
	#		  _______ _________ _______         _______ _________ _       _________
	#	|\     /|(  ____ \\__   __/(  ____ \       (       )\__   __/( (    /|\__   __/
	#	| )   ( || (    \/   ) (   | (    \/       | () () |   ) (   |  \  ( |   ) (   
	#	| |   | || (_____    | |   | (_____  _____ | || || |   | |   |   \ | |   | |   
	#	( (   ) )(_____  )   | |   (_____  )(_____)| |(_)| |   | |   | (\ \) |   | |   
	#	 \ \_/ /       ) |   | |         ) |       | |   | |   | |   | | \   |   | |   
	#	  \   /  /\____) |   | |   /\____) |       | )   ( |___) (___| )  \  |___) (___
	#	   \_/   \_______)   )_(   \_______)       |/     \|\_______/|/    )_)\_______/
	#	                                                                               
                                                        
	### Installation
	#
	# $$ make help
	#
	# If already installed - run the following to start the application 
	#
	# $$ make start 
	#
	#
help:
	@echo
	@echo "Current version: $(CURRENT_VERSION)"
	@echo
	@echo "List of commands:"
	@echo
	@echo "  make info             - display node, npm and yarn versions... if not pls install the packages"
	@echo "  make install          - install npm"
	@echo "  make start            - start the serve/application."
	@echo "  make clean            - remove node modules"
	@echo "  "

info:
	@echo node version: `$(NODE) --version` "($(NODE))"
	@echo npm version: `$(NPM) --version` "($(NPM))"
	@echo yarn version: `$(YARN) --version` "($(YARN))"
	@echo jq version: `$(JQ) --version` "($(JQ))"

start:
	@npm start

.PHONY: clean
clean:
	rm -fr node_modules

.PHONY: install
install:
# Install npm
	npm install
# Install jq
ifeq ($(OS),Darwin)
	# Run MacOS commands
	brew install jq
else
	@echo "Currently we only support MacOS commands - Please install JQ."
endif