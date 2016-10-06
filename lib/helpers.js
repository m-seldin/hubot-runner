'use strict';
const fs = require('fs'),
    path = require('path'),
    log4js = require('log4js');

global.logger = log4js.getLogger();
global.fs = fs;
global.Path = path;
