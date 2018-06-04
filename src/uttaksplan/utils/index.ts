export * from './validerDatoUtils';

export const preventFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
};
