export const formatError = (error?: string) => {
    return error ? (
        <span
            role="alert"
            style={{
                borderRadius: 4,
                width: '100%',
            }}
        >
            {error}
        </span>
    ) : undefined;
};
