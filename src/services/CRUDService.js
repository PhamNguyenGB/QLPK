import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                address: data.address,
                gender: data.gender == 1 ? true : false,
                roleId: data.roleId,
            });
            resolve('success new user created');
        } catch (error) {
            reject(error);
        }
    });

}

let hashUserPassword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
}

let getUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};

let getUserbyId = ( userId ) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userId},
                raw: true,
            });
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
};

let updateUserData = (data, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userId},
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.email = data.email;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.sex = data.sex;

                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }
            else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    });
};

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
            });
            if (user) {
                user.destroy();
                resolve('deleted user successfully');
            }
        } catch (error) {
            reject(error);
        }
    });
}


module.exports = {
    createNewUser: createNewUser,
    getUser: getUser,
    getUserbyId: getUserbyId,
    updateUserData: updateUserData,
    deleteUser: deleteUser,
};