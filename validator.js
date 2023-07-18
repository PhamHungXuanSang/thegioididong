function Validator(formSelector) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(`${selector}`)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var formElement = document.querySelector(`${formSelector}`);
    var formRules = {};

    // Tạo custom rule
    // Quy ước rule:
    // 1. Họ Tên không được trống, không chứa chữ số, không có ký tự đặc biệt
    // 2. Số điện thoại không được trống, gồm 10 chữ số, không có chữ cái, bắt đầu bằng số 0
    var validatorRules = {
        required: function (value) {
            return value.length > 0 ? undefined : 'Vui lòng nhập trường này';
        },
        name: function (value) {
            if (/^[a-z A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$/.test(value)) {
                return undefined;
            } else return 'Họ và Tên không đúng';
        },
        number: function (value) {
            return !isNaN(value) && value[0] == 0 ? undefined : 'Số điện thoại không hợp lệ';
        },
        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Không đủ ${min} ký tự`;
            };
        },
        max: function (max) {
            return function (value) {
                return value.length <= max ? undefined : `Quá ${max} ký tự`;
            };
        },
    };

    if (!formElement) {
        console.log(`Không tìm thấy ${formSelector} selector`);
        return;
    }
    // Lấy ra tất cả những thẻ input có atribute name và rules
    var inputs = formElement.querySelectorAll('[name][rules]');
    // Lặp qua NodeList inputs
    for (var input of inputs) {
        // Lấy ra các rule của từng input
        var rules = input.getAttribute('rules').split('|');
        // Lặp qua các rule của từng input
        for (var rule of rules) {
            // var ruleInfor;
            // var isRuleHasValue = rule.includes(':');
            // // Nếu trong rule có dấu ':' thì split ':' gán lại rule bằng phần tử đứng trước ':'
            // if (isRuleHasValue) {
            //     ruleInfor = rule.split(':');
            //     rule = ruleInfor[0];
            // }
            // // Tạo ra biến lưu function, trường hợp có : thì biến = biến(value)
            // var ruleFunction = validatorRules[rule];
            // if (isRuleHasValue) {
            //     ruleFunction = ruleFunction(ruleInfor[1]);
            // }
            // // Biến đổi formRules key input.name thành array chứa các function
            // if (Array.isArray(formRules[input.name])) {
            //     formRules[input.name].push(ruleFunction);
            // } else {
            //     formRules[input.name] = [ruleFunction];
            // }

            var ruleInfo;
            var ruleFunc = validatorRules[rule];
            if (rule.includes(':')) {
                ruleInfo = rule.split(':');
                ruleFunc = validatorRules[ruleInfo[0]](ruleInfo[1]);
            }
            if (Array.isArray(formRules[input.name])) {
                formRules[input.name].push(ruleFunc);
            } else {
                formRules[input.name] = [ruleFunc];
            }
        }

        function handleValidate(e) {
            for (var func of formRules[e.target.name]) {
                if (func(e.target.value)) {
                    getParent(e.target, '.form-group').classList.add('invalid');
                    getParent(e.target, '.form-group').querySelector('.form-message').innerText = func(e.target.value);
                    break;
                }
            }
            return !func(e.target.value);
        }

        input.onblur = (e) => handleValidate(e);

        input.oninput = (e) => {
            getParent(e.target, '.form-group').classList.remove('invalid');
            getParent(e.target, '.form-group').querySelector('.form-message').innerText = '';
        };

        formElement.onsubmit = (e) => {
            e.preventDefault();
            var isValid = true;
            for (var input of inputs) {
                if (!handleValidate({ target: input })) {
                    isValid = false;
                }
            }
            if (isValid) {
                if (typeof this.onSubmit === 'function') {
                    var inputsHasRule = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(inputsHasRule).reduce((values, input) => {
                        values[input.name] = input.value;
                        return values;
                    }, {});
                    this.onSubmit(formValues);
                } else {
                    formElement.submit();
                }
            }
        };
    }
}
