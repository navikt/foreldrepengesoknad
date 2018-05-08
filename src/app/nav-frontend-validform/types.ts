export interface ValidatorProps {
    name?: string;
    validators?: any[];
}

export interface InputProps {
    label: string | React.ReactNode;
}

export interface Validator {
    test: (value: any) => boolean;
    failText: string;
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

export type ValidComponentProps = ValidatorProps & InputProps;
