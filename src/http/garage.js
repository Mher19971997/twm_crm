import { $authHost } from "http";

const getPrefixEndpoint = () => {
    const prefix = localStorage.getItem('prefix')
    return prefix === 'admin' ? '/admin' : ''
}

const findAllGarages = async (query) => {
    const { data } = await $authHost.get(`/api/v1${getPrefixEndpoint()}/individual?${query}`);
    return data
};

export { findAllGarages };