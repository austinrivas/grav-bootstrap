var mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setPublicPath('dist')
    .js('js/app.js', 'js/app.js')
    .sass('sass/app.sass', 'css/app.css')
    .options({
        processCssUrls: false
    })
    .version();

if (!mix.inProduction()) {
    mix.webpackConfig({devtool: 'inline-source-map'})
        .browserSync({
            proxy: 'localhost',
            port: 8000,
            files: [
                'dist/css/{*,**/*}.css',
                'dist/js/{*,**/*}.js',
                'templates/{*,**/*}.html.twig'
            ]
        });
}
