export interface ValidatorFailTextIntl {
    intlKey: string;
    values?: { [key: string]: string | number | boolean | Date | null | undefined };
}

export type ValidatorFailText = string | ValidatorFailTextIntl;

export interface Validator {
    test: (value?: any) => boolean;
    failText: ValidatorFailText;
}

export interface SummaryError<T = any> {
    name: string;
    text: ValidatorFailText;
    payload?: T;
}

export interface ValidationTestVerdict {
    verdict: boolean;
    failText: ValidatorFailText;
}

export interface ValidationResult {
    name: string;
    tests: ValidationTestVerdict[];
    valid: boolean;
}
