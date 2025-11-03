
export const getHomePage = async(req,res)=>{
     
    const user = req.session.user
    res.render('users/home',{user})
}