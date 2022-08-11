window.addEventListener('click', function () {
    // 重置按钮
    $('.reset').on('click', function () {
        $('.layui-input').val('')
    })
    // 表单验证规则
    let form = layui.form
    form.verify({
        // 新密码验证
        newPwd: [/^[\S]{6,12}$/,
            '密码必须6到12位,且不能出现空格'],
        // 两次输入密码一致性验证
        repassword: function (value) {
            if (value !== $('.newPwd').val()) {
                return '两次输入的密码不一致'
            }
        },
        // 新旧密码不能一致
        check: function (value) {
            if (value === $('.use-name').val()) {
                return '新旧密码一致'
            }
        }
    })
    // 重置密码
    document.querySelector('.layui-form').addEventListener('submit', function (e) {
        // 阻止提交的默认行为
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: {
                oldPwd: $('.use-name').val(),
                newPwd: $('.newPwd').val()
            },
            // 防止多次请求
            async: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改密码失败')
                }
                layer.msg('修改密码成功')
                // 重置表单
                document.querySelector('.layui-form').reset()
            }
        })
    })
})