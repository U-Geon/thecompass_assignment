class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// 404 Not Found 에러 클래스
class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

// 400 Bad Request 에러 클래스
class BadRequestError extends AppError {
    constructor(message = 'Bad request') {
        super(message, 400);
    }
}

module.exports = {
    AppError,
    NotFoundError,
    BadRequestError
};