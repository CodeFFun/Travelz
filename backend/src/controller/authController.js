const {user} = require('../lib/client.js');
const {comparePassword} = require('../middleware/hashPassword.js');
const{generateCookie} = require('../lib/cookie.js');
const userController = require('../controller/userController.js');
const dataResponse = require('../lib/dataResponse.js');

class authController {
    constructor() {
      this.newUser = null
    }
     async init(){
        this.newUser = new userController();
      }

    login = async (req, res) => {
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
                return res.json(dataResponse(null, "Username or password doesnt match", 404));
            }
            //compare the password
            if(!comparePassword(password, newUser.user_password)){
                return res.json(dataResponse(null, "Username or password doesn't match", 403));
            }
            await generateCookie({
                user_id: newUser.user_id,
                user_role: newUser.user_role
            }, res);
            res.json(dataResponse(newUser, 'User logged in sucessfully', 200));

        } catch(e){
            res.json(dataResponse(null, e.message, 500));
        }
    }
     register = async (req, res) => {
      // do something
      if(!this.newUser){
        await this.init();
      }
      this.newUser.createUser(req, res);
    }

    logout = async (req, res) => {
      // do something
      try{
        res.cookie('token', '', {
          httpOnly: true,
          maxAge: 1
      })
      res.json(dataResponse(null, 'User logged out successfully', 200));
      } catch(e) {
        res.json(dataResponse(null, e.message, 500));
      }

  }
  }
  
  module.exports = authController;