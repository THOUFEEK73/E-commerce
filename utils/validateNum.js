import fetch from 'node-fetch';

 const validatePhone = async(num)=>{
    try{
        console.log('validate phone fun triggered')
        const apiKey = "2207268F966D4D53B2CC9BCDAD2F3936";
 
        const apiUrl = `https://api.veriphone.io/v2/verify?phone=${num}&key=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        return data.phone_valid;
    }catch(error){
        console.error("phone validation error:",error);
        return false;
    }
}

export default validatePhone;