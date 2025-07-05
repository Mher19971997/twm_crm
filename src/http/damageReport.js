import { $authHost } from "http";

const createDamageReport = async (formData) => {
    const { data } = await $authHost.post(`/api/v1/damage_report`, formData);
    return data
};

export { createDamageReport };