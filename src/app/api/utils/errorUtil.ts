const extractUUID = (error: any): string | undefined => {
    return error && error.response && error.response.data && error.response.data.uuid
        ? error.response.data.uuid
        : undefined;
};
