import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';

export enum OppsummeringFormField {
    harGodkjentOppsummering = 'harGodkjentOppsummering',
}

export interface OppsummeringFormData {
    [OppsummeringFormField.harGodkjentOppsummering]: YesOrNo;
}

const initialOppsummeringValues: OppsummeringFormData = {
    [OppsummeringFormField.harGodkjentOppsummering]: YesOrNo.UNANSWERED,
};

export const getInitialOppsummeringValues = (): OppsummeringFormData => {
    return initialOppsummeringValues;
};

export const OppsummeringFormComponents = getTypedFormComponents<OppsummeringFormField, OppsummeringFormData, string>();
