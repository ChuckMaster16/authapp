import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import  CredentialsProvider from  'next-auth/providers/credentials'
import connectMongo from '../../../database/conn';
import Users from '../../../model/Schema'
import {compare} from 'bcryptjs'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }),
  FacebookProvider({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET
  }),GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  }),
  CredentialsProvider({
   // The name to display on the sign in form (e.g. "Sign in with...")
   name: "Credentials",
  async authorize(credentials,req){
    connectMongo().catch(error =>{error: "Connection Failed!"})
    //check user existance in the db
    const result = await Users.findOne({email:credentials.email})
    if(!result){
      throw new Error('No user found with this email please Register')
    }
    //check the hash password to Login
    const checkPassword = await compare(credentials.password, result.password);
    //if password is incorrect
    if(!checkPassword || result.email !== credentials.email){
      throw new Error("Username or Password doesn't match");
    }
    return result;
  }
}),
    // ...add more providers here
  ],
  secret: process.env.SECRET,
}

export default NextAuth(authOptions)
