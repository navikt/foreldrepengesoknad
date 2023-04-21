import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum OppsummeringFormField {
    harGodkjentOppsummering = 'harGodkjentOppsummering',
}

export interface OppsummeringFormData {
    [OppsummeringFormField.harGodkjentOppsummering]: boolean;
}

const initialOppsummeringValues: OppsummeringFormData = {
    [OppsummeringFormField.harGodkjentOppsummering]: false,
};

export const getInitialOppsummeringValues = (): OppsummeringFormData => {
    return initialOppsummeringValues;
};

export const OppsummeringFormComponents = getTypedFormComponents<OppsummeringFormField, OppsummeringFormData>();
