var videoID = 0;
$(function () {
    $('.genBtn').click(function () {
        $('#copyToShow').hide();
        videoID = $(this).attr('data-id');
        var score = parseInt($('#txt_score').val()) || 200;
        if (score < 200) score = 200;
        $('#code').text('#' + videoID + '-' + score);
        $('#genModal').modal({ width: 300 });
    });
    $('#txt_score').bind('input propertychange', function () {
        var score = parseInt($('#txt_score').val()) || 200;
        if (score < 200) score = 200;
        $('#code').text('#' + videoID + '-' + score);
    });
    new ClipboardJS('#btn_copy');
    $('#btn_copy').click(function () {
        $('#copyToShow').show();
    });
});