Module for running hubot instance and keeping it alive

## 1. Installation

To install the most recent release from npm, run:

    npm install hubot-runner -g

## 2. Usage

### Args
    -d, --dev             (optional) Dont respawn process if exists (in case we are in dev mode)
    -i, --install         (optional) Run npm install before launching hubot
    -h, --hdir <ARG1>     (optional) Hubot working directory , if not specified will be taken from current dir

Once you have installed the module globaly you will have 2 optional commands for running the module:

 * hubot-runner [arguments]

Or

 * hr [arguments]

## 3. Testing

To run tests, use the following command from module's root:

````
npm test
````