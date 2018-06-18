import express from 'express';
import isEmpty from 'lodash/isEmpty';
import validator from 'validator'

let router = express.Router();

const validatorInput = (data) => {
    let errors = {};
    if (validator.isEmpty(data.username)) {
        errors.username = 'username is required'
    }
    if (validator.isEmpty(data.email)) {
        errors.email = 'email is required'
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "password is required";
    }
    if (validator.isEmpty(data.passwordConfirmation)) {
        errors.passwordConfirmation = "passwordConfirmation is required";
    }

    if (!validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = 'passwords must match !'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

router.post('/', (req, res) => {
    const { errors, isValid } = validatorInput(req.body)
    if (!isValid) {
        res.status(400).json(errors)
    } else {
        res.send("ok")
    }
});

export default router;