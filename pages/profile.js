import Link from 'next/link'
import {getSession} from 'next-auth/react'

export default function Profile () {
  return (
    <section className="container mx-auto text-center">
      <h3 className="text-4xl text-bold"> Welcome to your profile </h3>
      <Link href={"/"}>Home</Link>


    </section>
  )
}
//if the user is not logined in they they cant unless they sign in protecting the endpoint
export async function getServerSideProps({req}){
  const session = await getSession({req});
  if(!session){
    return{
      redirect:{
        destination:'/login',
        permanent:false
      }
    }
    //authorize user return session
    return{
      props:{session}
    }
  }
}
