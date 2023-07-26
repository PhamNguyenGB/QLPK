import userService from '../services/userService';

class userController {
    async handleLogin(req, res) {
        let email = req.body.email;
        let password = req.body.password;

        if (!email || !password) {
            res.status(500).json({
                errCode: 1,
                message: 'Login failed',
            })
        }

        let userData = await userService.handleLogin(email, password);

        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {},
        });
    };
}

module.exports = new userController;