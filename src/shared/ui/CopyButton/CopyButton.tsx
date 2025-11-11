import {CopyIcon} from "@/assets/icons/CopyIcon.tsx";
import {Button} from "@/shared/ui/Button/Button.tsx";
import {useState} from "react";
import {CheckIcon} from "@/assets/icons/CheckIcon.tsx";

type CopyButton = {text: string}

const CopyButton = ({text}: CopyButton) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(String(text));
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (e: Error) {
            console.error('Не удалось скопировать пароль', e)
        }
    }

    return (
        <Button type={'button'}
                className={`p-2 ${copied ? "text-green-600 hover:text-green-400" : "text-blue-500 hover:text-blue-400"}  hover:bg-gray-400/5 active:bg-gray-400/15 active:text-blue-600`}
                onClick={handleCopy}
        >
            {copied ? <CheckIcon/> : <CopyIcon/>}
        </Button>
    )
}

export {CopyButton}
