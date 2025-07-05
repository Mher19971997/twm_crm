import { $authHost } from "http";

const findAllAccident = async (query) => {
    const { data } = await $authHost.get(`/api/v1/accident?${query}`);
    return data
};

export { findAllAccident };