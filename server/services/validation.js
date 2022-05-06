let validateEmail = async(email) => {
    //remove all spaces
    email = email.replace(/\s/g, '');

    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        if (email.length < 7) {
            return [0, 'Too short email entered'];
        } else if (email.length > 80) {
            return [0, 'Too long email entered'];
        }
        return [1, email];
    } else {
        return [0, 'Invalid email'];
    }
}

let validatePhone = async(phone) => {
    //remove all non numeric
    phone = phone.replace(/\D/g, '');

    if (phone.length < 10 || phone.length > 14) {
        return [0, 'Invalid phone number'];
    }

    return [1, phone];
}
let validatePassword = async(password) => {
    if (!password.match(/[a-zA-Z]+/g)) {
        return [0, 'Password should contain alphabets']
    }
    if (!password.match(/[0-9]+/g)) {
        return [0, 'Password should contain numeric data']
    }
    if (!password.match(/[@#$!&*]+/g)) {
        return [0, 'Password should contain special characters']
    }
    if (password.length < 8) {
        return [0, 'Password should contain above 8 letters']
    }
    return [1, password]

}

let validateAddUser = async(data) => {
    let errors = []
    let arr = ['firstname', 'lastname', 'phone', 'email', 'password', 'address']
    if (data['firstname'] == 'undefined' || data['firstname'] == '' || data['firstname'] == null) {
        errors.push({ field: 'firstname', msg: 'field empty' })
    }

    if (data['lastname'] == 'undefined' || data['lastname'] == '' || data['lastname'] == null) {
        errors.push({ field: 'lastname', msg: 'field empty' })
    }

    if (data['phone'] == 'undefined' || data['phone'] == '' || data['phone'] == null) {
        errors.push({ field: 'phone', msg: 'field empty' })
    } else {
        let valid = await validatePhone(data['phone'])
        if (!valid[0]) {
            errors.push({ field: 'phone', msg: valid[1] })
        }
    }

    if (data['email'] == 'undefined' || data['email'] == '' || data['email'] == null) {
        errors.push({ field: 'email', msg: 'field empty' })
    } else {
        let valid = await validateEmail(data['email'])
        if (!valid[0]) {
            errors.push({ field: 'email', msg: valid[1] })
        }
    }

    if (data['address'] == 'undefined' || data['address'] == '' || data['address'] == null) {
        errors.push({ field: 'address', msg: 'field empty' })
    }

    if (data['password'] == 'undefined' || data['password'] == '' || data['password'] == null) {
        errors.push({ field: 'password', msg: 'field empty' })
    } else {
        let valid = await validatePassword(data['password'])
        if (!valid[0]) {
            errors.push({ field: 'password', msg: valid[1] })
        }
    }

    return errors;

}

let validateLogin = async(data) => {
    let email = await validateEmail(data.contact)
    let phone = await validatePhone(data.contact)
    if (email[0] || phone[0]) {

    }
}
module.exports = { validateAddUser, validateLogin }