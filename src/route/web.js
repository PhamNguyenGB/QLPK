import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/showUsers', homeController.showUsers);
    router.get('/create', homeController.create);
    router.post('/create-user', homeController.createUser);
    router.get('/user/:id/formEdit', homeController.userFormEdit);
    router.put('/user/:id/update', homeController.updateUser);
    router.get('/user/:id/delete', homeController.deleteUser);

    // API routes 
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-users', userController.handleGetUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    router.get('/', homeController.index);

    return app.use('/', router);
};

module.exports = initWebRoutes;