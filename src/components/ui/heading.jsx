/* eslint-disable react/prop-types */



const HeadingFactory = ({level = 1, children, ...rest}) => {

    if(level === 1) {
        return <h1 {...rest}>{children}</h1>
    } else   if(level === 2) {
        return <h2 {...rest}>{children}</h2>
    }else   if(level === 3) {
        return <h3 {...rest}>{children}</h3>
    }
    else   if(level === 4) {
        return <h4 {...rest}>{children}</h4>
    }
    else   if(level === 5) {
        return <h5 {...rest}>{children}</h5>
    }
    else   if(level === 6) {
        return <h6 {...rest}>{children}</h6>
    }else{

        return null;
    }

}

export default HeadingFactory