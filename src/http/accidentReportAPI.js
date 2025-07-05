import { $authHost } from "http";

const createAccidentReportAPI = async (formData) => {
    const { data } = await $authHost.post(`/api/v1/accident_reports`, formData);
    return data
};

export { createAccidentReportAPI };