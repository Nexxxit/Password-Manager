import {useEffect, useRef, useState} from "react";
import {Input} from "@/shared/ui/Input/Input.tsx";
import {SearchIcon} from "@/assets/icons/SearchIcon.tsx";

type ServiceSearchProps = {
    onSearch: (query: string) => void;
    delay?: number;
    initialQuery?: string;
    placeholder?: string;
    className?: string;
};

const ServiceSearch = ({
    onSearch,
    delay = 300,
    initialQuery = "",
    placeholder = "Поиск по названию сервиса",
    className = "",
}: ServiceSearchProps) => {
    const [value, setValue] = useState<string>(initialQuery);

    const timerRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (timerRef.current) window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
            onSearch(value.trim());
        }, delay);
        return () => {
            if (timerRef.current) window.clearTimeout(timerRef.current);
        };
    }, [value, delay, onSearch]);

    return (
        <div className={className}>
            <div className={'relative'}>
                <SearchIcon className={'absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'} />
                <Input
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                    placeholder={placeholder}
                    className={'pl-10'}
                />
            </div>
        </div>
    );
};

export {ServiceSearch};

