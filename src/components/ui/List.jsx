/* eslint-disable react/prop-types */


export const List = ({ children, ...rest}) => {
    return (
      <ul {...rest}>{children}</ul>
    )
  }

export const ListItem = ({children, ...rest}) => {
  return (
    <li {...rest}>{children}</li>
  )
}

