const { CustomHttpError } = require("../utils/customError");
const catchAsyncErrors = require("../middleware/cacheAsyncError");
const User = require("../model/user");
const user = require("../model/user");

const login = catchAsyncErrors(async (req, res, next) => {
    const data = req.body;
    if (!data.password || !data.email) {
        return next(new CustomHttpError(400, "Please enter all data"));
    }
    const user = await User.findOne(data);
    if (user) {
        res.status(200).json({
            success: true,
            message: `login successfully`,
            userId: user._id,
        });
    } else {
        return next(new CustomHttpError(400, "Invalid credential"));
    }
});

const register = catchAsyncErrors(async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
        return next(new CustomHttpError(400, "Please enter all data"));
    }
    const user = await User.findOne({ email });

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
        message: `user created successfully`,
    });
});

const addNewTask = catchAsyncErrors(async (req, res, next) => {
    const { task, userId } = req.body;
    if (!task) {
        return next(new CustomHttpError(400, "Please enter Task"));
    }
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
        return next(new CustomHttpError(404, "User not found"));
    } else {
        const newTask = {
            task: task,
        };

        user.tasks.push(newTask);
        await user.save();
    }
    res.status(200).json({
        success: true,
        message: `task added successfully`,
    });
});


const getTasks = catchAsyncErrors(async (req, res, next) => {
    if (!req.body.id) {
        return next(new CustomHttpError(400, "User does not exist"));
    }
    const user = await User.findById(req.body.id);
    const tasks = user.tasks;
    res.status(200).json({
        success: true,
        tasks
    });

})

const updateTask = catchAsyncErrors(async (req, res, next) => {
    const { userId, taskId, task, status } = req.body;
    if (!userId || !taskId || !task || !status) {
        return next(new CustomHttpError(400,"Bad Request"));
    }
    const user = await User.findById(userId);
    console.log(user);
    const tasks=user.tasks;
    tasks.map((ele)=>{
        if(ele._id==taskId){
            ele.task=task,
            ele.status=status
        }
    })
    user.save();
})

module.exports = { login, register, addNewTask, getTasks, updateTask };
