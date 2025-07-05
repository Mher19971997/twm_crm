import { $authHost } from "http";

const getAbalyticTotalize = async () => {
    return await $authHost.get(`/api/v1/analytic`);
};

export { getAbalyticTotalize };