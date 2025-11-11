export type AddServiceErrors = {
    serviceName?: string;
    servicePassword?: string;
    general?: string;
}

export function validateServicePayload(params: {
    serviceName: string;
    servicePassword: string;
    existingNames: string[];
}): AddServiceErrors {
    const {serviceName, servicePassword, existingNames} = params;
    const errors: AddServiceErrors = {};
    if(!serviceName) errors.serviceName = 'Введите название сервиса';
    if(!servicePassword) errors.servicePassword = 'Введите пароль';
    if(existingNames.includes(serviceName)) errors.serviceName = 'Такой сервис уже существует';
    return errors;
}