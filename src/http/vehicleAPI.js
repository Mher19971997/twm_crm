import { $authHost } from "http";

const createVehiclePolicy = async (formData) => {
    console.log(formData,"formData");
    
    const { data } = await $authHost.post(`/api/v1/vehicle`, formData);
    return data
};

export { createVehiclePolicy };