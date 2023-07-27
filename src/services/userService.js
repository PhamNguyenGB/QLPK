import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

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

let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try{
            let userData = {};

            let isExist = await checkEmail(email);

            if (isExist) {
                // user already exists
                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'roleId'],
                    where: {email : email},
                    raw: true,
                });

                if (user) {
                    // compare password
                    let check = await bcrypt.compareSync(password , user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'success';
                        delete user.password; 
                        userData.user = user;
                    }else {
                        userData.errCode = 3;
                        userData.errMessage = 'wrong password';
                    }

                }else {
                    userData.errCode = 2;
                    userData.errMessage = 'user not found';
                }

            }else {
                userData.errCode = 1;
                userData.errMessage = `your's email isn't exist in your system`;
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
};

let compareUserPassword = () => {
    return new Promise((resolve, reject) => {
        try {
            
        } catch (error) {
            reject(error);
        }
    });
};

let checkEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email : email}
            });
            if (user) {
                resolve(true);
            }else {
                resolve(false);
            }
        }catch (error) {   
            reject(error);
        };
    }
)};

let getUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if(userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    },
                });
            };
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId},
                    attributes: {
                        exclude: ['password'],
                    },
                });
            };
            resolve(users);
        } catch (error) {
            reject(error);
        };
    });
};

let createNewUser = (data) => {
    return new Promise( async(resolve, reject) => {
        try {
            //check email is exist ???
            let CheckEmail = await checkEmail(data.email);
            if (CheckEmail === true) {
                resolve({
                    errCode: 1,
                    message: 'Email already exists',
                });
            };


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
            resolve({
                errCode: 0,
                message: 'OK',
            });
        } catch (error) {
            reject(error);
        };
    });
};

let deleteUser = (userId) => {
    return new Promise( async (resolve, reject) => {
        let user = await db.User.findOne({
            where: {id: userId},
            raw: false,
        });
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: 'User not found',
            })
        }
        await user.destroy();
    });
};

module.exports = {
    handleLogin : handleLogin,
    getUsers : getUsers,
    createNewUser : createNewUser,
    deleteUser: deleteUser,
}