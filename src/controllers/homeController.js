import db from '../models/index';
import CRUDService from '../services/CRUDService';

class homeController {

    // [GET] /
    async index(req, res, next) {
        try {
            const data = await db.User.findAll();
            res.render('home', {
                data: JSON.stringify(data),
                title: 'Home Page',
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [GET] /create
    create(req, res, next) {
        res.render('create', { title: 'Create User' });
    };

    // [POST] /create-user
    async createUser(req, res, next) {
        await CRUDService.createNewUser(req.body);
        res.send('create user successfully');
    };

    // [GET] /showUser
    async showUsers(req, res, next) {
        let data = await CRUDService.getUser();
        res.render('showUsers', {
            title: 'Show Users',
            data: data,
        });
    };

    // [GET] /user/:id/edit
    async userFormEdit(req, res, next) {
        let userId = req.params.id;
        if (userId) {
            let userData = await CRUDService.getUserbyId(userId);
            res.render('edit', { 
                title: 'Edit User',
                userData: userData,
            });
        }
        else {
           res.send('User not found!!!!!!!!!!!!');
        }
    };

    // [PUT] /user/:id/edit
    async updateUser(req, res, next) {
        let data = req.body;
        let userId = req.params.id;
        let allUsers = await CRUDService.updateUserData(data, userId);
        res.render('showUsers',{
            title: 'Show User',
            data: allUsers,
        })
    };

    async deleteUser(req, res, next) {
        let userId = req.params.id;
        await CRUDService.deleteUser(userId);
        res.send('deleted user successfully');
    };
};


module.exports = new homeController;