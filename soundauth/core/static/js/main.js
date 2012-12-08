$(function() {
    var $submit = $('#id_submit');
    var $password = $('.password_field');

    
    if ($submit.length && $password.length) {
        if ($submit) {
            $submit.on('click', function() {
                $password.val(patternToPassword());
            });
        }
    }

});
