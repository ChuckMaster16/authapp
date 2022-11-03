import React, {useState} from 'react';
import Head from 'next/head';
import Layout from '../layout/layout';
import styles from '../styles/Layout.module.css';
import Link from 'next/link';
import style from '../styles/Form.module.css'
import Image from 'next/image'
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useSession, signIn, signOut } from "next-auth/react"
import { useFormik } from 'formik';
import login_validate from '../lib/validate'
import {useRouter} from 'next/router'


function Login() {

  const[show, setShow]=useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  //the formik Hook
  const formik = useFormik({
     initialValues: {
       email: '',
       password:'',
     },
     validate:login_validate,
     onSubmit
   })
   //console.log(formik.errors);
   //signin with mongoose db
     async function onSubmit(values){
       const status = await signIn("credentials", {
         redirect: false,
         email:values.email,
         password:values.password,
         callbackUrl:"/"
       })
       console.log(status);
       if(status.ok)router.push(status.url)
     }
//calling the google login from the login page
async function handleGoogleSignin(){
  signIn('google', {callbackUrl: "https://authapp-xi.vercel.app"})
}
//calling the facebook login from the login page
async function handleFacebookSignin(){
  signIn('facebook', {callbackUrl: "https://authapp-xi.vercel.app"})
}
//calling the github login from the login page
async function handlegithubSignin(){
  signIn('github', {callbackUrl: "https://authapp-xi.vercel.app"})
}


  return (
    <Layout>
    <Head>
     <title>Login</title>
    </Head>

    <section className="w-3/4 mx-auto flex flex-col gab-10">
      <div className="title">
        <h1 className='text-gray-800 text-4xl font-bold py-4'> Explore</h1>
        <p className="w-3/4 mx-auto text-gray-400">Hire the best talent the world has to offer</p>
      </div>
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <div className={`${style.input_group} ${formik.errors.email && formik.touched.email ? "border-rose-700": "" }`}>
          <input
          {...formik.getFieldProps("email")}
          type="email"
          name="email"
          placeholder="Email"
          className={style.input_text}
          />
          <span className="icon flex items-center px-4"><AlternateEmailIcon/></span>

        </div>
        {formik.errors.email && formik.touched.email ? <span className="bg-orange-100 rounded-2xl shadow-sm text-rose-500">{formik.errors.email}</span>: <></>}
        <div className={style.input_group}>
          <input
          {...formik.getFieldProps("password")}
          type={`${show ? "text":"password"}`}
          name="password"
          placeholder="Enter password"
          className={style.input_text}
          />
          <span onClick={()=> setShow(!show)} className="icon flex items-center px-4 cursor-pointer hover:text-[#6366f1]"><FingerprintIcon/></span>

        </div>
        {formik.errors.password && formik.touched.password ? <span className="bg-orange-100 rounded-2xl shadow-sm text-rose-500">{formik.errors.password}</span>: <></>}
        {/*login btns*/}
        <div className="input_btn">
          <button  type="submit" className={style.button}>Login</button>
        </div>
        <hr/>
        <div className="input_btn">
          <button onClick={handleGoogleSignin} type="button" className={style.button_custom}>Sign In with Google <Image src={"/assets/google.png"} width={30} height={30}></Image></button>
        </div>
        <div className="input_btn">
          <button onClick={handleFacebookSignin} type="button" className={style.button_custom}>Sign In with Facebook <Image src={"/assets/facebook.png"} width={30} height={30}></Image></button>
        </div>
        <div className="input_btn">
          <button onClick={handlegithubSignin} type="button" className={style.button_custom}>Sign In with GitHub <Image src={"/assets/github.png"} width={30} height={30}></Image></button>
        </div>
      </form>
      <p className="text-center text-gray-400">Dont have and account yet? <Link className="text-blue-500" href={"/register"}>Signup</Link></p>

      <div className=""></div>

     </section>
    </Layout>
  )
}

export default Login
