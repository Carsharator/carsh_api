'use strict';
var gulp = require('gulp'),

    browserify = require('browserify'),
    connect = require('gulp-connect'),
    GulpSSH = require('gulp-ssh');

var config = {
    host: '46.101.141.101',
    port: 22,
    username: 'user',
    password: 'qweqwe'
};

var gulp_ssh = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
});

gulp.task('deploy', function () {
    return gulp_ssh
        .shell(['cd /home/user/carsh_api', 'git pull --rebase', 'npm install'], {filePath: 'shell.log'})
        .pipe(gulp.dest('logs'))
});

