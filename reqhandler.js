import DataSchema from './models/model1.js'
import UserSchema from './models/user.js'
import bcrypt from 'bcrypt'


import pkg from 'jsonwebtoken';
const {sign}=pkg

export async function addData(req,res) {
    const {name,phone,image}=req.body
    const user_id=req.user.UserID
    if(!(name&&phone&&image)){
        return res.status(500).send({ msg:"invalid input"});
        
    }
    else{
         DataSchema.create({name,phone,image,user_id}).then(()=>{
          res.status(201).send({msg:"successful"})
    }).catch((error)=>{
        console.log(error);
        
    })
}
}               

export async function getData(req,res) {
    const data=await DataSchema.find()
    res.status(200).send(data)   
    
}

export async function getSingleData(req,res) {
    const {id}=req.params
    await DataSchema.findOne({_id:id}).then((data)=>{
        res.status(200).send(data); 
    }).catch((error)=>{
        res.status(500).send({error:error}); 
    })
}
// export async function updateData(req,res){
//     const {id}=req.params
//     const {name,email}=req.body
//     console.log("JWT_user",req.user);
//     console.log("JWT UserId",req.user.UserID);
    
    
//     // if(!(name&&phone&&image)){
//     //     return res.status(500).send({msg:"Invalid Input"})
//     // }
//     // else{
//     DataSchema.updateOne({ _id: req.user.UserID }, { $set: { name, phone,image } })
//       .then(() => {
//         res.status(200).send({ msg: "successful" });
//       })
//       .catch((error) => {
//         res.status(500).send({ error: error });
//       });
    
    
// }
export async function updateData(req, res) {
  try {
    const { id } = req.params; // data ID
    const { name, phone, image } = req.body;
    const user_id = req.user.UserID; // logged-in user

    const result = await DataSchema.updateOne(
      { _id: id }, // ownership check
      { $set: { name, phone, image } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        msg: "Data not found or unauthorized",
      });
    }

    res.status(200).json({ msg: "Update successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteData(req,res) {
    const {id}=req.params
    DataSchema.deleteOne({ _id: id })
      .then(() => {
        res.status(200).send({ msg: "successful" });
      })
      .catch((error) => {
        res.status(500).send({ error: error });
      });
}


export async function AddUser(req,res){
    const {name,email,pass,cpass}=req.body
     if (!(name && email && pass&&cpass)) {
       return res.status(500).send({ msg: "Invalid Input" });
     }
     else if(pass!=cpass){
        return res.status(500).send({ msg: "Password mismatch" });
     }
     else{
        bcrypt.hash(pass,10).then((hpwd)=>{
            UserSchema.create({name,email,pass:hpwd}).then(()=>{
                res.status(201).send({msg:"successful"})
            })
        }).catch((error)=>{
            console.log(error);
            
        })
     }
     
}
export async function login(req,res) {
    const {email,pass}=req.body
    if(!(email&&pass))
        return res.status(500).send({msg:"fields are empty"})
    const user=await UserSchema.findOne({email})
    if(!user)
        return res.status(500).send({msg:"User does not exist"})
    const success=await bcrypt.compare(pass,user.pass)
    if(success!==true)
        return res.status(500).send({msg:"Incurrect Password"})
    const token=await sign({UserID:user._id},process.env.JWT_TOKEN,{expiresIn:"24h"})
    res.status(200).send({token})
    
    
}

// export async function updateProduct(req,res){
//     const {id}=req.params;
//     const {name,phone,image}=req.body;
//     const UserID=req.user.UserID;
//     DataSchema.updateOne(
//       { _id: id, user_id: UserID },
//       { $set: { name, phone, image } }
//     )
//       .then(() => {
//         res.status(200).send({ msg: " product updated successful" });
//       })
//       .catch((error) => {
//         res.status(500).send({ error: error });
//       });
// }


export function updateProfile(req, res) {
  const { id } = req.params;
  const { name, email } = req.body;

  // const updateData = { name, email };

  // if (password) {
  //   updateData.password = await bcrypt.hash(password, 10);
  // }

  UserSchema.updateOne({ _id: req.user.UserID }, { $set: { name, email } })
    .then(() => {
      res.status(200).send({ msg: "success" });
    })
    .catch((error) => {
      res.status(500).send({ error: error });
    });
}
