
var SignUpInput = document.getElementById('signupName');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');
var Array_1 = location.pathname.split('/');
var Url = '';
for (var i = 0; i < Array_1.length - 1; i++) {
    Url += '/' + Array_1[i]
}
var username = localStorage.getItem('SaveUsername')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}
var signUpArray = []
if (localStorage.getItem('users') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}
function isEmpty() {

    if (SignUpInput.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}
function Email_Exist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}

function signUp() {
    if (isEmpty() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }

    var signUp = {
        name: SignUpInput.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }

    if (signUpArray.length == null) {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        return true
    }
    if (Email_Exist() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'

    } else {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'

    }

}
function isLoginEmpty() {

    if (signinPassword.value == "" || signinEmail.value == "") {
        return false
    } else {
        return true
    }
}
function login() {
    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var password = signinPassword.value
    var email = signinEmail.value
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('SaveUsername', signUpArray[i].name)
            if (Url == '/') {
                location.replace('https://' + location.hostname + '/home.html')

            } else {
                location.replace(Url + '/home.html')

            }
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }

}
function logout() {
    localStorage.removeItem('SaveUsername')
}



