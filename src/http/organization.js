import { $authHost } from "http";

const getPrefixEndpoint = () => {
    const prefix = localStorage.getItem('prefix')
    return prefix === 'admin' ? '/admin/organization' : prefix === 'garage' ? "/garage_organization" : '/organization'
}

const findAllOrganizations = async (query) => {
    const { data } = await $authHost.get(`/api/v1${getPrefixEndpoint()}?${query}`);
    return data
};

export { findAllOrganizations };