window.addEventListener('load', function () {
    // 用options接受每一次的ajax请求
    $.ajaxPrefilter(function (options) {
        options.url = "http://www.liulongbin.top:3007" + options.url
        // 阻止跳转
        options.complete = function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message == "身份认证失败！") {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
    })
})
