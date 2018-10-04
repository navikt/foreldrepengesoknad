export interface ValidatorFailTextIntl {
    intlKey: string;
    values?: { [key: string]: string | number | boolean | Date | null | undefined };
}

export interface Validator {
    test: (value?: any) => boolean;
    failText: string | ValidatorFailTextIntl;
}

export interface SummaryError {
    name: string;
    text: string;
}

export interface ValidationResult {
    name: string;
    tests: any[];
    valid: boolean;
}
