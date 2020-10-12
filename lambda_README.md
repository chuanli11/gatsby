# Lambda Notes

https://stoic-lumiere-2ece59.netlify.app/


<!-- ## Step Up (Ubuntu)

__Install Node.js and npm__ (Follow the steps [here](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/))

```
sudo apt install nodejs

$ node -v
v12.16.3

$ npm -v
6.14.4
```


__Install Gatsby__

```
npm install -g gatsby-cli

$ gatsby -v
Gatsby CLI version: 2.12.34
```

__Clone repo__


```
git clone https://github.com/lambdal/gatsby
```

__Create Environment Variables__

Create two ".env" files inside of `gatsby/www`. Add a couple of environment variables to the files.

`.env.development`: the environment file for `gatsby develop`

`.env.production`: the environment file for `gatsby build`

These are the environment variables:

```
GATSBY_SCREENSHOT_PLACEHOLDER=true
GITHUB_API_TOKEN=YOUR_TOKEN_HERE
```

[Here](https://github.com/gatsbyjs/gatsby/tree/master/www#working-with-the-starter-library) is the guide to create `GITHUB_API_TOKEN`, the Github personal access token. The `GATSBY_SCREENSHOT_PLACEHOLDER` variable makes the build a lot faster by skipping screenshot generation.


## Build and Test Locally

Follow the steps below and visit the page at `http://localhost:8000/` (develop) or `http://localhost:9000/` (build)

```
# Comment https://github.com/lambdal/gatsby/blob/master/www/src/components/page-with-sidebar.js#L14
# Uncomment https://github.com/lambdal/gatsby/blob/master/www/src/components/page-with-sidebar.js#L17
# Otherwise sidebar cannot display properly

# Remove prefix path "http://127.0.0.1:8000/deep-learning/test/" from all article links in 
# https://github.com/lambdal/gatsby/blob/master/docs_new/models/index.md
# Otherwise model articles cannot display properly

cd gatsby/www
npm install

# development build
gatsby clean
gatsby develop

# production build 
# Comment out https://github.com/lambdal/gatsby/blob/master/www/gatsby-config.js#L82
# Comment out https://github.com/lambdal/gatsby/blob/master/www/gatsby-config.js#L382 - #387
# Otherwise build will fail 
gatsby clean
gatsby build
gatsby serve
```

Notice all the files that need for serving the webpage are inside `gatsby/www/public`. You can simply upload this folder to `netlify` for a public test. Here is an example: https://stoic-lumiere-2ece59.netlify.app/ -->


## Host on Lambda

__Setup Lambda E-commerce website on a local machine__

Follow the steps [here](https://github.com/lambdal/rem/tree/master/lambdal). 


__Build Gatsby website__

```
# Install nodejs and gatsby
sudo apt install nodejs
npm install -g gatsby-cli

# Clone benchmark site repo (forked from https://github.com/gatsbyjs/gatsby)
git clone https://github.com/lambdal/gatsby

# Build the Gatsby site to be hosted under `https://lambdalabs.com/deep-learning/test`
cd gatsby/www
npm install
gatsby clean
gatsby build --prefix-paths
```

All the files that need for serving the webpage on the Lambda e-commerce website are in the `gatsby/www/public` folder. 

__Deploy to E-commerce (copy a bunch of files)__

```
PATH_PUBLIC=/home/ubuntu/gatsby/www/public
PATH_STATIC=/home/ubuntu/rem/lambdal/client/gatsby/deep-learning/test
PATH_TEMPLATE=/home/ubuntu/rem/lambdal/client/templates/test

rm -rf $PATH_STATIC && \
rm -rf $PATH_TEMPLATE && \
mkdir -p $PATH_STATIC && \
mkdir -p $PATH_TEMPLATE && \
cp -rf ${PATH_PUBLIC}/benchmarks ${PATH_TEMPLATE} && \
cp -rf ${PATH_PUBLIC}/gpus ${PATH_TEMPLATE} && \
cp -rf ${PATH_PUBLIC}/models ${PATH_TEMPLATE} && \
cp -rf ${PATH_PUBLIC}/static ${PATH_STATIC} && \
cp -rf ${PATH_PUBLIC}/page-data ${PATH_STATIC} && \
cp ${PATH_PUBLIC}/*.js ${PATH_STATIC} && \
cp ${PATH_PUBLIC}/*.js.* ${PATH_STATIC} && \
cp ${PATH_PUBLIC}/*.xml ${PATH_STATIC}
```

__Test__

```
# Run this inside of rem-venv
cd rem/lambdal
python manage.py runserver
```

* Go to `http://127.0.0.1:8000/deep-learning/test/benchmarks/` to see the benchmark page
* Go to `http://127.0.0.1:8000/deep-learning/test/gpus/` to see the gpu page
* Go to `http://127.0.0.1:8000/deep-learning/test/models/` to see the model page

__Known Issues__

- [x] <s>Images and CSS are not configured correctly for Lambda</s> Solved by copying static files to folder `rem/lambdal/client/gatsby/deep-learning/test`
- [x] <s>Style of GPU pages is not correctly rendered</s> This is a general problem for all material-ui items. Solved by adding `gatsby-plugin-material-ui` 
- [ ] The path for static files (`static/gatsby/deep-learning/test`) is a little bit tedious. 
* The syntax for the above path is: `assert prefix` (`static/gatsby`) + `path prefix` (`deep-learning/test`).
* `static/gatsby`: the `asset prefix`, configured by `gatsby-plugin-asset-path`. The `static` here is the [default place](https://github.com/lambdal/rem/blob/master/lambdal/svr/settings.py#L111) to host static files on lambda e-commerce. We add the `gatsby` slug to isolate the benchmark center from the rest of the e-commerce. 
* `deep-learning/test`: the `path prefix`, can be anything. It is currently set to render the pages under `lambdalabs.com/deep-learning/test`
- [ ] Hacky workaround for sidebar in `gatsby/www/src/components/page-with-sidebar.js`. 
- [ ] Hacky paths for `models` articles in `docs_new/models/index.md`
- [ ] Manually add `re_path` in `lambdal/svr/urls.py`. Should use regex. 
```
  # URLs for benchmarks
  re_path(r'^deep-learning/test/?$',
          TemplateView.as_view(template_name='test/index.html')),
  re_path(r'^deep-learning/test/benchmarks/?$',
          TemplateView.as_view(template_name='test/benchmarks/index.html')),
  re_path(r'^deep-learning/test/benchmarks/throughput/fp32/?$',
          TemplateView.as_view(template_name='test/benchmarks/throughput/fp32/index.html')),
  re_path(r'^deep-learning/test/benchmarks/throughput/fp16/?$',
          TemplateView.as_view(template_name='test/benchmarks/throughput/fp16/index.html')),
  re_path(r'^deep-learning/test/benchmarks/batchsize/fp32/?$',
          TemplateView.as_view(template_name='test/benchmarks/batchsize/fp32/index.html')),
  re_path(r'^deep-learning/test/benchmarks/batchsize/fp16/?$',
          TemplateView.as_view(template_name='test/benchmarks/batchsize/fp16/index.html')),                        
  re_path(r'^deep-learning/test/gpus/?$',
          TemplateView.as_view(template_name='test/gpus/index.html')),
  re_path(r'^deep-learning/test/gpus/v100/?$',
          TemplateView.as_view(template_name='test/gpus/v100/index.html')),
  re_path(r'^deep-learning/test/gpus/quadrortx8000/?$',
          TemplateView.as_view(template_name='test/gpus/quadrortx8000/index.html')), 
  re_path(r'^deep-learning/test/gpus/quadrortx6000/?$',
          TemplateView.as_view(template_name='test/gpus/quadrortx6000/index.html')),
  re_path(r'^deep-learning/test/gpus/quadrortx5000/?$',
          TemplateView.as_view(template_name='test/gpus/quadrortx5000/index.html')),
  re_path(r'^deep-learning/test/gpus/titanrtx/?$',
          TemplateView.as_view(template_name='test/gpus/titanrtx/index.html')),
  re_path(r'^deep-learning/test/gpus/2080ti/?$',
          TemplateView.as_view(template_name='test/gpus/2080ti/index.html')),
  re_path(r'^deep-learning/test/gpus/1080ti/?$',
          TemplateView.as_view(template_name='test/gpus/1080ti/index.html')),                                                                                         
  re_path(r'^deep-learning/test/models/?$',
          TemplateView.as_view(template_name='test/models/index.html')),
  re_path(r'^deep-learning/test/models/resnet/?$',
          TemplateView.as_view(template_name='test/models/resnet/index.html')),
  re_path(r'^deep-learning/test/models/ssd/?$',
          TemplateView.as_view(template_name='test/models/ssd/index.html')),  
  re_path(r'^deep-learning/test/models/maskrcnn/?$',
          TemplateView.as_view(template_name='test/models/maskrcnn/index.html')),  
  re_path(r'^deep-learning/test/models/bert/?$',
          TemplateView.as_view(template_name='test/models/bert/index.html')),  
  re_path(r'^deep-learning/test/models/transformerxl/?$',
          TemplateView.as_view(template_name='test/models/transformerxl/index.html')),
  re_path(r'^deep-learning/test/models/gnmt/?$',
          TemplateView.as_view(template_name='test/models/gnmt/index.html')),
  re_path(r'^deep-learning/test/models/tacotron/?$',
          TemplateView.as_view(template_name='test/models/tacotron/index.html')),
  re_path(r'^deep-learning/test/models/waveglow/?$',
          TemplateView.as_view(template_name='test/models/waveglow/index.html')),
  re_path(r'^deep-learning/test/models/ncf/?$',
          TemplateView.as_view(template_name='test/models/ncf/index.html')), 
```
