/* eslint-disable react/prop-types */

const Image = ({src,...rest}) => {
  return (
    <img src={src} {...rest}/>
  )
}

export default Image