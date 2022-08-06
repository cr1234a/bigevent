window.addEventListener('load', function () {
    // 用options接受每一次的ajax请求
    $.ajaxPrefilter(function (options) {
        options.url = "http://www.liulongbin.top:3007" + options.url
    })
})
