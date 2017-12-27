# Crowd Up

This application uses the Grav flat-file cms to serve a static web application via a nginx-php-grav docker image.

The scope of the application is to serve as a viable CMS for pages, blog posts, custom post types, and media assets while providing
the ability to version control content/configuration changes.

## [Local](http://localhost) | [Admin](http://localhost/admin)

TODO: Describe local environment snowflakes

# Build App

Note: All paths are relative to the project root.

- [Install Docker Compose](https://docs.docker.com/compose/install/)

- [Install yarn](https://yarnpkg.com/lang/en/docs/install/)

- `git clone https://github.com/austinrivas/grav-bootstrap.git grav-bootstrap`

- `cd grav-bootstrap`

- `docker-compose up -d`

- `docker-compose exec nginx-php-grav php bin/grav install`

- `docker-compose exec nginx-php-grav php bin/gpm install admin` (only initial install)

- `docker-compose exec nginx-php-grav php bin/gpm install haywire` (only initial install)

- `cd grav/user/themes/haywire`

- `yarn && yarn run production`

- or `yarn && yarn run dev`

- or `yarn && yarn run watch`

## Known Issues

If after you run `docker-compose up` you seen an error like:

```bash
Starting grav-bootstrap ... 
Starting grav-bootstrap ... error

ERROR: for grav-bootstrap  Cannot start service nginx-php-grav: driver failed programming external connectivity on endpoint grav-bootstrap (ce07c3b7c8c4c93c90370e8e0843f79e2fdbf892681374382b9b08317d0a057d): Error starting userland proxy: Bind for 0.0.0.0:80: unexpected error (Failure EADDRINUSE)

ERROR: for nginx-php-grav  Cannot start service nginx-php-grav: driver failed programming external connectivity on endpoint grav-bootstrap (ce07c3b7c8c4c93c90370e8e0843f79e2fdbf892681374382b9b08317d0a057d): Error starting userland proxy: Bind for 0.0.0.0:80: unexpected error (Failure EADDRINUSE)
ERROR: Encountered errors while bringing up the project.
```

Then you need to stop whatever service is running on port `80`.

If you visit http://localhost and see a message that reads "It Works!", then it is Apache that is tying up port 80.

Stop Apache by running `sudo apachectl stop` or `sudo apachectl -k stop` and rerun `docker-compose up`.

TODO: Bind container to a static ip locally and use a hosts declaration to avoid this issue in the future.

# Front End

This front-end theme located in [grav/user/themes/haywire](grav/user/themes/haywire)

You can view which theme is currently active in [grav/user/config/system.yaml](grav/user/config/system.yaml)

```aidl
pages:
  theme: haywire
```

If the active theme is changed be sure to update the symlink.

## Theme | [README](grav/user/themes/haywire/README.md) | [Github](https://github.com/robbinfellow/haywire-grav)

Its key features are : 

- Laravel Mix (webpack asset pipeline wrapped in Laravel) | [Github](https://github.com/JeffreyWay/laravel-mix)

- Bulma SASS Framework | [Github](https://github.com/jgthms/bulma) | [Docs](https://bulma.io/documentation/overview/start/)

- VueJS Framework | [Github](https://github.com/vuejs/vue) | [Docs](https://vuejs.org/v2/guide/)

### Build Commands

- Production Build : `cd grav/user/themes/haywire && yarn run production`
- Development Build : `cd grav/user/themes/haywire && yarn run dev`
- Watch Local Files : `cd grav/user/themes/haywire && yarn run watch`

# Grav | [README](grav/README.md) | [DOCS](https://learn.getgrav.org/)

If you are using the admin plugin, you can simply Update Grav itself from the notice. 

You can click the Update button to update plugins and themes. If you don't see any updates, you can clear the GPM cache by clicking the Check for Updates button in the top-right.

Updating is now a simple affair. Simply navigate to the root of the Grav install in your terminal and type:

`$ bin/gpm selfupgrade -f`

This will upgrade the Grav core to the latest version. Additionally, you should update all your plugins and themes to the latest version (including the admin plugin if you have that installed).

You can do this using the command below:

`$ bin/gpm update -f`

## Content

All page content is stored in the `grav/user/pages` directory.

For additional information on the function and capabilities of the `pages` directory see the [Grav Content Docs](https://learn.getgrav.org/content).

## Plugins | [Registry](https://getgrav.org/downloads/plugins)

Grav provides a plugin system that is available by calling the `bin/gpm install pluginname` command.

Plugins are stored in the [grav/user/plugins](grav/user/plugins) directory.

Exercise caution when installing plugins and ensure that they have been tested prior to committing them to the application source.

### Grav Admin | [README](grav/user/plugins/admin/README.md) | [DOCS](https://learn.getgrav.org/admin-panel) | [Github](https://github.com/getgrav/grav-plugin-admin)

Grav Admin is a Grav official plugin found at [grav/user/plugins/admin](grav/user/plugins/admin).

It has hard dependencies on the `email`, `form`, and `login` plugins.

### Grav Login | [README](grav/user/plugins/login/README.md) | [Github](https://github.com/getgrav/grav-plugin-login)

Grav Login is a Grav plugin found at [grav/user/plugins/login](grav/user/plugins/login).

`login` plugin configuration can be found in [grav/user/config/plugins/login.yaml](grav/user/config/plugins/login.yaml) and is also manageable via the admin ui.

The admin portal url is defined in `login.yml` and is also available for management in the admin ui.

#### User Management

User management is done via the `bin/plugin login newuser` command and is described in further detail in the `login` plugin and this entry in the [Admin FAQ](https://learn.getgrav.org/admin-panel/faq#adding-and-managing-users).

All user accounts are versioned and stored a yaml file named after their username e.g. `grav/user/accounts/someadmin.yaml`.

### Grav Email | [README](grav/user/plugins/email/README.md) | [Github](https://github.com/getgrav/grav-plugin-email)

Grav Email is a Grav official plugin found at [grav/user/plugins/email](grav/user/plugins/email).

TODO: Configure and test email in docker context

### Grav Forms | [README](grav/user/plugins/form/README.md) | [Github](https://github.com/getgrav/grav-plugin-form)

Grav Form is a Grav official plugin found at [grav/user/plugins/form](grav/user/plugins/form).

TODO: Configure and test form in docker context

# Docker Image | [Source](https://github.com/austinrivas/nginx-php-grav) | [Docker Hub](https://hub.docker.com/r/austinrivas/nginx-php-grav/)

The `nginx-php-grav` docker image is used to serve this application.

TODO: evaluate nginx config for hardening

## Volumes

The `.ssh`, `grav`, and `nginx` directories are all mounted external volumes of the `nginx-php-grav` docker image.

+ [grav](grav) 
    
    **/usr/share/nginx/html/**

  Here you can find the Grav home folder where you can add and manage your content.

+ [nginx](nginx) 

    **/etc/nginx/**

  (Optional) Here you can tweak Nginx configuration and sites 

+ [.ssh](.ssh) 

    **/root/.ssh/**

  (Optional) Here you can put your **public** key so you can access container via SSH. After that, open a SSH connection to root@your_server:2222 specifying your **private** key.