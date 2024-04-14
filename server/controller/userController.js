const { CustomHttpError } = require("../utils/customError");
const catchAsyncErrors = require("../middleware/cacheAsyncError");
const User = require("../model/user");

const login = catchAsyncErrors(async (req, res, next) => {
    const data = req.body;
    if (!data.password || !data.email) {
        return next(new CustomHttpError(400, "Please enter all data"));
    }
    await User.findOne(data)
        .then(response => {
            if (response != null)
                res.status(200).json({
                    success: true,
                    message: `login successfully`
                })
            else
                return next(new CustomHttpError(400, "Invalid credential"));
        })
        .catch(err => {
            return next(new CustomHttpError(400, err));
        })
})

const register = catchAsyncErrors(async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
        return next(new CustomHttpError(400, "Please enter all data"));
    }
    const user = await User.findOne({ email });
    console.log(user);

    if (user) {
        return next(new CustomHttpError(401, "User already exists"));
    } else {
        const user = await User.create({
            username,
            email,
            password,
        });
        await user.save();
    }
    res.status(200).json({
        success: true,
        message: `user created successfully`
    })
})

module.exports = { login, register };
