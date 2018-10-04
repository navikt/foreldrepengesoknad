export interface ValidatorFailTextIntl {
    intlKey: string;
    values?: { [key: string]: string | number | boolean | Date | null | undefined };
}

export type ValidatorFailText = string | ValidatorFailTextIntl;

export interface Validator {
    test: (value?: any) => boolean;
    failText: ValidatorFailText;
}

export interface SummaryError {
    name: string;
    text: ValidatorFailText;
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
