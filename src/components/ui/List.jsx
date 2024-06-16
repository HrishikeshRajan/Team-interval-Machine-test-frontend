/* eslint-disable react/prop-types */


export const List = ({ children, ...rest}) => {
    return (
      <ul {...rest}>{children}</ul>
    )
  }

export const ListItem = ({key, children, ...rest}) => {
  return (
    <li key={key} {...rest}>{children}</li>
  )
}

