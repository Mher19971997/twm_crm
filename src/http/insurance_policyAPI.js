import { $authHost } from "http";


const createinsurancePolicy = async (formData) => {
    const { data } = await $authHost.post(`/api/v1/insurance_policy`, formData);
    return data
};

export { createinsurancePolicy };