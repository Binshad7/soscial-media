    export class AppError extends Error {
        public readonly statusCode: number;
        constructor(message: string, statusCode: number) {
            console.log('error message : ',message,'status code ', statusCode)
            super(message);
            this.statusCode = statusCode;
            this.name = 'AppError'
            Error.captureStackTrace(this, this.constructor);
        }
    }