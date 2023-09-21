

const signup = (req , res) => {
    res.status(200).json('Signup successfull');
}

const getbill = (req , res) => {
    res.status(200).json('Get Bill');
}

module.exports = {
    signup,
    getbill
}