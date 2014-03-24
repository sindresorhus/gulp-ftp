# [gulp](https://github.com/wearefractal/gulp)-ftp [![Build Status](https://secure.travis-ci.org/sindresorhus/gulp-ftp.png?branch=master)](http://travis-ci.org/sindresorhus/gulp-ftp)

> Upload files to an FTP-server

Useful for uploading and deploying things.


## Install

Install with [npm](https://npmjs.org/package/gulp-ftp)

```
npm install --save-dev gulp-ftp
```


## Example

```js
var gulp = require('gulp');
var ftp = require('gulp-ftp');

gulp.task('default', function () {
	gulp.src('src/*')
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
Type: `String`

#### options.port

Type: `Number`  
Default: `21`

#### options.user

Type: `String`  
Default: `'anonymous'`

#### options.pass

Type: `String`  
Default: `'@anonymous'`

#### options.remotePath

Type: `String`  
Default: `'/'`

The remote path to upload too.

Doesn't have to exist as [jsftp-mkdirp](https://github.com/sindresorhus/jsftp-mkdirp) is used.

#### options.log

Type: `Boolean`
Default: `false`

Logs files uploaded to console


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
