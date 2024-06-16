/* eslint-disable react/prop-types */

const Card = ({children, ...rest}) => {
  return (
    <div {...rest}>{children}</div>
  )
}

export default Card