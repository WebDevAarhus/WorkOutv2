$('#addExerciseForm').submit(function (e) {
    $('.alert.alert-danger').hide();
    if (!$('input#name').val() || !$('input#repstime').val()|| !$('input#sets').val()) {
        if ($('.alert.alert-danger').length) {
            $('.alert.alert-danger').show();
        } else {
            $(this).prepend('<div role="alert" class="alert alert-danger">All fields required, please try again!</div>');
        }
        return false;
    }
});

$('#addProgramForm').submit(function (e) {
    $('.alert.alert-danger').hide();
    if (!$('input#name').val() || !$('input#author').val()) {
        if ($('.alert.alert-danger').length) {
            $('.alert.alert-danger').show();
        } else {
            $(this).prepend('<div role="alert" class="alert alert-danger">All fields required, please try again!</div>');
        }
        return false;
    }
});