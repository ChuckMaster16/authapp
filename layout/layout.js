import React from 'react'
import styles from '../styles/Layout.module.css'

function Layout({children}) {
  return (
    <div className="flex h-screen bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md W-3/5 h-3/4 grid lg:grid-cols-2 w-3/4 shadow-xl">
        <div className={styles.imgStyle}>
            <div className={styles.cartoonImg}></div>
            <div className={styles.cloud_one}></div>
            <div className={styles.cloud_two}></div>
        </div>
        <div className="right flex flex-col justify-evenly bg-white rounded-md shadow-xl">
          <div className="text-center py-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
