$(function(){
	
    $(document).on('click','.prDetail_preview__little-item',function (e) {
        $('.prDetail_preview__little-item').removeClass('active');
        $(this).addClass('active');
        let itemSrc = $(this).children().attr("src");
        $('.prDetail_preview__wrapper-img').attr('src',itemSrc)
    })

    $('.prDetail_accordion_head').click(function(){
        $(this).toggleClass('active');
        $(this).parent().find('.arrow').toggleClass('arrow-animate');
        $(this).parent().find('.prDetail_accordion_content').slideToggle(280);
    });

    let countInput = $('#prDetailCount');
    $('#count-dec').on('click',function () {
        if (countInput.val()>=10) {
            return;
        }
        countInput.val( function(i, oldval) {
            return ++oldval;
        });
    })

    $('#count-inc').on('click',function () {
        if (countInput.val()<=1) {
            return;
        }
        countInput.val( function(i, oldval) {
            return --oldval;
        });
    })

});