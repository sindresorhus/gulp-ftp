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

#### options.localPath

Type: `String`
Default `'.'`

The local path to upload from.
This is useful for example when you use

```javascript
gulp.src('_public/js/*').pipe({remotePath: '/www/some/path'});
```

And you want the contents of `_public/js` to be uploaded to 
`/www/some/path`, but not `_public/js` itself. Then you just set
`localPath` to `_public/js` and you are done.

#### options.logFiles

Type: `Boolean`
Default: `true`

Logging of files as they are uploaded. If set to false, you will only see a message when all files finished.

## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
