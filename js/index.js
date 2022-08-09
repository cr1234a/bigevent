window.addEventListener('load', function () {
    // 调用getMassage函数获取用户信息
    getMessage();
})
// 获取用户信息
function getMessage() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status != 0) {
                return layer.msg('获取用户信息失败');
            }
            console.log(res)
            let usename = res.data.nickname || res.data.name
            // 获取名字或者昵称并渲染
            document.querySelector('.user-name').innerHTML = usename
            // 获取用户头像并渲染
            if (res.data.user_pic === null) {
                let head_image = usename.toUpperCase()[0]
                document.querySelector('.user-newimage').innerHTML = head_image
                document.querySelector('.user_image').style.display = 'none'
                document.querySelector('.user-newimage1').innerHTML = head_image
                document.querySelector('.user_image1').style.display = 'none'
            } else {
                document.querySelector('.user-newimage').style.display = 'none'
                document.querySelector('.user_image').src = res.data.user_pic
                document.querySelector('.user-newimage1').style.display = 'none'
                document.querySelector('.user_image1').src = res.data.user_pic
            }

        }
    })
}
// 退出按钮
document.querySelector('.goout').addEventListener('click', function () {
    layer.confirm('确认退出吗?', { icon: 3, title: '提示' }, function (index) {
        //点确定要做的事情
        localStorage.removeItem('token')
        location.href = '/login.html'
        // 点取消做的事情
        layer.close(index);
    })
})