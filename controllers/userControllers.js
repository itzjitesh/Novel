import User from "../models/user.js";
import asyncMiddleware from "../middleware/async.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

const getSignup = asyncMiddleware(async(req, res)=>{
    res.render("signup");
});

const postSignup = asyncMiddleware(async(req, res)=>{

    let user = await User.findOne({email: req.body.email});
    
    if (user) return res.status(400).render("error", {
        message : "Email is already registered, Sign up with a new email!"
    });

    bcrypt.hash(req.body.password, saltRounds, async function(err, hash){
        if (err){
            res.status(400).send(err.message);
        }
        else{
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            confirmPassword: hash
        });           
        
        if (req.body.password !== req.body.confirmPassword){
            return res.status(400).render("error", {
                message: "I think there is something wrong with your keyboard, the confirm password has to be same as your password!"
            });
        }
    
        await user.save();

        const token = user.generateAuthToken();

        res.cookie("jwt", token,{
            expires: new Date(Date.now() + 30000),
            httpOnly: true
        });

        res.redirect("/login");
        }
    });  
});

const getLogin = asyncMiddleware(async(req, res)=>{
    res.render("login");
});

const postLogin = asyncMiddleware(async(req, res)=>{
    
    const email = req.body.email;

    const user = await User.findOne({email: email}).select("password email name");
    if (!user) return res.status(400).render("error",{
        message: "No user exists for this email!"
    });

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) return res.status(401).render("error",{
        message: "Invalid Password, Enter the Correct Password!"
    });

    const token = user.generateAuthToken();
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 60 * 1000 * 30),
        httpOnly: true
    });
    
    res.redirect("/");
});

export default {
    postSignup,
    getSignup,
    getLogin,
    postLogin
}