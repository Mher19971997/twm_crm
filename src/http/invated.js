import { $authHost } from "http";

const getPrefixEndpoint = () => {
    const prefix = localStorage.getItem('prefix')
    return prefix
}

const findAllInvated = async (query) => {
    const { data } = await $authHost.get(`/api/v1/tour_invite?${query}`);
    return data
};

const invatedGarageOrOrganization = async (uuid) => {
    const prefix = localStorage.getItem('prefix')
    const { data } = await $authHost.patch(`/api/v1/tour_invite/${prefix === 'garage' ? "organization" : "garage"}/${uuid}`);
    return data
};

export { findAllInvated, invatedGarageOrOrganization };