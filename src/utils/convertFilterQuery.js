export const convertFilterQuery = (queryObj) => {
    return Object.keys(queryObj).reduce((acc, key) => {
        acc[key] = { iLike: `%${queryObj[key]}%` };
        return acc;
    }, {});
}