class ApiError {
    constructor(message) {
        this.name = "ApiError";
        this.message = message;
    }
    name;
    message;
    stack;
}

export { ApiError };