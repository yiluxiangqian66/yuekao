require(['jquery', 'handlebars'], function($, handlebars) {
    var id = location.search.slice(1).split('=')[1];
    $.ajax({
        url: '/api/detail?id=' + id,
        dataType: 'json',
        success: function(res) {
            render('.content', res, '#tep');
            $('#btn2').on('click', function() {
                $('.content').html('');
                $('.content').html('<p class="xq">' + res.ms + '</p>')

            })
            $('#btn1').on('click', function() {
                render('.content', res, '#tep');
            })
        }
    })
    $('button').on('click', function() {
        $(this).addClass('acv').siblings().removeClass('acv');
    })

    function render(el, list, id) {
        var source = $(id).html();
        var template = handlebars.compile(source);
        var html = template(list);
        $(el).html(html);
    }
    //点击切换不同的视图
    $('.content').on('click', 'dl dt img', function() {
        $(this).toggleClass('act');

    })
})