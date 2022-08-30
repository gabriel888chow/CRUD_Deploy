export function createApiResponse(message, data) {
    return {
        success: true,
        message,
        data
    };
}