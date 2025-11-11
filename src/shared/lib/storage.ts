export type StoredService = {
    serviceName: string;
    servicePassword: string;
};

const STORAGE_KEY = 'services';

function safeParse<T>(raw: string | null): T | null {
    if (!raw) return null;
    try {
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
}

export function readLocal(): StoredService[] | null {
    return safeParse<StoredService[]>(localStorage.getItem(STORAGE_KEY));
}
export function writeLocal(services: StoredService[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
}

export function readSession(): StoredService[] | null {
    return safeParse<StoredService[]>(sessionStorage.getItem(STORAGE_KEY));
}
export function writeSession(services: StoredService[]): void {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(services));
}

function setCookie(name: string, value: string, maxAgeSec = 60 * 60 * 24 * 30) {
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSec}`;
}
function getCookie(name: string): string | null {
    const match = document.cookie
        .split(';')
        .map(c => c.trim())
        .find(c => c.startsWith(`${encodeURIComponent(name)}=`));
    if (!match) return null;
    const [, val] = match.split('=');
    try {
        return decodeURIComponent(val);
    } catch {
        return val || null;
    }
}
export function readCookie(): StoredService[] | null {
    return safeParse<StoredService[]>(getCookie(STORAGE_KEY));
}
export function writeCookie(services: StoredService[]): void {
    setCookie(STORAGE_KEY, JSON.stringify(services));
}

export function readServicesFromAny(): StoredService[] {
    return (
        readLocal() ||
        readSession() ||
        readCookie() ||
        []
    );
}

export function writeServicesToAll(services: StoredService[]): void {
    writeLocal(services);
    writeSession(services);
    writeCookie(services);
}

export function addServicePersist(service: StoredService): void {
    const current = readServicesFromAny();
    const existsIdx = current.findIndex(s => s.serviceName === service.serviceName);
    if (existsIdx >= 0) {
        current[existsIdx] = service;
    } else {
        current.push(service);
    }
    writeServicesToAll(current);
}

export function removeServicePersist(serviceName: string): void {
    const current = readServicesFromAny();
    const next = current.filter(s => s.serviceName !== serviceName);
    writeServicesToAll(next);
}

