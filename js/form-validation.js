var isArabic = (function () {
    if ($('html').hasClass("rtl")) {
        return true;
    }
    else {
        return false;
    }
}());

//Global validation message
var mobile_error = "Mobile number is incorrect",
    alphabets_error = "Please enter name in English only",
    onlyArabic = "Please enter name in Arabic only",
    check_error = "Please accept the terms and conditions",
    already_exists = " aleady exists",
    extension = "Please upload an image file.",
    first_three_letter = "Emirates ID must starts with 784",
    emiratesid_dob_validation = "Emirates ID and Date of Birth doesn't match,Please enter a valid Emirates ID",
    email_match = "Email should not match";

if (isArabic) {
    mobile_error = "الرجاء إدخال الرقم بصيغة صحيحة. ";
    alphabets_error = "من فضلك أدخل الإسم بالانجليزية فقط";
    check_error = 'الرجاء الإقرار بالإطلاع على النظم واللوائح';
    onlyArabic = "من فضلك ادخل باللغة العربية";
    already_exists = "مستخدم من قبل شخص آخر";
    extension = "الرجاء إختيار ملف بصيغة صحيحة.";
    email_match = "البريد الالكتروني غير متطابق";
    first_three_letter = "رقم بطاقة الهوية يجب ان يبدأ بالارقام 784";
    emiratesid_dob_validation = "رقم بطاقة الهوية وتاريخ الميلاد غير متطابقين , من فضلك ادخل رقم بطاقة هوية صحيح";
    valid_number = "Please enter a valid number";
    digits = "Please enter only digits",
    remote = "This exists.";
    url = "Please enter a valid URL.";
    date = "Please enter a valid date.";
    dateISO = "Please enter a valid date (ISO).";
    creditcard = "Please enter a valid credit card number.";
    maxlength = "Please enter a valid URL.";
    minlength = "Please enter a valid URL.";

    jQuery.extend(jQuery.validator.messages, {
        required: "تعبئة هذا الحقل إجباري",
        remote: "This exists.",
        email: "البريد الالكتروني غير صحيح",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        number: "الرجاء إدخال الرقم بصيغة صحيحة. ",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "كلمة السر وكلمة السر لا تتطابقان",
        maxlength: $.validator.format("الرجاء إدخال الرقم بصيغة صحيحة"),
        minlength: $.validator.format("الرجاء إدخال الرقم بصيغة صحيحة"),
        rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
        range: $.validator.format("Please enter a value between {0} and {1}."),
        max: $.validator.format("الرجاء إدخال الرقم بصيغة صحيحة"),
        min: $.validator.format("الرجاء إدخال الرقم بصيغة صحيحة"),
        extension: "الرجاء إختيار ملف بصيغة صحيحة."
    });
}

$(document).ready(function () { 

    var defaultDateofBirth = new Date("October 1, 1975");
    $(".date-of-birth-datepicker").datepicker({
		defaultDate: defaultDateofBirth,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd-mm-yy',
        yearRange: '1950:2012'
    }).on('change', function () {
        $(this).valid();
    });

    $(".emiratesid-expiry-datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd-mm-yy',
		maxDate: '0'
    }).on('change', function () {
        $(this).valid();
    });
    

    $("#submit-sample-form").on("click", function (e) {
        e.preventDefault();
        var isformValid = $("#sample-form").valid();     
        console.log("isformValid");   
        if (isformValid) {
            console.log(isformValid);
			if ($("textarea[name='g-recaptcha-response']").val() !== "") {
                
			}
			else{
				alert("please fill the captcha.");
			}
        }
    });

    /*** jquery validate method to check first 3 letter of emirates id ***/
    jQuery.validator.addMethod("first_three_letter", function (value, element, params) {
        return this.optional(element) || value.slice(0, 3) == "784";
    }, jQuery.validator.format(first_three_letter));

    /*** jquery validate method to check dob and emirates id matching***/
    jQuery.validator.addMethod("emiratesid_dob_validation", function (value, element, params) {
        return this.optional(element) || emiratesid_dob_validation_check(value, element, params);
    }, jQuery.validator.format(emiratesid_dob_validation));

    jQuery.validator.addMethod("alphabets", function (value, element) {
        var ltrs = jQuery(element).val(),
            intRegex = /^[a-zA-Z ]*$/;

        if (!intRegex.test(ltrs)) {
            return false;
        }
        return true;
    }, alphabets_error);

    jQuery.validator.addMethod("onlyarabic", function (value, element) {
        var ltrs = jQuery(element).val(),
            intRegex = /^[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF ]*$/;

        if (!intRegex.test(ltrs)) {
            return false;
        }
        return true;
    }, onlyArabic);

    jQuery.validator.addMethod("alphanumeric", function(value, element) {
        return this.optional(element) || /^[\w.]+$/i.test(value);
    }, "Letters and numbers only allowed");

    /*** validate sample form ***/
    $("#sample-form").validate({
        onfocusout: function (e) {
            this.element(e);
        },
        rules: {
            'version' : {
                required: true,
                pattern: /^[V|v](\.)?(\d+\.)?(\d+\.)?([0-9])$/,
            },
            'name_english': {
                required: true,
                "alphabets": true
            },
            'name_arabic': {
                required: true,
                "onlyarabic": true
            },
            'phone_number': {
				required: true,
                number: true,
                minlength: 10,
                maxlength: 16                      
			},
            'emirates_id_number': {
                required: true,
                number: true,
                first_three_letter: true,
                emiratesid_dob_validation: true,
                maxlength: 15,
                minlength: 15
            },
            'passport_number' : {
                required: true,
                alphanumeric: true,
                maxlength: 16
            },
            'profile_picture': {
                required: true
            },
            'gender': {
                required: true
            },
            'address':{
                required: true
            },
            'nationality':{
                required: true
            },
            'date_of_birth':{
                required: true
            },
            'email_address':{
                required: true,
                email: true
            },
            'uae_phone_number':{
                required: true,
                number: true,
                minlength: 9,
                maxlength: 9
            }
        },
        messages: {
            'name_english': {
                required: "Please add the name in english"
            },
            'name_arabic': {
                required: "Please add the name in english"
            },
            'gender': {
                required: "Please select the gender"
            },
            'email_address': {
                required: "Please enter the email address in a valid format"
            },
            'address': {
                required: "Please enter the address"
            },
            'date_of_birth': {
                required: "Please select the date of birth"
            },
            'emirates_id_number': {
                required: "Please enter the Emirates id number in a valid format"
            },
            'profile_picture': {
                required: "Please select the profile picture"
            },
            'phone_number': {
                required: "Please enter the phone number in a valid format"
            },
        },
        invalidHandler: function (form, validator) {
            if (!validator.numberOfInvalids())
                return;
            $('html, body').animate({
                scrollTop: $(validator.errorList[0].element).offset().top - 100
            }, 500);
        }
    });
});

/*** function to compare the dob and emirates id ***/
function emiratesid_dob_validation_check(value, element, param) {
    var dob_value = $("input.date-of-birth-datepicker").val();
    if (typeof dob_value !== "undefined" && dob_value !== "") {
        var year_of_birth = dob_value.substr(dob_value.length - 4);
        var emirates_id_year_of_birth = value.substring(3, 7);
        if (year_of_birth == emirates_id_year_of_birth) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return true;
    }
}