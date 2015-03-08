# gulp-ftp [![Build Status](https://travis-ci.org/sindresorhus/gulp-ftp.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-ftp)

> Upload files to an FTP-server

Useful for uploading and deploying things.


## Install

```
$ npm install --save-dev gulp-ftp
```


## Usage

```js
var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('gulp-ftp');

gulp.task('default', function () {
	return gulp.src('src/*')
		.pipe(ftp({
			host: 'website.com',
			user: 'johndoe',
			pass: '1234'
		}))
		// you need to have some kind of stream after gulp-ftp to make sure it's flushed
		// this can be a gulp plugin, gulp.dest, or any kind of stream
		// here we use a passthrough stream
		.pipe(gutil.noop());
});
```


## API

### ftp(options)

#### options.host

*Required*  
Type: `string`

#### options.port

Type: `number`  
Default: `21`

#### options.user

Type: `string`  
Default: `'anonymous'`

#### options.pass

Type: `string`  
Default: `'@anonymous'`

#### options.remotePath

Type: `string`  
Default: `'/'`

The remote path to upload into.

#### options.verbose

Type: `boolean`  
Default: `false`

Display upload progress. You can also use **--verbose** argument:
 `$ gulp upload --verbose`



Nonexistent directories will be created for you.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
