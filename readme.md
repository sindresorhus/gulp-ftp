# [gulp](http://gulpjs.com)-ftp [![Build Status](https://travis-ci.org/sindresorhus/gulp-ftp.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-ftp)

> Upload files to an FTP-server

Useful for uploading and deploying things.


## Install

```sh
$ npm install --save-dev gulp-ftp
```


## Usage

```js
var gulp = require('gulp');
var ftp = require('gulp-ftp');

gulp.task('default', function () {
	return gulp.src('src/*')
		.pipe(ftp({
			host: 'website.com',
			user: 'johndoe',
			pass: '1234'
		}));
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

The remote path to upload too.

Doesn't have to exist as [jsftp-mkdirp](https://github.com/sindresorhus/jsftp-mkdirp) is used.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
