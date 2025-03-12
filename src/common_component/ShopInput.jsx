import React from 'react'
import styles from './ShopButton.module.css'

const ShopInput = ({type='text', size='', ...props}) => {
  return (
    <>
    <input 
    type={type}
    className={
      size === '' ? styles.input : 
      [styles.input, styles.wide].join(' ')
    }
    {...props}


    
    />

    </>
  )
}

export default ShopInput