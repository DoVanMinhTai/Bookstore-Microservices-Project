export interface ErrorDetail {
    title?: string;
    detail?: string;
    fieldError?: { field: string; message: string }[]
}

export class ApiError extends Error{
    
}