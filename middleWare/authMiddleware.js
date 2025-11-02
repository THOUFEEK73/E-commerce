export const isAthenticated = async(req,res,next)=>{
    console.log('hellooo')
    console.log('middlecheck',"id is ",req.session )
    if(req.session.user && req.session.user.email){

       return next();
    }

    return res.redirect("/user/login");
}