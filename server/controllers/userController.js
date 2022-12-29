const UserModel = require("../userModel/UserModel");
const bcrypt = require("bcryptjs");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");



const register = async (req, res, next) => {

    try {
        console.log(req.body);
        const { username, password, email } = req.body;
      
        if (!email || !password || !username) {
            throw new BadRequestError("please provide username, email and password");
        }
      
        if (password.length < 6) {
            throw new BadRequestError("password cannot be less than 6 characters");
        }

        const existingUsername = await UserModel.findOne({ username });
      
        if (existingUsername) {
          throw new BadRequestError("username already used, choose another username");
        }
      
        const existingEmail = await UserModel.findOne({ email });
      
        if (existingEmail) {
            throw new BadRequestError("email already used, choose another email")
        }
      
        const user = await UserModel.create({ username, email, password });  
      
        if (user) {
          const { _id, username, email } = user;
          return res
            .status(StatusCodes.CREATED)
            .json({ status: true, _id, username, email });
        } else {
            throw new BadRequestError('something went wrong, try again later!')
        }
      
    } catch (error) {
        return res.json({msg: error.message, status: false });
    }
};

const login = async (req, res) => {
    try {
        console.log(req.body);
        const { username, password, email } = req.body;
      
        const user = await UserModel.findOne({ username });
      
        if (!user) {
          throw new NotFoundError("incorrect username or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid){
            throw new UnauthenticatedError('username or password incorrect')
        }

        if (user && isPasswordValid) {
          const { _id, username, email } = user;
          return res
            .status(StatusCodes.CREATED)
            .json({ status: true, _id, username, email });
        } else {
            throw new BadRequestError('something went wrong, try again later!')
        }
      
    } catch (error) {
        return res.json({msg: error.message, status: false });
    }
}



const setAvatar = async(req, res, next) => {
    try {
        console.log(req.body);
        console.log(req.params.id);
        const userId = req.params.id
        const userImage = req.body.image
    
        const userData = await UserModel.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage: userImage
        })
    
        res.status(StatusCodes.OK).json({isImageSet: userData.isAvatarImageSet, avatarImage: userData.avatarImage})
      
    } catch (error) {
        return res.json({msg: error.message});
    }


}
module.exports = { register, login, setAvatar };
