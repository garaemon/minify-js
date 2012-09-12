#!/usr/bin/env node
// minify.js

var fs = require("fs");
var exec = require('child_process').exec;
function lessProc(param) {
    
    exec("lessc " + param.input_files.join(" ") + " > " + param.output_file, function(err, stdout) {
        if (err != null) {
            console.log(param.input_files + " => " + param.output_file);
            console.log("failed to compile less: " + err.message);
        }
        else {
            console.log("done! " + param.input_files + " => " + param.output_file);
        }
    });
    exec("lessc --compress " + param.input_files.join(" ") + " > " + param.output_min_file,
         function(err, stdout) {
             if (err != null) {
                 console.log(param.input_files + " => " + param.output_min_file);
                 console.log("failed to compile less: " + err.message);
             }
             else {
                 console.log("done! " + param.input_files + " => " + param.output_min_file);
             }
         });
};

function jsProc(closure_compiler, param) {
    console.log(param.input_files + " => " + param.output_file);
    exec("java -jar " + closure_compiler
         + " --js " + param.input_files.join(" --js ")
         + " --js_output_file " + param.output_file, {
             maxBuffer: 1024*1024
         }, function(err, stdout) {
             if (err != null) {
                 console.log(param.input_files + " => " + param.output_file);
                 console.log("failed to compile js: " + err.message);
             }
             else {
                 console.log("done! " + param.input_files + " => " + param.output_file);
             }
         });
};

var json_file = process.argv[2];
var json_file_content = String(fs.readFileSync(json_file));
var parameters = JSON.parse(json_file_content);

parameters.less.forEach(function(less_param) {
    lessProc(less_param);
});

if (parameters.closure_compiler) {
    parameters.javascript.forEach(function(js_param) {
        jsProc(parameters.closure_compiler, js_param);
    });
}
