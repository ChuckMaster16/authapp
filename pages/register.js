import React, {useState} from 'react'
import Head from 'next/head'
import Layout from '../layout/layout';
import styles from '../styles/Layout.module.css';
import Link from 'next/link';
import style from '../styles/Form.module.css'
import Image from 'next/image'
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useFormik } from 'formik';
import {registerValidate} from '../lib/validate'
import {useRouter} from 'next/router'


function Register() {
    const[show, setShow]=useState({password:false, cpassword:false});
    const route = useRouter();

    const formik = useFormik({
       initialValues: {
         username: '',
         email:'',
         password:'',
         cpassword:'',
       },
       validate: registerValidate,
       onSubmit
     })

       async function onSubmit(values){
         const options = {
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body:JSON.stringify(values)
         }
         await fetch('http://localhost:3000/api/auth/signup',options)
         .then(res=>res.json())
         .then((data)=>{
           if(data)route.push('http://localhost:3000')
         })
       }

  return (
    <Layout>
    <Head>
    <title>Register</title>
    </Head>

      <section className="w-3/4 mx-auto flex flex-col gab-10">
        <div className="title">
          <h1 className='text-gray-800 text-4xl font-bold py-4'> Register</h1>
          <p className="w-3/4 mx-auto text-gray-400">Hire the best talent the world has to offer</p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className={style.input_group}>
            <input
            {...formik.getFieldProps("username")}
            type="text"
            name="username"
            placeholder="User name"
            className={style.input_text}
            />
            <span className="icon flex items-center px-4"><PersonOutlineOutlinedIcon /></span>
          </div>
          {formik.errors.username && formik.touched.username ? <span className="bg-orange-100 rounded-2xl shadow-sm text-rose-500">{formik.errors.username}</span>: <></>}
          <div className={style.input_group}>
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
            type={`${show.password ? "text":"password"}`}
            name="password"
            placeholder="Enter password"
            className={style.input_text}
            />
            <span onClick={()=> setShow({...show, password:!show.password})} className="icon flex items-center px-4 cursor-pointer hover:text-[#6366f1]"><FingerprintIcon/></span>
          </div>
          {formik.errors.password && formik.touched.password ? <span className="bg-orange-100 rounded-2xl shadow-sm text-rose-500">{formik.errors.password}</span>: <></>}
          <div className={style.input_group}>
            <input
            {...formik.getFieldProps("cpassword")}
            type={`${show.cpassword ? "text":"password"}`}
            name="cpassword"
            placeholder="Confirm password"
            className={style.input_text}
            />
            <span onClick={()=> setShow({...show, cpassword:!show.cpassword})} className="icon flex items-center px-4 cursor-pointer hover:text-[#6366f1]"><FingerprintIcon/></span>
          </div>
          {formik.errors.cpassword && formik.touched.cpassword ? <span className="bg-orange-100 rounded-2xl shadow-sm text-rose-500">{formik.errors.cpassword}</span>: <></>}
          {/*login btns*/}
          <div className="input_btn">
            <button type="submit" className={style.button}>Sign Up</button>
          </div>

        </form>
        <p className="text-center text-gray-400 pt-10">Already have and account? <Link className="text-blue-500" href={"/login"}>Sign In</Link></p>

        <div className=""></div>

       </section>
    </Layout>
  )
}

export default Register
