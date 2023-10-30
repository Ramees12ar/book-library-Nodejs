const Error = (message, code, err) => ({
    message,
    code: code || 500,
    error: (err) ? err : undefined
});

export default Error;