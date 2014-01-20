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
  var localPath = options.localPath || '';
  var logFiles = options.logFiles === false ? false : true;

	delete options.remotePath;
  delete options.localPath;
  delete options.logFiles;

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-ftp', 'Streaming not supported'));
			return cb();
		}

		// have to create a new connection for each file otherwise they conflict
		var ftp = new JSFtp(options);
		var relativePath = file.path.replace(file.cwd + '/', '');
    var localRelativePath = file.path.replace(path.join(file.cwd, localPath), '');
		var finalRemotePath = path.join('/', remotePath, localRelativePath);

		ftp.mkdirp(path.dirname(finalRemotePath), function (err) {
			if (err) {
				this.emit('error', new gutil.PluginError('gulp-ftp', err));
				return cb();
			}

			ftp.put(file.contents, finalRemotePath, function (err) {
				if (err) {
					this.emit('error', new gutil.PluginError('gulp-ftp', err));
					return cb();
				}

        if (logFiles) {
          gutil.log('gulp-ftp:', gutil.colors.green('Uploaded: ') + 
                                 relativePath +
                                 gutil.colors.green(' => ') + 
                                 finalRemotePath);
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
