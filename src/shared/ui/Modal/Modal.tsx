import * as React from "react";
import {createPortal} from "react-dom";

type ModalProps = {
    open: boolean;
    onClose?: () => void;
    closeOnOverlay?: boolean;
    preventEsc?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
type SectionProps = React.HTMLAttributes<HTMLDivElement>;

const ModalRoot = React.forwardRef<HTMLDivElement, ModalProps>(({
                                                                       open,
                                                                       onClose,
                                                                       closeOnOverlay = false,
                                                                       preventEsc = true,
                                                                       children,
                                                                       className = '',
                                                                       ...rest
                                                                   }, ref) => {
    React.useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (preventEsc) {
                    e.preventDefault();
                } else {
                    onClose?.();
                }
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, preventEsc, onClose]);

    if (!open) return null;

    return createPortal(
        <div className={'fixed inset-0 z-50'}>
            <div className={"absolute inset-0 bg-black/50"}
                 onClick={closeOnOverlay ? onClose : undefined}
            />
            <div className={"absolute inset-0 flex items-center justify-center p-4"}>
                <div
                    ref={ref}
                    role={"dialog"}
                    aria-modal={"true"}
                    className={`${className} w-full rounded-2xl bg-white p-6 shadow-xl relative m-0 max-h-[80vh] overflow-auto`}
                    onClick={(e) => e.stopPropagation()}
                    {...rest}
                >
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
});


const ModalHeader: React.FC<SectionProps> = ({className = '', children, ...rest}) => {
    return (
        <div className={`${className}`} {...rest}>
            {children}
        </div>
    )
}

const ModalBody: React.FC<SectionProps> = ({className = '', children, ...rest}) => {
    return (
        <div className={`${className}`} {...rest}>
            {children}
        </div>
    )
}

const ModalFooter: React.FC<SectionProps> = ({className = '', children, ...rest}) => {
    return (
        <div className={`${className}`} {...rest}>
            {children}
        </div>
    )
}

type ModalCompound = React.ForwardRefExoticComponent<
    ModalProps & React.RefAttributes<HTMLDivElement>
> & {
    Header: React.FC<SectionProps>;
    Body: React.FC<SectionProps>;
    Footer: React.FC<SectionProps>;
};

export const Modal = Object.assign(ModalRoot, {
    Header: ModalHeader,
    Body: ModalBody,
    Footer: ModalFooter,
}) as ModalCompound;