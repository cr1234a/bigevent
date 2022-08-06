window.addEventListener('DOMContentLoaded', function () {
    let login_login = document.querySelector('.login_login')
    let login_register = document.querySelector('.login_register')
    let login_box = document.querySelector('.login_box')
    let register_box = document.querySelector('.register_box')
    let login_form = document.querySelector('.login_form')
    // 去登录与去注册的转换
    login_login.addEventListener('click', function () {
        login_box.style.display = 'none';
        register_box.style.display = 'block'
        login_form.style.height = '300px'
    })
    login_register.addEventListener('click', function () {
        register_box.style.display = 'none';
        login_box.style.display = 'block'
        login_form.style.height = '250px'
    })
    // 表单验证
    let form = layui.form
    form.verify({
        // 密码框
        password: [/^[\S]{6,12}$/,
            '密码必须6到12位,且不能出现空格'],
        // 再次输入密码框
        repassword: function (value) {
            if (value !== register_box.querySelector('.login_password').value) {
                return "两次输入的密码不一致"
            }
        }
    })
    // 注册请求
    let layer = layui.layer;
    $('.register_box ').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: {
                username: $('.register_box .login_username').val(),
                password: $('.register_box .login_password').val(),
            },
            success: function (res) {
                if (res.status === 0) {
                    layer.msg('注册成功');
                    setTimeout(function () {
                        login_register.click()
                    }, 1000)
                } else {
                    layer.msg(res.message)
                }
            }
        })
    })
    // 登录请求 
    $('.login_box').on('submit', function (e) {
        e.preventDefault()
        let fd = $('.login_box').serialize()
        $.ajax({
            method: 'post',
            url: "/api/login",
            data: fd,
            success: function (res) {
                if (res.status == 1) {
                    return layer.msg('登录失败');
                }
                localStorage.setItem('token', res.token)
                layer.msg('登录成功');
                setTimeout(function () {
                    location.href = '/index.html'
                }, 1000)

            }
        })
    })
})