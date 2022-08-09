window.addEventListener('load', function () {
    getInofrmation();
    // 定义layui form对象
    let form = layui.form
    // 禁止改动登录名称
    this.document.querySelector('.use-name').disabled = true;
    // 获取用户基本信息并渲染
    function getInofrmation() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                // 利用layui快速将数据填入表格
                form.val('user—information', res.data);
            }
        })
    }
    // 设置表单验证规则
    form.verify({
        // 用户昵称规则
        login: [/^[\u4e00-\u9fa5a-zA-Z0-9]{3,5}$/,
            '用户昵称只能包含中文、字母或数字3到5个']
    })
    // 重置按钮
    this.document.querySelector('.reset').addEventListener('click', function () {
        getInofrmation();
    })
    // 修改表单提交
    document.querySelector('.layui-form').addEventListener('submit', function (e) {
        e.preventDefault();
        let fm = $(this).serialize()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: fm,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败')
                }
                layer.msg('修改用户信息成功')
                setTimeout(function () {
                    getInofrmation();
                    window.parent.getMessage();
                }, 1000)
            }
        })
    })
})