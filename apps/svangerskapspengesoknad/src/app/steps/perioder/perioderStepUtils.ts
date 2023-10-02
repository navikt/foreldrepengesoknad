import { Tilrettelegging, Tilretteleggingstype } from 'app/types/Tilrettelegging';
import { PerioderFormData, PerioderFormField } from './perioderStepFormConfig';

export const getInitPerioderFormDataValues = (): Readonly<PerioderFormData> => ({
    [PerioderFormField.variertePerioder]: [
        {
            type: Tilretteleggingstype.DELVIS,
            fom: '',
            tom: '',
            stillingsprosent: '',
            tomType: undefined!,
        },
    ],
});

export const getPerioderInitialValues = (tilrettelegging: Tilrettelegging): PerioderFormData => {
    const initValues = getInitPerioderFormDataValues();
    return {
        variertePerioder:
            tilrettelegging.variertePerioder && tilrettelegging.variertePerioder.length > 0
                ? tilrettelegging.variertePerioder
                : initValues.variertePerioder,
    };
};

export const mapPerioderFormDataToState = (
    id: string,
    values: Partial<PerioderFormData>,
    tilretteleggingFraState: Tilrettelegging[],
): Tilrettelegging[] => {
    const tilretteleggingForOppdatering = tilretteleggingFraState.find((t) => t.id === id);
    const oppdatert = {
        ...tilretteleggingForOppdatering,
        variertePerioder: values.variertePerioder,
    } as Tilrettelegging;

    const nyTilretteleggingISøknad = tilretteleggingFraState.map((t) => {
        return t.id === id ? oppdatert : t;
    });
    return nyTilretteleggingISøknad;
};
