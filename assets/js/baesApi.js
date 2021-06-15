//每次调用ajax都会先调用ajaxPrefilter
$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url);
})