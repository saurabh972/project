const asyncHandler = (requestHendler) => {
        return (req,res,next)=>{
                Promise.resolve(requestHendler(req,res,next)).
                catch((err)=>next(err))
        }
}

export{asyncHandler}; 

// const asyncHandler = () =>{} ; 
// const asyncHandler = () =>{ () => {}} ;
// const asyncHandler = () => async() => {}

// const asyncHandler = (fn) =>async (req ,res ,next)=>{
//         try{
//                 await fn(req ,res ,next)
//         }catch(error){
//                 res.status(error.code||500).json({
//                         succes:false,
//                         message:error.message
//                 })
//         }
// }

