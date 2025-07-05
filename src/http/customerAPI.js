import { $authHost } from "http";

const getPrefixEndpoint = () => {
    const prefix = localStorage.getItem('prefix')
    return prefix === 'admin' ? '/admin' : ''
}

const createCustomer = async (formData) => {
    console.log(formData,"formDataformDataformDataformData");
    
    const { data } = await $authHost.post(`/api/v1/customer`, formData);
    return data
};

export { createCustomer };