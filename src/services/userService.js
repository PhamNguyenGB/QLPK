import db from '../models/index';
import bcrypt from 'bcryptjs';

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
        }
    }
)};

module.exports = {
    handleLogin : handleLogin,
}