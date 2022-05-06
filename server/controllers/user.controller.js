var userModel = require("../models/user.model");
const { recreatePassword } = require("../services/authservice");
var validationService = require('../services/validation');
require('dotenv').config();


const adduser = async(req, res) => {
    try {
        let dt = req.body
        let valid = await validationService.validateAddUser(dt);
        if (valid.length == 0) {
            dt['password'] = await recreatePassword(dt.password)
            let out = await userModel.addUser(dt)
            res.status(200).send({ status: 200, data: out.slice(-1), msg: 'user created' })
        } else {
            res.status(400).send(valid)
        }
    } catch (e) {
        return res.status(400).send(e)
    }
}

const login = async(req, res) => {
    try {
        let a = await userModel.checkUser(req.body)
        if (a) {
            res.cookie('token', a[0].token, { maxAge: process.env.COOKIE_VALIDITY, domain: process.env.COOKIE_DOMAIN, httpOnly: false, sameSite: 'none' })
            res.status(200).send({ status: 200, msg: 'login success', cookie: a[0].token })
        } else {
            res.status(400).send('error-login')
        }

    } catch (e) {
        res.status(400).send(e)
    }
}

const users = async(req, res) => {
    try {
        let nextpage = 0
        let data = 'data not available'
        let out = await userModel.getUsers(req.body.nextpage)

        if (parseInt(out[0])) {
            nextpage = out[0]
            data = out[1]
        }
        res.status(200).send({ nextpage: nextpage, data: data })
    } catch (e) {
        res.status(400).send(e)
    }
}

const updateUser = async(req, res) => {
    try {
        let valid = await userModel.updateUser(req.body)
        if (valid) {
            res.status(200).send({ status: 200, msg: 'record updated succussfuly', data: valid })
        } else {
            res.status(400).send({ status: 400, msg: 'token not found' })
        }
    } catch (e) {
        res.status(400).send({ status: 400, msg: e })
    }
}

const searchUser = async(req, res) => {
    try {
        let nextpage = 0
        let data = 'data not available'
        let out = await userModel.searchUser(req.body)

        if (parseInt(out[0])) {
            nextpage = out[0]
            data = out[1]
        }
        res.status(200).send({ nextpage: nextpage, data: data })
    } catch (e) {
        res.status(400).send({ status: 400, msg: e })
    }

}

module.exports = { adduser, login, users, updateUser, searchUser }