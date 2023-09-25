import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { UtenlandsoppholdInput } from 'app/types/InformasjonOmUtenlandsopphold';
import { getUferdigBostedUtlandInput } from './boIUtlandetFormUtils';

export enum BoIUtlandetFormField {
    bostedIUtlandet = 'bostedIUtlandet',
}

export interface BoIUtlandetFormData {
    [BoIUtlandetFormField.bostedIUtlandet]: UtenlandsoppholdInput[];
}

export const initialBoIUtlandetFormData: BoIUtlandetFormData = {
    [BoIUtlandetFormField.bostedIUtlandet]: [getUferdigBostedUtlandInput()],
};

export const BoIUtlandetFormComponents = getTypedFormComponents<BoIUtlandetFormField | string, BoIUtlandetFormData>();
