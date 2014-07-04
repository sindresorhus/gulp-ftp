'use strict';
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var assign = require('object-assign');
var JSFtp = require('jsftp');
var chalk = require('chalk');

JSFtp = require('jsftp-mkdirp')(JSFtp);

module.exports = function (options) {
	options = assign({}, options);
	options.verbose = process.argv.indexOf('--verbose') !== -1;

	if (options.host === undefined) {
		throw new gutil.PluginError('gulp-ftp', '`host` required.');
	}

	var fileCount = 0;
	var remotePath = options.remotePath || '';
	delete options.remotePath;

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
		var ftp = new JSFtp(options);

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

		if (options.verbose) {
			gutil.log('gulp-ftp:', chalk.green('✔ ') + file.relative);
		}

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
