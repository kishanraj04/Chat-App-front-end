export const isUserPresent = (state,navigate)=>{
    try {
        console.log(state);
        if(state?.isloading){
          navigate("/")
        }else{
            navigate("/home")
        }
    } catch (error) {
        
    }
}