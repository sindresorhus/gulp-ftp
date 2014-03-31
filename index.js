'use strict';
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var JSFtp = require('jsftp');

JSFtp = require('jsftp-mkdirp')(JSFtp);

module.exports = function (options) {
	if (options.host === undefined) {
		throw new gutil.PluginError('gulp-ftp', '`host` required.');
	}

	var fileCount = 0;
	var remotePath = options.remotePath || '';

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-ftp', 'Streaming not supported'));
			return cb();
		}

		var self = this;

		// have to create a new connection for each file otherwise they conflict
		var ftp = new JSFtp({
			host: options.host,
			port: options.port,
			user: options.user,
			pass: options.pass
		});

		var finalRemotePath = path.join('/', remotePath, file.relative).replace(/\\/g, '/');

		ftp.mkdirp(path.dirname(finalRemotePath).replace(/\\/g, '/'), function (err) {
			if (err) {
				self.emit('error', new gutil.PluginError('gulp-ftp', err));
				return cb();
			}

			ftp.put(file.contents, finalRemotePath, function (err) {
				if (err) {
					self.emit('error', new gutil.PluginError('gulp-ftp', err));
					return cb();
				}

				fileCount++;
				ftp.raw.quit();
				cb();
			});
		});

		this.push(file);
	}, function (cb) {
		if (fileCount > 0) {
			gutil.log('gulp-ftp:', gutil.colors.green(fileCount, fileCount === 1 ? 'file' : 'files', 'uploaded successfully'));
		} else {
			gutil.log('gulp-ftp:', gutil.colors.yellow('No files uploaded'));
		}

		cb();
	});
};
