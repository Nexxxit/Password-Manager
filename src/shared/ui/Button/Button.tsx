type ButtonProps = React.ComponentPropsWithoutRef<'button'>

const Button = ({children, className, ...rest}: ButtonProps) => {
    return (
        <button className={`${className} border rounded-sm shadow-md hover:cursor-pointer transition-all duration-150 ease-out will-change-transform active:translate-y-0.25 active:shadow-xl`} {...rest}>
            {children}
        </button>
    )
}

export {Button}