import React from 'react'

const IconBtn = ({Icon, isActive, color, children, ...props}) => {
  return (
    <button className={`btn icon-btn ${isActive ? "icon-btn-active": ""} ${color || ""}`} {...props}>
        <span className={`${children != null ? "": "" }`}>
            <Icon />
        </span>
        {children}
    </button>
  )
}

export default IconBtn