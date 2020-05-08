import React from 'react'

const Menu = (props) => {
  return(
    <div>
      <div>Home</div>
      <div>{props.myUserName}'s profile</div>
      <div>About Notice</div>
    </div>
  )
}

export default Menu