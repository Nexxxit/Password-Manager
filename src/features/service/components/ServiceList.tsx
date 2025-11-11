import {Button} from "@/shared/ui/Button/Button.tsx";
import {ServiceListItem} from "@/features/service/components/ServiceListItem.tsx";
import {PasswordVisibilityToggle} from "@/shared/ui/PasswordVisibilityToggle/PasswordVisibilityToggle.tsx";
import {useState} from "react";
import {AddServiceModal} from "@/features/service/components/AddServiceModal.tsx";
import {addServicePersist, readServicesFromAny, removeServicePersist} from "@/shared/lib/storage.ts";
import {ServiceSearch} from "@/features/service/components/ServiceSearch.tsx";
import {mockApi} from "@/shared/lib/mockApi.ts";

type Service = {
    serviceName: string;
    servicePassword: string;
}
type ServiceListProps = {
    services?: Service[];
}

const ServiceList = ({services}: ServiceListProps) => {
    const [serviceModalOpen, setServiceModalOpen] = useState(false);
    const [items, setItems] = useState<Service[]>(() => {
        const persisted = readServicesFromAny();
        if (persisted.length) return persisted;
        return services ?? [];
    });
    const [query, setQuery] = useState<string>('');

    const handleDelete = async (name: string) => {
        await mockApi({ name });
        setItems(prev => prev.filter(s => s.serviceName !== name));
        removeServicePersist(name);
    };

    return (
        <div className={'flex flex-col h-screen'}>
            <div className={'flex items-center h-20 p-4 justify-between'}>
                <Button
                    type={'button'}
                    className={'border-indigo-800 bg-indigo-500 text-white px-4 py-2 hover:bg-indigo-600 hover:border-indigo-900'}
                    onClick={() => {
                        setServiceModalOpen(true);
                    }}
                >
                    Добавить сервис
                </Button>
                <PasswordVisibilityToggle/>
            </div>
            <div className={'px-4'}>
                <ServiceSearch onSearch={setQuery} placeholder={'Поиск сервиса...'} />
            </div>
            <ul className={'flex flex-col p-4 gap-1 overflow-y-auto'}>
                {!items?.length ? (
                    <div className={'text-center text-2xl'}>
                        Список сервисов пуст
                    </div>
                ) : (
                    <>
                        {items
                            .filter(s => s.serviceName.toLowerCase().includes(query.trim().toLowerCase()))
                            .map(service => (
                            <ServiceListItem
                                key={service.serviceName}
                                serviceName={service.serviceName}
                                servicePassword={service.servicePassword}
                                onDelete={handleDelete}
                            />
                        ))}
                        {items.length > 0 && items.filter(s => s.serviceName.toLowerCase().includes(query.trim().toLowerCase())).length === 0 && (
                            <div className={'text-center text-gray-600 py-4'}>По запросу «{query.trim()}» ничего не найдено</div>
                        )}
                    </>
                )}
            </ul>

            <AddServiceModal
                open={serviceModalOpen}
                onClose={() => setServiceModalOpen(false)}
                existingNames={items.map(i => i.serviceName)}
                onAdded={({serviceName, servicePassword}) => {
                    setItems(prev => [...prev, {serviceName, servicePassword}])
                    addServicePersist({serviceName, servicePassword});
                }}
            />

        </div>
    )
}

export {ServiceList}