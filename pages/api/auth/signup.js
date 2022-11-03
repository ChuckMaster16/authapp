import connectMongo from '../../../database/conn';
import Users from '../../../model/Schema'
import {hash} from 'bcryptjs'


export default async function signupHandler(req, res){
  connectMongo().catch(error => res.json({error:"connection failed"}))

//only post method is accepted
if (req.method === 'POST'){
  if(!req.body)return res.status(404).json({error:"Don't have the form data"});
  const {username, email, password}=req.body;

  //check duplicate userS
  const checkexisting = await Users.findOne({email});
  if (checkexisting) return res.status(422).json({message: "User already Exist please log in"});

  //hashing the password to the database for security
  Users.create({username, email, password:await hash(password, 12)}, function (err, data){
    if(err) return res.status(404).json({err});
    res.status(201).json({status:true, user:data})
  })

}else{
  res.status(500).json({message:'HTTP method not valid only POST Accepted'})
 }
}
