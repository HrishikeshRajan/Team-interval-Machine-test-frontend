/* eslint-disable react/prop-types */

const Button = ({children, onClick, ...rest}) => {
  return (
    <button onClick={onClick} {...rest}>{children}</button>
  )
}

export default Button