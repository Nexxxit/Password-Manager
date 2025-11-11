import {Modal} from "@/shared/ui/Modal/Modal.tsx";
import {Button} from "@/shared/ui/Button/Button.tsx";
import {CloseLargeIcon} from "@/assets/icons/CloseLargeIcon.tsx";
import {PasswordsIcon} from "@/assets/icons/PasswordsIcon.tsx";
import {Input} from "@/shared/ui/Input/Input.tsx";
import {useEffect, useState} from "react";
import {type AddServiceErrors, validateServicePayload} from "@/features/service/lib/validators.tsx";
import {mockApi} from "@/shared/lib/mockApi.ts";
import {PasswordGeneratorIcon} from "@/assets/icons/PasswordGeneratorIcon.tsx";
import {PasswordGenerator} from "@/features/passwordGenerator/components/PasswordGenerator.tsx";

type Props = {
    open: boolean;
    onClose: () => void;
    existingNames: string[];
    onAdded: (data: { serviceName: string; servicePassword: string }) => void;
}

export const AddServiceModal = ({open, onClose, onAdded, existingNames}: Props) => {
    const [errors, setErrors] = useState<AddServiceErrors>({})
    const [isSubmitting, setSubmitting] = useState(false);
    const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
    const [serviceName, setServiceName] = useState<string>('');
    const [servicePassword, setServicePassword] = useState<string>('');

    useEffect(() => {
        if (!open) {
            setServiceName('');
            setServicePassword('');
            setErrors({});
            setShowPasswordGenerator(false);
        }
    }, [open]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({})
        setSubmitting(true);
        try {
            const nextErrors = validateServicePayload({serviceName, servicePassword, existingNames});
            if (Object.keys(nextErrors).length) {
                setErrors(nextErrors);
                return;
            }

            await mockApi({serviceName, servicePassword});
            onAdded({serviceName, servicePassword});
            onClose();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Ошибка сервера';
            setErrors({general: message});
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeOnOverlay={false}
            className={'flex flex-col gap-5 max-w-xl'}
        >
            <Modal.Header className={'flex items-center justify-between text-xl font-bold'}>
                Добавление сервиса
                <Button
                    type={'button'}
                    onClick={onClose}
                    className={'border-none shadow-none active:shadow-none'}
                >
                    <CloseLargeIcon/>
                </Button>
            </Modal.Header>
            <Modal.Body className={'text-lg'}>
                <form id={'add-service-form'} className={'flex flex-col gap-3'} onSubmit={handleSubmit}>
                    <div className={'flex flex-col gap-1'}>
                        <label htmlFor={'service-name'}>Название сервиса</label>
                        <Input
                            id={'service-name'}
                            name={'serviceName'}
                            placeholder={'Netflix'}
                            disabled={isSubmitting}
                            value={serviceName}
                            onChange={(e) => setServiceName(e.currentTarget.value)}
                        />
                        {errors?.serviceName && (
                            <div className={'text-red-600 text-sm mt-1'}>{errors.serviceName}</div>
                        )}
                    </div>
                    <div className={'flex flex-col gap-1'}>
                        <label htmlFor={'service-password'}>Пароль</label>
                        <div className={'relative'}>
                            <PasswordsIcon className={'absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600'} width={20} height={20} />
                            <Input
                                id={'service-password'}
                                name={'servicePassword'}
                                placeholder={'Ваш пароль'}
                                disabled={isSubmitting}
                                value={servicePassword}
                                onChange={(e) => setServicePassword(e.currentTarget.value)}
                                className={'pl-10'}
                            />
                        </div>
                        {errors?.servicePassword && (
                            <div className={'text-red-600 text-sm mt-1'}>{errors.servicePassword}</div>
                        )}
                    </div>
                    {errors?.general && (
                        <div className={'text-red-600 text-sm'}>{errors.general}</div>
                    )}
                </form>
                {showPasswordGenerator && (
                    <PasswordGenerator
                        onGenerated={(pwd) => {
                            setServicePassword(pwd);
                        }}
                    />
                )}
            </Modal.Body>
            <Modal.Footer className={'flex items-center justify-between gap-5'}>
                {showPasswordGenerator ? (
                    <Button
                        type={'button'}
                        className={'px-3 py-2 bg-blue-500 hover:bg-blue-400 active:bg-blue-600'}
                        onClick={() => setShowPasswordGenerator(false)}
                    >
                        Назад
                    </Button>
                ) : (
                    <div className={'flex w-full justify-between'}>
                        <Button
                            type={'button'}
                            className={'px-3 py-2'}
                            onClick={onClose}
                        >
                            Отмена
                        </Button>
                        <Button
                            type={'button'}
                            className={'px-3 py-2 flex items-center gap-1 bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 text-white'}
                            onClick={() => setShowPasswordGenerator(true)}
                        >
                            Сгенерировать пароль <PasswordGeneratorIcon/>
                        </Button>
                    </div>
                )}
                <Button
                    type={'submit'}
                    form={'add-service-form'}
                    className={'px-3 py-2 bg-red-600 text-white hover:bg-red-500 disabled:opacity-60'}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Добавляю…' : 'Добавить'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}