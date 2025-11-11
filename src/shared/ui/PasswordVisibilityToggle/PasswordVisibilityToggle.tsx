import {Button} from "@/shared/ui/Button/Button.tsx";
import {EyeSlashIcon} from "@/assets/icons/EyeSlashIcon.tsx";
import {EyeIcon} from "@/assets/icons/EyeIcon.tsx";
import {usePasswordVisibility} from "@/app/providers/index.ts";

export function PasswordVisibilityToggle() {
    const {visible, toggle} = usePasswordVisibility();
    return (
        <Button
            type={'button'}
            onClick={toggle}
            title={visible ? 'Скрыть все пароли' : 'Показать все пароли'}
            className={'rounded-sm p-2'}
        >
            {visible ? (<EyeSlashIcon/>) : (<EyeIcon/>)}
        </Button>
    )
}