export const formatError = (error?: string) => {
    return error ? (
        <span
            role="alert"
            style={{
                paddingLeft: 5,
                paddingRight: 5,
                paddingBottom: 5,
                paddingTop: 5,
                borderRadius: 4,
                width: '100%',
            }}
        >
            {error}
        </span>
    ) : undefined;
};
