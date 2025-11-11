export function mockApi<T>(data: T, delay = 1500): Promise<T> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.5) {
                resolve(data);
            } else {
                reject(new Error('Сервер временно недоступен'));
            }
        }, delay);
    });
}