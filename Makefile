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
	### Targets
	#
	@cat Makefile* | grep -E '^[a-zA-Z_-]+:.*?## .*$$' | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
help: ## help to set up the project
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

info: ## Show if node, npm, yarn, js is installed 
	@echo node version: `$(NODE) --version` "($(NODE))"
	@echo npm version: `$(NPM) --version` "($(NPM))"
	@echo yarn version: `$(YARN) --version` "($(YARN))"
	@echo jq version: `$(JQ) --version` "($(JQ))"

start: ## to start the application 
	@npm start

.PHONY: clean
clean: ## Clean the local filesystem
	rm -fr node_modules

.PHONY: install
install: ## Install the application
# Install npm
	npm install
# Install Flask web application framework
	pip install -U Flask
# Install jq
ifeq ($(OS),Darwin)
	# Run MacOS commands
	brew install jq
else
	@echo "Currently we only support MacOS commands - Please install JQ."
endif

db-start: ## To start the postgresql application
	brew services start postgresql

clean-pg: ## To clean the postgres sql setup
	@echo
	@echo "Cleaning Postgres Setup files."
	@echo
	brew uninstall --force postgis
	brew uninstall --force postgresql
	rm -rf /usr/local/var/postgres
	@echo "Done.!"
	@echo

install-pg: clean-pg
	@echo
	@echo "Installing Postgres!!"
	@echo
	brew install postgres
	ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
	launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist

wait%:
	@echo
	@echo "A wait script was planted to overcome user creation errors.!"
	@echo "(\_/)"
	@echo "(o.o)"
	@echo "(___)0"
	sh wait.sh $*

setup-pg: install-pg wait60 ## To install postgres
	echo "DONE! Waiting!!"
	@echo
	echo "Creating User..."
	@echo
	createuser -s postgres  && echo "Success! - User 'postgres' created!" || echo "failure! - Cannot able to create 'postgres' user."
	createdb vsts_mini  && echo "success! - Database user! " || echo "failure! - Database Not created"
	echo "Importing Sample data..."
	@echo
	psql vsts_mini < python/seed_data/teams.sql
	psql vsts_mini < python/seed_data/iterations.sql
	psql vsts_mini < python/seed_data/boards.sql
	psql vsts_mini < python/seed_data/workitems.sql
	echo "DONE!"
	psql -U postgres

start-api: ## To start the application
	FLASK_APP=python/main.py flask run

kill-flask:## To Kill Flask
	@echo
	@echo "_HOW To KILL_"
	@echo "Run 'ps -fA | grep python' "
	@echo "Find Python Flask run command"
	@echo "kill  PROCESSID"

fetch-data: ## Fetch Details from ADO
	cd python && python3 fetchTeams.py
	cd python && python3 fetchIterations.py
	cd python && python3 fetchBoards.py

update-data-once-per-day: ## Fetch Details from ADO daily for Burn Down report
	cd python && python3 fetchWorkItems.py