$(function(){
    document.querySelectorAll('.filter-tab_checkbox').forEach(element=>
        element.addEventListener('click',function (e) {
            e.preventDefault();
            e.target.classList.toggle('isChecked');
        })
    )

    let overlay = $('.res-overlay');
    let filterComp = $('.responsive-filter');
    $(document).on('click', '.filter-result_res-count',function (e) {
        e.preventDefault();
        overlay.addClass('active');
        filterComp.addClass('active');
    })

    $(window).on('click', function (e) {
        let overlaytemp = $('.res-overlay')[0];
        if (e.target==overlaytemp) {
            overlay.removeClass('active');
            filterComp.removeClass('active');
        }
    });

    
});