import {Button} from "@/shared/ui/Button/Button.tsx";
import {DeleteIcon} from "@/assets/icons/DeleteIcon.tsx";
import {usePasswordVisibility} from "@/app/providers/index.ts";
import {useState} from "react";
import {CopyButton} from "@/shared/ui/CopyButton/CopyButton.tsx";
import {Modal} from "@/shared/ui/Modal/Modal.tsx";

type Service = {
    serviceName: string;
    servicePassword: string;
    onDelete?: (name: string) => Promise<void>;
}

const ServiceListItem = ({serviceName, servicePassword, onDelete}: Service) => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string>('');
    const {visible} = usePasswordVisibility();

    const handleConfirmDelete = async () => {
        if (!onDelete) {
            setConfirmOpen(false);
            return;
        }
        setIsDeleting(true);
        setDeleteError('');
        try {
            await onDelete(serviceName);
            setConfirmOpen(false);
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : 'Не удалось удалить';
            setDeleteError(msg);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <li className={'flex items-center justify-between bg-gray-100/50 px-4 py-2 border border-gray-500 rounded-2xl shadow'}>
            <div className={'flex flex-col gap-4'}>
                <div className={'text-3xl font-bold text-indigo-600'}>{serviceName}</div>
                <div className={'group inline-block font-mono text-2xl font-bold text-blue-400 tracking-wide'}>
                    <span
                        className="group-hover:hidden select-none">{visible ? servicePassword : "*".repeat(servicePassword.length)}</span>
                    <span className="hidden group-hover:inline">{servicePassword}</span>
                </div>
            </div>
            <div className={'flex gap-4'}>
                <CopyButton text={servicePassword}/>
                <Button type={'button'}
                        className={'p-2 text-red-600 hover:bg-gray-400/5 hover:text-red-500 active:bg-gray-400/15 active:text-red-700'}
                        onClick={() => setConfirmOpen(true)}
                >
                    <DeleteIcon/>
                </Button>
            </div>

            <Modal
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                closeOnOverlay={false}
                className={'flex flex-col gap-5 max-w-md'}
            >
                <Modal.Header className={'text-xl font-bold'}>
                    Подтверждение
                </Modal.Header>
                <Modal.Body className={'text-lg'}>
                    Вы уверены что хотите удалить "{serviceName}"?
                    {deleteError && (
                        <div className={'text-red-600 text-sm mt-3'}>{deleteError}</div>
                    )}
                </Modal.Body>
                <Modal.Footer className={'flex items-center justify-between'}>
                    <Button
                        type={'button'}
                        className={'px-3 py-2'}
                        onClick={() => setConfirmOpen(false)}
                        disabled={isDeleting}
                    >
                        Отмена
                    </Button>
                    <Button
                        type={'button'}
                        className={'px-3 py-2 bg-red-600 text-white hover:bg-red-500 disabled:opacity-60'}
                        disabled={isDeleting}
                        onClick={handleConfirmDelete}
                    >
                        {isDeleting ? 'Удаляю…' : 'Удалить'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </li>
    )
}

export {ServiceListItem}