<div align="center">
  <a href="https://github.com/woolson/oimg.git">
    <img width="200" height="190"
      src="./icon.png">
  </a>
  <h1 align="center">oimg</h1>
</div>

Optimize image[png, jpg, jpeg, svg, gif] command line tool.

<h2 align="center">TODO List</h2>
- command optiomize;

- command alias;

- config compress quality.

<h2 align="center">Install</h2>

install with `npm`

```bash
sudo npm install -g oimg
```

<h2 align="center">Usage</h2>

### options

- #### list all images in current folder, run:

```bash
$ oimg [-l|--path]
# ignore some image file with command --ignore
$ oimg -l --ignore file file file
```


- #### compress images, run:

```bash
$ oimg [-c|--compress]
# ignore some image file with command --ignore
$ oimg -c --ignore file file file
```

- #### use compress images replace origin images, run:

```bash
$ oimg [-r|--replace]
# ignore some image file with command --ignore
# ignore file name is origin file name
$ oimg -r --ignore file file file
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
