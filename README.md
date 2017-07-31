<div align="center">
  <a href="https://github.com/woolson/oimg.git">
    <img width="200" height="190"
      src="./icon.png">
  </a>
  <h1 align="center">oimg</h1>
</div>

Optimize image[png, jpg, jpeg, svg, gif] command line tool.

<h2 align="center">TODO List</h2>

> overflow 8

- optimize workflow.

<h2 align="center">Install</h2>

install with `npm`

```bash
sudo npm install -g oimg
```

<h2 align="center">Usage</h2>

### options

- #### list all images, run:

```bash
$ oimg list
# ignore some image file with command --ignore
$ oimg list -i file file file
# use -p option to specific folder path, absolute or relative
$ oimg list -p ../images
```

- #### compress images, run:

```bash
$ oimg compress
# ignore some image file with command --ignore
$ oimg compress -i file file file
# use -q option to specific compress quality
$ oimg compress -q [1-10]
```

- #### use compress images replace origin images, run:

```bash
$ oimg replace
# ignore some image file with command --ignore
# ignore file name is origin file name
$ oimg replace -i file file file
```

- #### remove generated files if result is not ideal.

```bash
$ oimg remove
```

<h2 align="center">Dependencies</h2>

- [imagemin](https://github.com/imagemin/imagemin)
- [imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant)
- [imagemin-svgo](https://github.com/imagemin/imagemin-svgo)
- [imagemin-gifsicle](https://github.com/imagemin/imagemin-gifsicle)
- [imagemin-svgo](https://github.com/imagemin/imagemin-svgo)
- [imagemin-jpegtran](https://github.com/imagemin/imagemin-jpegtran)
- [columnify](https://github.com/timoxley/columnify)
- [colors](https://github.com/Marak/colors.js)
