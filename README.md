## VSTS  MINI 

A Count down timer screen to show the next release from Visual Studio Team Service Plan
- This will fetch plan details from VSTS plan and pick the next release based on the markers and run a count down for the release.

# **How to Run / Install**
- Run `make` will help you to see the list of commands to get started.

# **Installation via Docker**

Use the docker hub image

`docker pull parithiban/vsts-mini:2018.08.01`

After the image is built or downloaded run

`docker run -p 49160:3000 parithiban/vsts-mini:2018.08.01`

Then navigate to  http://localhost:49160/


# Setting up config

Following need to be updated in `src/config.sample.js` :

- VSTS_TOKEN
- ACCOUNT_NAME
- PROJECT
- PLAN_ID

Ref: https://docs.microsoft.com/en-us/rest/api/vsts/work/plans/list?view=vsts-rest-4.1

Then rename the file to `config.js`

**Count Down**

![Full screen](plan-countdown.png)