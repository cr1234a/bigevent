window.addEventListener('load', function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)
    // 将文件选择给到上传按钮
    document.querySelector('.upload').addEventListener('click', function () {
        document.querySelector('.files').click()
    })
    let input = document.querySelector('.files')
    // 将选择的图片渲染到裁剪区域
    let layer = layui.layer
    input.addEventListener('change', function (e) {
        // 判断用户是否选择了文件
        let file = e.target.files
        if (file.length === 0) {
            return layer.msg('您未选择文件')
        }
        // 拿到用户选择的文件
        let files = e.target.files[0]
        // 将文件转换未=为url编码
        let url = URL.createObjectURL(files)
        // 先销毁原先的图像，在将url给到图像，在初始化
        $image.cropper('destroy').attr('src', url).cropper(options)
    })
    // 点击确定，发起ajax请求修改头像
    $('.sure').on('click', function () {
        // 将图片转化为base64格式
        let dataURL = $image
            // 创建一个Canvas画布
            .cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            })
            // 将Canvas画布上的内容，转化为 base64 格式的字符串
            .toDataURL('image/png')
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败')
                }
                layer.msg('更换头像成功')
                // 重新渲染页面头像
                window.parent.getMessage()
            }
        })
    })
})