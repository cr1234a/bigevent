window.addEventListener('load', function () {
    // 获取文章分类，并渲染
    fn()
    function fn() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                let kind = template('article-kind', res)
                document.querySelector('tbody').innerHTML = kind
            }
        })
    }
    // 给添加分类按钮添加弹窗
    // 获取弹窗的返回值，用index接收，用于关闭弹窗
    let index = null
    let add = document.querySelector('.add')
    add.addEventListener('click', function () {
        index = layer.open({
            type: 1,
            title: ['添加文章分类', 'font-size:18px;'],
            area: ['500px', '280px'],
            // 将弹窗模板赋值给content
            content: document.querySelector('#pop-up_window').innerHTML
        });
    })

    // 点击确定添加图书，利用事件委托
    document.body.addEventListener('click', function (e) {
        if (e.target.id == 'ok') {
            // 阻止默认提交行为
            e.preventDefault()
            let form = e.target.parentNode.parentNode.parentNode.id
            let form1 = $('#' + form)
            $.ajax({
                method: 'post',
                url: '/my/article/addcates',
                data: form1.serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    // 重新渲染
                    fn()
                    // 关闭弹出窗口
                    layer.close(index)

                }
            })
        }
    })


    // $('body').on('submit', '#id-form', function (e) {
    //     e.preventDefault()
    //     $.ajax({
    //         method: 'post',
    //         url: '/my/article/addcates',
    //         data: $('#id-form').serialize(),
    //         success: function (res) {
    //             // console.log(res)
    //             if (res.status !== 0) {
    //                 return layer.msg(res.message)
    //             }
    //             layer.msg(res.message)
    //             // 重新渲染
    //             fn()
    //             // 关闭弹出窗口
    //             layer.close(index)
    //         }
    //     })
    // })


    // 删除分类文章
    $('tbody').on('click', '.remove', function () {
        // 获得删除的id
        let id = $(this).attr('data-del')
        // 弹窗
        layer.confirm('确定删除吗？', { icon: 3, title: '提示', offset: '5px' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {

                    if (res.status != 0) {
                        return layer.msg("管理员不允许删除此项", { icon: 5, offset: '5px' })
                    }
                    layer.msg(res.message, { icon: 6, offset: '5px' })
                    // 重新渲染
                    fn()
                }
            })
            layer.close(index);
        });
    })

    // 修改文章
    // 定义弹窗，用于修改弹窗
    let a = null
    let b = null
    let index1 = null;
    $('tbody').on('click', '.correct', function (e) {
        index1 = layer.open({
            area: ['500px', '300px'],
            title: ['修改文章分类', 'font-size:18px;'],
            type: 1,
            content: document.querySelector('#pop-up_window1').innerHTML
        })
        // 渲染数据
        // 获取文章数据渲染修改的数据
        // 获取id
        let id = $(this).attr('data-add')
        console.log(id)
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5, offset: '5px' })
                }
                // 将数据填入表单
                let form = layui.form
                form.val('Form', res.data)
                a = document.querySelector('.uname').value
                b = document.querySelector('.nname').value
            }
        })


        // 重置按钮
        $('body').on('click', '#reset', function () {
            // 渲染数据
            document.querySelector('.uname').value = a
            document.querySelector('.nname').value = b
        })
    })


    // 提交修改
    $('body').on('submit', '#Id-form', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        console.log($('#Id-form').serialize())
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $('#Id-form').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5, offset: '5px' })
                }
                layer.msg(res.message, { icon: 6, offset: '5px' })
                // 渲染数据
                fn()
                // 关闭弹出窗口
                layer.close(index1)
            }
        })
    })
})