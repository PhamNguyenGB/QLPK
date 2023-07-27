import userService from '../services/userService';

class userController {
    async handleLogin(req, res) {
        let email = req.body.email;
        let password = req.body.password;

        if (!email || !password) {
            res.status(500).json({
                errCode: 1,
                message: 'Login failed',
            });
        }

        let userData = await userService.handleLogin(email, password);

        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {},
        });
    };

    async handleGetUsers(req, res) {
        let id = req.query.id;

        if(!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter',
                users: [],
            });
        }

        let users = await userService.getUsers(id);

        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            users,
        });

    };

    async handleCreateNewUser(req, res) {
        let message = await userService.createNewUser(req.body);
        return res.status(200).json(message);

    };

    handleEditUser(req, res) {

    };

    async handleDeleteUser(req, res) {
        if(!req.body.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameter',
            })
        }
        let message = await userService.deleteUser(req.body.id);
        return res.status(200).json(message);

    };
}

module.exports = new userController;