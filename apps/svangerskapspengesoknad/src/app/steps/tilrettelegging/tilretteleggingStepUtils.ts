import { DelivisTilretteleggingPeriodeType } from 'app/types/DelivisTilretteleggingPeriodeType';
import { TilOgMedDatoType, Tilrettelegging, TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';

export type TilretteleggingFormData = {
    behovForTilretteleggingFom: string;
    type: TilretteleggingstypeOptions;
    delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType | undefined;
    enPeriodeMedTilretteleggingFom: string | undefined;
    enPeriodeMedTilretteleggingStillingsprosent: string | undefined;
    enPeriodeMedTilretteleggingTomType: TilOgMedDatoType | undefined;
    enPeriodeMedTilretteleggingTilbakeIJobbDato: string | undefined;
    tilretteleggingstiltak: string | undefined;
    risikofaktorer: string | undefined;
};

export const mapOmTilretteleggingFormDataToState = (
    id: string,
    values: TilretteleggingFormData,
    tilretteleggingFraState: Tilrettelegging[],
    tilretteleggingForOppdatering: Tilrettelegging,
): Tilrettelegging[] => {
    const harVariertePerioder =
        values.type === TilretteleggingstypeOptions.DELVIS &&
        values.delvisTilretteleggingPeriodeType === DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER;
    const oppdaterteVarierendePerioder = harVariertePerioder ? tilretteleggingForOppdatering?.varierendePerioder : [];
    const oppdatert = {
        ...tilretteleggingForOppdatering,
        varierendePerioder: oppdaterteVarierendePerioder,
        behovForTilretteleggingFom: values.behovForTilretteleggingFom,
        arbeidsforhold: {
            ...tilretteleggingForOppdatering.arbeidsforhold,
        },
        type: values.type,
        enPeriodeMedTilretteleggingFom: harVariertePerioder ? undefined : values.enPeriodeMedTilretteleggingFom,
        enPeriodeMedTilretteleggingStillingsprosent: harVariertePerioder
            ? undefined
            : values.enPeriodeMedTilretteleggingStillingsprosent,
        enPeriodeMedTilretteleggingTomType: harVariertePerioder ? undefined : values.enPeriodeMedTilretteleggingTomType,
        enPeriodeMedTilretteleggingTilbakeIJobbDato: harVariertePerioder
            ? undefined
            : values.enPeriodeMedTilretteleggingTilbakeIJobbDato,
        delvisTilretteleggingPeriodeType: values.delvisTilretteleggingPeriodeType,
        risikofaktorer: values.risikofaktorer,
        tilretteleggingstiltak: values.tilretteleggingstiltak,
    };

    const nyTilretteleggingISøknad = tilretteleggingFraState.map((t) => {
        return t.id === id ? oppdatert : t;
    });
    return nyTilretteleggingISøknad;
};
