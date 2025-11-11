type InputProps = React.ComponentPropsWithoutRef<'input'>

const Input = ({type = 'text', className = '', ...rest}: InputProps) => {
    return (
        <input type={type} className={`${className} w-full p-1 border border-indigo-600 rounded-xl focus:outline-blue-400`} {...rest} />
    )
}

export {Input}