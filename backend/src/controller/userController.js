const dataResponse = require('../lib/dataResponse.js');
const {hashPassword} = require('../middleware/hashPassword.js');
const {user} = require('../lib/client.js')
const{generateCookie} = require('../lib/cookie.js');

class userController{
     createUser = async (req, res) => {
        let {email, password,role} = req.body;
        if(!email || !password, !role){
           return res.json(dataResponse(null, 'All fields are required', 400));
        }
        try{
            //hash the password and save the user to the database
            password = await hashPassword(password)
            let newUser = await user.create({
                data: {
                    user_email:email,
                    user_password:password,
                    user_role:role
                }
            })
            //create a jwt token and send it to the user cookie
            await generateCookie({
                user_id: newUser.user_id,
                user_role: newUser.user_role
            }, res);

            res.json(dataResponse(null, 'User created successfully', 201));
            
        } catch(e){
            res.json(dataResponse(null, e.message, 500));
        }
    }

    getUserById = async (req, res) => {
        const {id} = req.params;
        if(!id){
            return res.json(dataResponse(null, 'Not enough credentials', 400));
        }
        try{
            //get the user from the database
            let newUser = await user.findUnique({
                where: {
                    user_id: id
                }
            })
            if(!newUser){
                return res.json(dataResponse(null, 'User not found', 404));
            }
            res.json(dataResponse(newUser, 'User fetched successfully', 200));
        } catch(e){
            res.json(dataResponse(null, e.message, 500));
        }
    }

    getUserByEmail = async  (req, res) => {
        const {email,password} = req.body;
        if(!email || !password){
           return  res.json(dataResponse(null, 'Not enough credentials', 400));
        }
        try{
            //get the user from the database
            let newUser = await user.findUnique({
                where: {
                    user_email: email
                }
            })
            if(!newUser){
                res.json(dataResponse(null, 'No user with this email exists', 404));
            }
            res.json(dataResponse(newUser, 'User fetched successfully', 200));

        } catch(e){
            res.json(dataResponse(null, e.message, 500));
        }
    }

    updateUser = (req, res) => {
        const {id} = req.params;
        if(!id){
           return res.json(dataResponse(null, 'Not enough credentials', 400));
        }
        try{
            //update the user in the database
            const newUser = user.update({
                where: {
                    user_id: id
                },
                data: req.body
            })
            if(!newUser){
                res.json(dataResponse(null, 'User not found', 404));
            }
            res.json(dataResponse(newUser, 'User updated successfully', 200));
        } catch(e){
            res.json(dataResponse(null, e.message, 500));
        }
    }

    deleteUser = async (req, res) => {
        const {id} = req.params;
        if(!id){
            return res.json(dataResponse(null, 'Not enough credentials', 400));
        }
        try{
            //delete the user from the database
            const newUser = await user.delete({
                where: {
                    user_id: id
                }
            })
            if(!newUser){
                res.json(dataResponse(null, 'User not found', 404));
            }
            res.json(dataResponse(newUser, 'User deleted successfully', 200));
        } catch(e){
            res.json(dataResponse(null, e.message, 500));
        }
    }
}

module.exports = userController;