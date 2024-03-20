export const formatError = (error?: string) => {
    return error ? (
        <span
            style={{
                background: 'white',
                marginLeft: -13,
                paddingLeft: 5,
                paddingRight: 5,
                paddingBottom: 2,
                paddingTop: 2,
                borderRadius: 4,
            }}
        >
            {error}
        </span>
    ) : undefined;
};
