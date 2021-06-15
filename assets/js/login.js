//点击去注册账号的链接
$('#link_reg').on('click', function () {
    $('.login_box').hide()
    $('.reg_box').show()
})


//点击去登录的链接
$('#link_login').on('click', function () {
    $('.reg_box').hide()
    $('.login_box').show()
})


// 从layui中获取form对象
var form = layui.form
//从layui中获取layer对象
var layer = layui.layer
//设置自定义校验规则
form.verify({
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    // 设置密码校验规则
    pwd: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ],
    //设置确认密码的校验规则
    repwd: function (value) {
        var pwd = $('#passwd').val()
        if (value != pwd) {
            return '两次密码不一致'
        }
    }
})



//监听注册表单的提交事件
// $('#form_reg').on('submit', function (e) {
//     //取消默认提交事件
//     e.preventDefault()//注意别写错
//     //发起ajax请求
//     $.ajax({
//         method: 'POST',
//         url: 'http://api-breakingnews-web.itheima.net/api/reguser',
//         data: {
//             username: $('#userName').val(),
//             password: $('#passwd').val()
//         },
//         success: function (res) {
//             if (res.status !== 0) {
//                 return console.log(res.message);
//             }
//             console.log('注册成功');
//         }
//     })
// })
$('#form_reg').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/api/reguser',
        data: {
            username: $('#userName').val(),
            password: $('#passwd').val()
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)

            }
            layer.msg('注册成功')
            //注册成功后模拟人的点击行为去登录
            $('#link_login').click()
        }
    })
})


//监听 登录的提交事件
$('#from_login').submit(function (e) {
    //阻止默认提交行为
    e.preventDefault()
    //发起ajax请求
    $.ajax({
        method: 'POST',
        url: '/api/login',
        //快速获取表单数据
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('登录成功')
            //把登录成功之后得到的token值保存在本地存储里面
            // console.log(res.token);
            localStorage.setItem('token', res.token)
            //登录成功之后跳转到主页
            location.href = './index.html'
        }
    })
})