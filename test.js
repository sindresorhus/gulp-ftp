'use strict';
var assert = require('assert');
var fs = require('fs');
var gutil = require('gulp-util');
var Server = require('ftp-test-server');
var ftp = require('./');
var mockServer;

before(function (done) {
	mockServer = new Server();

	mockServer.init({
		user: 'test',
		pass: 'test'
	});

	mockServer.on('stdout', process.stdout.write.bind(process.stdout));
	mockServer.on('stderr', process.stderr.write.bind(process.stderr));

	setTimeout(done, 500);
});

after(function () {
	mockServer.stop();
});

it('should upload files to FTP-server', function (cb) {
	var stream = ftp({
		host: 'localhost',
		port: 3334,
		user: 'test',
		pass: 'test'
	});

	setTimeout(function () {
		assert(fs.existsSync('fixture/fixture.txt'));
		assert(fs.existsSync('fixture/fixture2.txt'));
		fs.unlinkSync('fixture/fixture.txt');
		fs.unlinkSync('fixture/fixture2.txt');
		fs.rmdirSync('fixture');
		cb();
	}, 500);

	stream.write(new gutil.File({
		cwd: __dirname,
		base: __dirname,
		path: __dirname + '/fixture/fixture.txt',
		contents: new Buffer('unicorns')
	}));

	stream.write(new gutil.File({
		cwd: __dirname,
		base: __dirname,
		path: __dirname + '/fixture/fixture2.txt',
		contents: new Buffer('unicorns')
	}));
});
