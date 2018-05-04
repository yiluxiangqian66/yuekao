require(['jquery', 'handlebars', 'swiper', 'iscroll'], function($, handlebars, swiper, IScroll) {
        //首页默认数据的渲染
        var type = "chuang";
        getData(type, $('.box'));
        //头部滚动条
        var n = 0;
        $('.navList li').each(function() {
            n += $(this).outerWidth(true);
        })
        $('.navList').width(n);
        var myscroll = new IScroll('.nav', {
            scrollX: true,
            scrollY: false
        })

        //swiper
        var mySwiper = new swiper('.parent', {
            onSlideChangeEnd: function(swiper) {
                Style(swiper.activeIndex);
            }
        });

        //点击切换类名
        $('.nav li').on('click', function() {
            $(this).addClass('active').siblings().removeClass();
            mySwiper.slideTo($(this).index());
            type = $(this).data('type');
            var ind = $(this).index();
            var obj = $('.parent .swiper-slide').eq(ind);
            getData(type, obj);

        })

        function Style(i) {
            $('.nav li').eq(i).addClass('active').siblings().removeClass();
        }

        function getData(type, obj) {
            $.ajax({
                url: '/api/list?type=' + type,
                dataType: 'json',
                success: function(res) {
                    render(obj, res, "#tem");
                },
                error: function(error) {
                    console.log(error);
                }
            })
        }

        function render(el, list, id) {
            var source = $(id).html();
            var template = handlebars.compile(source);
            var html = template(list);
            $(el).html(html);
        }
    })
    // 1.合理布局，实现适配  10分
    // 2.创建git仓库，查询提交历史，提交次数至少3次，添加commit描述  10分
    // 3.使用gulp完成服务端配置并模拟数据 10分
    // 4.使用ajax请求数据  10分
    // 5.使用handlebars渲染数据 10分
    // 6.列表页跳转至详情页的时候有查询参数的传递 10分
    // 7.列表页的视图可以随着菜单栏的点击而切换  10分
    // 8.在详情页要根据不同的商品id请求对应的商品数据并渲染 10分
    // 9.详情页可以滚动切换不同的视图  10分
    // 10.界面美观  10分