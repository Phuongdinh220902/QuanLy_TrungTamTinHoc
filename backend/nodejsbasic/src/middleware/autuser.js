let autUser = (req, res, next) => {
    // if (!req.user) {
    //     return res.status(403).json({
    //         "msg": "can dang nhap"
    //     })
    // }
    next()
}

let autRoleGV = (req, res, next) => {
    if (req.role != 'GV') {
        return res.status(403).json({
            "msg": "Ban can la giang vien"
        })
    }
    next()
}

module.exports = {
    autUser
}