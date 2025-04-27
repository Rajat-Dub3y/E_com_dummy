import jwt from "jsonwebtoken";

const generateToken=(res,userId)=>{
    const Token=jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );
    res.cookie('jwt',Token,{
        httpOnly:true,
        secure:process.env.NODE_ENV!=='development',
        sameSite:'strict',
        maxAge:24*60*60*1000
    });
    return Token;
};
export default generateToken;