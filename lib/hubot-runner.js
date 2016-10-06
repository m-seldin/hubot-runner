//
// Copyright 2016 Michael Seldin
//     Licensed under the Apache License, Version 2.0 (the "License");
//     you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
//     Unless required by applicable law or agreed to in writing,
//     Software distributed under the License is distributed on an "AS IS" BASIS,
//     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and limitations under the License.
//
//  Author:
//  Michael Seldin

'use strict';

const Helpers = require('./helpers.js');
const os = require('os')
const spawn = require('child_process').spawn;

function HubotRunner(hubotDir,ops,envVarsConfig) {
    this.hubotDir = hubotDir;
    this.hubotDir =  hubotDir;
    this.hubotExec = Path.join(this.hubotDir,'node_modules','.bin','hubot');
    this.ops = ops;
    this.envVarsConfig = envVarsConfig;

    try {
        let envVars = JSON.parse(fs.readFileSync(this.envVarsConfig, 'utf8'));
        joinLocalWithGlobalEnvVars(envVars);
    }catch (e){
        logger.error(`Could not read envVars.json : ${e}`);
    }

}

HubotRunner.prototype.runHubot = function(){
    const thiz = this;
    if(this.ops.install) {
        logger.info(`Executing npm install`);
        sync('npm', ['install'], {stdio: [0, 1, 2]});
        logger.debug(`Finished npm install`);
    }

    logger.info(`Spawning hubot process...`);

    let bin,args;
    if(os.type()=="Windows_NT") {
        //kick off process
        bin = "cmd.exe";
        args = ['/c',`${this.hubotExec}.cmd`];
    }else{
        bin=this.hubotExec;
        args=[];
    }
    if(this.ops.name)
        args.push('--name',ops.name);

    args.push('--adapter','slack');


    logger.debug(`Bin : ${bin}`);
    logger.debug(`Args : ${args}`);

    const child = spawn(bin, args, {env: process.env,cwd:this.hubotDir});

    //spit stdout to screen
    child.stdout.on('data', function (data) {
        //var dataStr = data.toString();
        process.stdout.write(data);
    });

    //spit stderr to screen
    child.stderr.on('data', function (data) {
            process.stdout.write(data.toString());
        }
    );

    child.on('error', function (code) {
        console.log("Hubot exited with code " + code);
    });

    child.on('exit', function (code) {
        console.log("Hubot exited with code " + code);
        if(thiz.dev!=true){
            thiz.runHubot();
        }
    });
};

//------------------Local Functions------------------------------



function joinLocalWithGlobalEnvVars(localVars){
    Object.keys(localVars).forEach(function(key) {
        let val = localVars[key];

        process.env[key]=val;
    });

}


module.exports = HubotRunner;