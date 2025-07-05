import { $authHost } from "http";

const getPrefixEndpoint = () => {
    const prefix = localStorage.getItem('prefix')
    return prefix === 'admin' ? '' : '/' + prefix
}

const findAllContracts = async (query) => {
    const { data } = await $authHost.get(`/api/v1/contract${getPrefixEndpoint()}?${query}`);
    return data
};

export { findAllContracts };