import { $authHost } from "http";
import { $host } from "http";

const getPrefixEndpointForProfile = () => {
    const prefix = localStorage.getItem('prefix')
    return prefix === 'admin' ? 'user' : prefix
}

const getPrefixEndpoint = () => {
    const prefix = localStorage.getItem('prefix')
    return prefix === 'admin' ? 'auth_client' : `auth_${prefix}`
}

const login = async (data) => {
    return await $host.post(`/api/v1/${getPrefixEndpoint()}/login`, data);
};


const getProfile = async () => {
    return await $authHost.get(`/api/v1/${getPrefixEndpointForProfile()}/profile`);
};

const register = async (data) => {
    return await $host.post(`/api/v1/${getPrefixEndpoint()}/register`, data);
};

const checkEmailAdmin = async (data) => {
    return await $host.patch(`/api/v1/${getPrefixEndpoint()}/checkEmail`, data);
};

const verifyEmail = async (data) => {
    return await $host.post(`/api/v1/${getPrefixEndpoint()}/verifyEmail`, data);
};

const newPassword = async (data) => {
    return await $host.put(`/api/v1/${getPrefixEndpoint()}/newPassword`, data);
};

export { login, register, checkEmailAdmin, verifyEmail, newPassword, getProfile };