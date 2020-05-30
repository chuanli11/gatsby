# Lambda Notes

https://stoic-lumiere-2ece59.netlify.app/


## Step Up (Ubuntu)

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

Notice all the files that need for serving the webpage are inside `gatsby/www/public`. You can simply upload this folder to `netlify` for a public test. Here is an example: https://stoic-lumiere-2ece59.netlify.app/


## Build for Lambda


The idea is to host the benchmark pages under `https://lambdalabs.com/deep-learning/test`. To do so we need build the gatsby site with the `--prefix-paths` option, which prefixes `deep-learning/test` to all the URLs.

```
# Comment https://github.com/lambdal/gatsby/blob/master/www/src/components/page-with-sidebar.js#L17
# Uncomment https://github.com/lambdal/gatsby/blob/master/www/src/components/page-with-sidebar.js#L14
# Otherwise sidebar cannot display properly for models pages

# Make sure http://127.0.0.1:8000/deep-learning/test/ are prefixed to all article links in 
# https://github.com/lambdal/gatsby/blob/master/docs_new/models/index.md
# Otherwise model articles cannot display properly

# Make sure this line is uncommented: https://github.com/lambdal/gatsby/blob/master/www/gatsby-config.js#L82
# Make sure these lines are uncommented: https://github.com/lambdal/gatsby/blob/master/www/gatsby-config.js#L382 - #387

cd gatsby/www
npm install

# Production build has to use prefixed-paths
gatsby build --prefix-paths

# This will generate Error: "Cannot copy 'public/static' to a subdirectory of itself, 'public/static/gatsby/deep-learning/test/static'.", which is expected. It does not affect hosted on Lambda.
```

All the files that need for serving the webpage on the Lambda e-commerce website are in the `gatsby/www/public` folder. See the [Host on Lambda](#host-on-lambda) section for deployment details.


## Host on Lambda

__Setup Lambda E-commerce website on a local machine__

Follow the steps [here](https://github.com/lambdal/rem/tree/master/lambdal). The `git clone git@github.com:1/docdoc.git` line may not work, use `git clone https://github.com/lambdal/docdoc.git` instead.


__Add Paths to the benchmark page__

Insert the following lines [here](https://github.com/lambdal/rem/blob/master/lambdal/svr/urls.py#L43). Add each page manually to is not ideal. But works for now.

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

__Copy Benchmark Pages__

Create a folder called `test` under `rem/lambdal/client/templates`. Copy these folders files from the `gatsby/www/public`  folder into it:

* gatsby/www/public/index.html
* gatsby/www/public/404.html
* gatsby/www/public/benchmarks
* gatsby/www/public/gpus
* gatsby/www/public/models


Create a folder `rem/lambdal/client/gatsby/deep-learning/test` , and copy the following folders and files into it

* gatsby/www/public/static
* gatsby/www/public/page-data
* gatsby/www/public/*.js


__Test__

```
# Run this inside of rem-venv
cd rem/lambdal
python manage.py runserver
```

Go to `http://127.0.0.1:8000/deep-learning/test` to see the benchmark website

__Known Issues__

- [x] <s>Images and CSS are not configured correctly for Lambda</s> Solved by copying static files to folder `rem/lambdal/client/gatsby/deep-learning/test`
- [ ] Style of GPU pages is not correctly rendered

* if you restart the server and paste the url to the browser, that gives you the right image (bad one)
* if you restart the server and go to that page by click a link from another page (like the sidebar), that gives you the left image (good one)
* if you do ctrl + R on the left image, it also messes up

There is a file named `app-2a817d051f9fb81cf239.js` seems to be some cached file. It is referenced in a file named `sw.js`, which is related to [offline rendering](https://www.gatsbyjs.org/packages/gatsby-plugin-sw/). If you `app-2a817d051f9fb81cf239.js` then the GPU page always look bad. It is also the biggest .js file (1.4MB) 

- [ ] The `static/gatsby/deep-learning/test/static` path is too long and causing error in gatsby build ("Cannot copy 'public/static' to a subdirectory of itself, 'public/static/gatsby/deep-learning/test/static'."). But it seems not affecting deployment to `lambdalabs.com`

The syntax for the above path is: `assert prefix` + `path prefix` + `static`.

* `static/gatsby`: the `asset prefix`, configured by `gatsby-plugin-asset-path`. The `static` here is the [default place](https://github.com/lambdal/rem/blob/master/lambdal/svr/settings.py#L111) to host static files on lambda e-commerce. We add the `gatsby` slug to isolate the benchmark center from the rest of the e-commerce. 
* `deep-learning/test`: the `path prefix`, can be anything. It is currently set to render the pages under `lambdalabs.com/deep-learning/test`
* `static`: auto-generated by gatsby. I have yet found a way to remove it.

- [ ] Hacky workaround for sidebar in `gatsby/www/src/components/page-with-sidebar.js`. 
- [ ] Hacky paths for `models` articles in `docs_new/models/index.md`
- [ ] Manually add `re_path` in `lambdal/svr/urls.py`. Should use better regex. 

