const router=require("express").Router();
const User=require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const auth=require("../Auth/auth");
const Todo=require("../Models/Todo");

//post method(user add DB)

router.post("/add",async(req,res)=>{
  
    try{
    const {email,password,passwordCheck,displayName,role}=req.body;

    if(!email || !password || !passwordCheck || !displayName || !role)
       return res.status(400).json({msg:"Please add information"});
    

    if(password.length<8)
       return res.status(400).json({msg:"password must 8 character"});
    
    if(password !== passwordCheck)
          return res.status(400).json({msg:"password not match"});
    

const extinguser=await User.findOne({email:email});
if(extinguser)
    return res.status(400).json({msg:"This email is already taken"});
    
    if(!displayName) displayName=email;

    const salt=await bcrypt.genSalt();
    const passwordHash=await bcrypt.hash(password,salt);

    const NewUser=new User({
        email,
        password:passwordHash,
        displayName,
        role,
    });
    const data=await NewUser.save();
    res.status(200).json({msg:"Successfully data adding..",value:data});


}
catch(err){
    res.status(500).json({error:err});

}

});
//login process

router.post("/login",async(req,res)=>{
    
try{
        const {email,password}=req.body;

        if(!email||!password)
        return res.status(400).json({msg:"field must be filled"});

        const user=await User.findOne({email:email});
        if(!user)
        return res.status(400).json({msg:"this email not validate"});

        const check=await bcrypt.compare(password,user.password);
        if(!check)
        return res.status(400).json({msg:"Invalid login"});
        
       // const roles=user.role;

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
        res.json({
          token,
        // role:user.role,
         //displayName:user.displayName,

          user: {
            id: user._id,
            displayName: user.displayName,
            role:user.role,
          },
        });
        
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });


 //valided token
 router.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //delete user
  router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
      id: user._id,
      role:user.role,
      displayName: user.displayName,
    });
  });   
    
  //Todo create
  router.post("/todo",async(req,res)=>{
   const tos=await Todo.create(req.body);
   res.status(200).json({success:true,data:tos});
   

  });

  //todo getall app
  router.get("/gettodo",async(req,res)=>{
    try{
    const alls=await Todo.find();
   res.status(200).json({success:true,length:alls.length,data:alls});
   //res.json(alls);
    
    }
    catch(err){
      res.status(400).json({success:false});
    }
  });


  //all delete todos

  router.delete("/all",async(req,res)=>{
    const ans=await Todo.deleteMany();
    res.json("deleteing..");
  });

  //todo delete
  router.delete('/cancel/:id',async(req,res)=>{
    const cancel=await Todo.findByIdAndDelete(req.params.id);

    if(!cancel){
      res.status(400).json({message:"this id not find it!!"});
    }

   // cancel.remove();
    res.status(200).json({success:true,message:"successfully delete"});
  });

//update todo
router.put('/edit/:id',async(req,res)=>{
 
 /* let camp = await Todo.findById(req.params.id);
  if (!camp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  camps = await Todo.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json(camps);
});*/


  console.log(req.body);
  console.log(req.params.id);
  let updatedItem = Todo.findByIdAndUpdate(req.params.id, {$set : {
    title: req.body.title,
  }}, (err, item) => {
    if(err){
      res.status(400).json({
        message: "The Item was not saved",
        errorMessage : err.message
     })
    }else{
      res.status(200).json({
        message: "Item was updated successfully",
        item: item   
     });
    }
  })

});





module.exports=router;