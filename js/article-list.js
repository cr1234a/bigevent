window.addEventListener('load', function () {
    // 定义发送请求时传递的参数
    let p = {
        pagenum: 1,/* 默认的页码值 */
        pagesize: 2,/* 每页显示多少条数据 */
        cate_id: '',/* 文章分类的 Id */
        state: '' /* 文章的状态，可选值有：已发布、草稿 */
    }
    let laypage = layui.laypage;
    getList()
    kinds()
    // 获取元素并渲染
    function getList() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: p,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5, offset: '5px' })
                }
                // console.log(res)
                // 定义渲染模板
                let art_list = template('art-list', res)
                document.querySelector('tbody').innerHTML = art_list
                // 渲染分页
                pagination(res.total)
            }
        })
    }
    template.defaults.imports.date = function (time) {
        let times = new Date(time)
        let z = times.getFullYear()
        let y = times.getMonth() + 1
        y = y > 9 ? y : "0" + y
        let x = times.getDate()
        x = x > 9 ? x : "0" + x
        let h = times.getHours()
        h = h > 9 ? h : "0" + h
        let m = times.getMinutes()
        m = m > 9 ? m : "0" + m
        let s = times.getSeconds()
        s = s > 9 ? s : "0" + s
        return z + '-' + y + '-' + x + ' ' + ' ' + h + ':' + m + ':' + s
    }
    // 所有分类渲染
    function kinds() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败', { icon: 5, offset: '5px' })
                }
                // console.log(res)
                let all = template('select', res)
                document.querySelector('.kinds').innerHTML = all
                // 利用layui方法重新将模板进行渲染
                layui.form.render()
            }
        })
    }
    // 筛选功能
    $('.Select').on('submit', function (e) {
        e.preventDefault()
        all = $('[name=cate_id]').val()
        stata = $('[name=state]').val()
        p.cate_id = all
        p.state = stata
        // 根据新添加发送给ajax的数据重新渲染
        getList()
    })
    // 分页功能，利用layui进行渲染
    function pagination(total) {
        laypage.render({
            elem: 'pagination', //存放分页符的盒子
            count: total,//数据总数
            limit: p.pagesize,//默认一页展现的数据条数
            curr: p.pagenum, //默认的页码值
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],//自定义布局
            limits: [2, 3, 5, 8],//每页显示数据快捷选择区
            // 通过jump回调获取新的页码值
            // obj获取当前分页的所有参数,当通过调用 laypage.render方法调用jump回调时,返回的first等于true,当通过页码值的切换直接调用jump时,first等于undefined
            jump: function (obj, first) {
                // 附以新的页码值
                p.pagenum = obj.curr
                // 附以新的每页展示条数
                p.pagesize = obj.limit
                // 如果直接调用getList(),就会不断的产生死循环
                //只能通过点击页码值来调用jump回调,跳过对第一次  getList()函数的调用
                if (!first) {
                    getList()
                }
            }
        })
    }
    // 删除功能
    $('body').on('click', '.layui-btn-danger', function () {
        //获取当前页面有多少个删除按钮
        let remove = $('.layui-btn-danger').length
        layer.confirm('确定删除吗?', { icon: 3, title: '提示', offset: '5px' }, function (index) {
            let id = $('.layui-btn-danger').attr('data-id')
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message, { icon: 5, offset: '5px' })
                    }
                    // 当页面处于第一页时不进行操作,当只有一个删除按钮,且改操作是在点击删除确定按钮时执行的,因此应该让页码值减一
                    if (remove === 1) {
                        p.pagenum = p.pagenum === 1 ? p.pagenum : p.pagenum - 1
                    }
                    getList()
                }
            })
            layer.close(index);
        })
    })
})