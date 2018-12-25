.PHONY: clean system-packages python-packages install run all

clean:
	find . -type f -name '*.pyc' -delete
	find . -type f -name '*.log' -delete

system-packages:
	brew install python
	pip install virtualenv
	virtualenv -p python3 venv
	# python3 -m venv env
	source venv/bin/activate

python-packages:
	pip install -r requirements.txt
export-token:
	openssl rand -hex 24
export-var:
	@echo export EC2_HOME=/home/me/
install: system-packages python-packages

run:
	python manage.py run

all: clean install run
