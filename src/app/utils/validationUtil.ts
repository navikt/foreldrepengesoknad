export type FormikFieldErrorRender = (errorMessage: string, fieldName: string) => string;

export const getFieldErrorRenderer = (): FormikFieldErrorRender => (errorMessage: string): string => {
    return errorMessage;
};
