const md5 = require('md5')
const { dummyUsers } = require('../config/config')
require('dotenv').config()

//database related operations
const users = dummyUsers

const addUser = async(data) => {
    data['token'] = users.length + 1
    users.push(data)
    return users
}

const checkUser = async(data) => {
    let valid = users.filter(
            (a) => {
                if ((a.phone == data.contact || a.email == data.contact) && a.password == md5(process.env.SALT + data.password)) {
                    return a
                }
            })
        // console.log(valid)
    if (valid.length > 0) {
        return valid
    } else {
        return 0
    }
}

const updateUser = async(data) => {
    let valid = users.map(a => {
        if (a.token == data.token) {
            a = {...a, ...data }
            return a
        }
    })
    let v = valid.filter(a => a != null)
    if (v.length > 0) {
        return v
    } else {
        return 0
    }
}

const searchUser = async(data) => {
    let key = Object.keys(data).filter(a => a != 'token' && a != 'nextpage')
    let dt = users.filter(a => a[key[0]] == data[key[0]] && a['token'] == data.token)
    let nextPageToken = data.nextpage
    let nextpage = 0
    if (nextPageToken <= users.length) {
        if (5 + parseInt(nextPageToken) < users.length) {
            nextpage = 5 + parseInt(nextPageToken)
        }
        return [nextpage, dt.slice(parseInt(nextPageToken), 5 + parseInt(nextPageToken))]
    } else {
        return [0, 'data not available']
    }

}

const getUsers = async(nextPageToken) => {
    let nextpage = 1
    if (nextPageToken <= users.length) {
        if (5 + parseInt(nextPageToken) < users.length) {
            nextpage = 5 + parseInt(nextPageToken)
        }
        return [nextpage, users.slice(parseInt(nextPageToken), 5 + parseInt(nextPageToken))]
    } else {
        return [0, 'data not available']
    }
}

module.exports = { addUser, checkUser, updateUser, getUsers, searchUser }