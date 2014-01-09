'use strict';
var path = require('path');
var es = require('event-stream');
var gutil = require('gulp-util');
var JSFtp = require('jsftp');

JSFtp = require('jsftp-mkdirp')(JSFtp);

module.exports = function (options) {
	if (options.host === undefined) {
		throw new Error('`host` required.');
	}

	var fileCount = 0;
	var remotePath = options.remotePath || '';
	delete options.remotePath;

	var stream = es.map(function (file, cb) {
		// have to create a new connection for each file otherwise they conflict
		var ftp = new JSFtp(options);
		console.log(file.path);
		var relativePath = file.path.replace(file.cwd + '/', '');
		var finalRemotePath = path.join('/', remotePath, relativePath);

		ftp.keepAlive();
		ftp.mkdirp(path.dirname(finalRemotePath), function (err) {
			if (err) {
				return cb(err);
			}

			console.log('after mkdirp');
			ftp.keepAlive();
			ftp.put(file.contents, finalRemotePath, function (err) {
				if (err) {
					return cb(err);
				}

				console.log('after put');
				fileCount++;
				ftp.raw.quit();
				cb(null, file);
			});
		});
	});

	stream.on('end', function () {
		if (fileCount > 0) {
			gutil.log('gulp-ftp:', gutil.colors.green(fileCount, fileCount === 1 ? 'file' : 'files', 'uploaded successfully'));
		} else {
			gutil.log('gulp-ftp:', gutil.colors.yellow('No files uploaded'));
		}
	});

	return stream;
};
