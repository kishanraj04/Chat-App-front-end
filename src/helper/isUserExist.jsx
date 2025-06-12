export const isUserPresent = (state,navigate)=>{
    try {
        if(state?.isloading){
          navigate("/")
        }else{
            navigate("/home")
        }
    } catch (error) {
        
    }
}