import {
    TilretteleggingFormData,
    TilretteleggingFormField,
    TilretteleggingPeriodeType,
} from './tilretteleggingStepFormConfig';
import { Tilrettelegging, TilretteleggingInput, Tilretteleggingstype } from 'app/types/Tilrettelegging';

export const getInitTilretteleggingFormDataValues = (): Readonly<TilretteleggingFormData> => ({
    [TilretteleggingFormField.tilrettelagtArbeidFom]: '',
    [TilretteleggingFormField.tilrettelagtArbeidType]: undefined!,
    [TilretteleggingFormField.tilretteleggingPeriodetype]: undefined!,
    [TilretteleggingFormField.stillingsprosent]: '',
});

export const erTilretteleggingFerdigUtfylt = (tilrettelegging: Tilrettelegging) => {
    return (
        tilrettelegging.behovForTilretteleggingFom !== undefined &&
        tilrettelegging.tilrettelegginger &&
        tilrettelegging.tilrettelegginger.length !== 0
    );
};

export const getTilretteleggingInitialValues = (tilrettelegging: Tilrettelegging): TilretteleggingFormData => {
    const initValues = getInitTilretteleggingFormDataValues();
    if (!erTilretteleggingFerdigUtfylt(tilrettelegging)) {
        return initValues;
    } else {
        const antallPerioder = tilrettelegging.tilrettelegginger.length;
        //TODO: fix for flere perioder
        const førsteperiode = tilrettelegging.tilrettelegginger[0];
        const values = {
            tilrettelagtArbeidFom: tilrettelegging.behovForTilretteleggingFom!,
            tilrettelagtArbeidType: førsteperiode.type ? førsteperiode.type : initValues.tilrettelagtArbeidType,
            tilretteleggingPeriodetype:
                antallPerioder === 1 ? TilretteleggingPeriodeType.EN : TilretteleggingPeriodeType.VARIERT,
            stillingsprosent:
                førsteperiode.type === Tilretteleggingstype.DELVIS
                    ? førsteperiode.stillingsprosent!.toString()
                    : initValues.stillingsprosent,
        };
        console.log('init: ', values);
        return values;
    }
};

//TODO: må utvide denne for case med flere perioder og riktig fom på perioden
const getTilretteleggingsPerioderFromInput = (values: TilretteleggingFormData): TilretteleggingInput[] => {
    return [
        {
            type: values.tilrettelagtArbeidType,
            fom: values.tilrettelagtArbeidFom,
            stillingsprosent:
                values.tilrettelagtArbeidType === Tilretteleggingstype.DELVIS
                    ? parseFloat(values.stillingsprosent)
                    : undefined,
        },
    ];
};

export const mapOmTilretteleggingFormDataToState = (
    id: string,
    values: Partial<TilretteleggingFormData>,
    tilretteleggingFraState: Tilrettelegging[]
): Tilrettelegging[] => {
    const tilretteleggingForOppdatering = tilretteleggingFraState.find((t) => t.id === id);
    const tilrettelegginsperioder = getTilretteleggingsPerioderFromInput(values as TilretteleggingFormData);
    const oppdatert = {
        ...tilretteleggingForOppdatering,
        behovForTilretteleggingFom: values.tilrettelagtArbeidFom,
        tilrettelegginger: tilrettelegginsperioder,
    } as Tilrettelegging;
    const nyTilretteleggingISøknad = tilretteleggingFraState.map((t) => {
        return t.id === id ? oppdatert : t;
    });
    return nyTilretteleggingISøknad;
};
