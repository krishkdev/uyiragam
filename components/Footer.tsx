import React from 'react'
import { AiFillInstagram, AiOutlineApple, AiOutlineGithub, AiOutlineTwitter, AiOutlineWeiboCircle } from 'react-icons/ai'
import styles from '../styles/Footer.module.css'
const Footer = () => {
  return (
    <div className={styles.footer_container}>
      <p className={styles.icons}>
        <AiFillInstagram />
        <AiOutlineTwitter />
        <AiOutlineGithub />
      </p>
      <p className={styles.bottom}>Developed with ❤️ by V Krishnakumar</p>
    </div>
  )
}

export default Footer