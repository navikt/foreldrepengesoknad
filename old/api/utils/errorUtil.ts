const isNestedException = (errorMessage: string) => {
    return errorMessage.includes('nested exception');
};

export const extractUUID = (error: any): string | undefined => {
    if (error && error.response && error.response.data.message && isNestedException(error.response.data.message)) {
        const pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;
        const errorMessage: string = error.response.data.message;
        const uuid = errorMessage.match(pattern)?.toString();

        return uuid;
    }

    return error && error.response && error.response.data && error.response.data.uuid
        ? error.response.data.uuid
        : undefined;
};
