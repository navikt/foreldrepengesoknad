import { VelgArbeidFormData } from './velgArbeidFormConfig';
import { Søker } from 'app/types/Søker';
import { intlUtils } from '@navikt/fp-common';
import Tilrettelegging, { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import Arbeidsforhold, { UnikArbeidsforhold } from 'app/types/Arbeidsforhold';
import { getUnikeArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import { IntlShape } from 'react-intl';
import { EgenNæring, egenNæringId } from 'app/types/EgenNæring';
import { Frilans, frilansId } from 'app/types/Frilans';

export const getInitialVelgArbeidFormValues = (tilretteleggingsBehov: Tilrettelegging[]): VelgArbeidFormData => {
    return {
        arbeidMedTilrettelegging: tilretteleggingsBehov.map((t) => t.id),
    };
};

export const getNæringTilretteleggingOption = (
    tilrettelegginger: Tilrettelegging[],
    næring: EgenNæring,
): Tilrettelegging => {
    const næringTilretteleggingFraState = tilrettelegginger.find((t) => t.id == egenNæringId);
    return {
        id: egenNæringId,
        arbeidsforhold: {
            arbeidsgiverId: næring.organisasjonsnummer || `${næring.navnPåNæringen}${næring.registrertILand}`,
            type: Arbeidsforholdstype.SELVSTENDIG,
            navn: næring.navnPåNæringen,
            startdato: næring.tidsperiode.fom,
            sluttdato: næring.tidsperiode.tom,
            stillinger: [{ fom: næring.tidsperiode.fom, tom: næring.tidsperiode.tom, stillingsprosent: 100 }],
        },
        vedlegg: næringTilretteleggingFraState?.vedlegg || [],
        behovForTilretteleggingFom: næringTilretteleggingFraState?.behovForTilretteleggingFom || undefined!,
        varierendePerioder: næringTilretteleggingFraState?.varierendePerioder || [],
        type: næringTilretteleggingFraState?.type || undefined!,
        enPeriodeMedTilretteleggingFom: næringTilretteleggingFraState?.enPeriodeMedTilretteleggingFom || undefined,
        enPeriodeMedTilretteleggingStillingsprosent:
            næringTilretteleggingFraState?.enPeriodeMedTilretteleggingStillingsprosent || undefined,
        delvisTilretteleggingPeriodeType: næringTilretteleggingFraState?.delvisTilretteleggingPeriodeType || undefined,
        risikofaktorer: næringTilretteleggingFraState?.risikofaktorer || undefined,
        tilretteleggingstiltak: næringTilretteleggingFraState?.tilretteleggingstiltak || undefined,
        enPeriodeMedTilretteleggingTomType:
            næringTilretteleggingFraState?.enPeriodeMedTilretteleggingTomType || undefined,
        enPeriodeMedTilretteleggingTilbakeIJobbDato:
            næringTilretteleggingFraState?.enPeriodeMedTilretteleggingTilbakeIJobbDato || undefined,
    };
};

export const getFrilansTilretteleggingOption = (
    tilrettelegginger: Tilrettelegging[],
    frilans: Frilans,
): Tilrettelegging => {
    const frilansTilretteleggingFraState = tilrettelegginger.find((t) => t.id == frilansId);
    return {
        id: frilansId,
        arbeidsforhold: {
            arbeidsgiverId: frilansId,
            navn: frilansId,
            type: Arbeidsforholdstype.FRILANSER,
            startdato: frilans.oppstart,
            stillinger: [{ fom: frilans.oppstart, tom: undefined, stillingsprosent: 100 }],
        },
        vedlegg: frilansTilretteleggingFraState?.vedlegg || [],
        behovForTilretteleggingFom: frilansTilretteleggingFraState?.behovForTilretteleggingFom || undefined!,
        varierendePerioder: frilansTilretteleggingFraState?.varierendePerioder || [],
        type: frilansTilretteleggingFraState?.type || undefined!,
        enPeriodeMedTilretteleggingFom: frilansTilretteleggingFraState?.enPeriodeMedTilretteleggingFom || undefined,
        enPeriodeMedTilretteleggingStillingsprosent:
            frilansTilretteleggingFraState?.enPeriodeMedTilretteleggingStillingsprosent || undefined,
        delvisTilretteleggingPeriodeType: frilansTilretteleggingFraState?.delvisTilretteleggingPeriodeType || undefined,
        risikofaktorer: frilansTilretteleggingFraState?.risikofaktorer || undefined,
        tilretteleggingstiltak: frilansTilretteleggingFraState?.tilretteleggingstiltak || undefined,
        enPeriodeMedTilretteleggingTomType:
            frilansTilretteleggingFraState?.enPeriodeMedTilretteleggingTomType || undefined,
        enPeriodeMedTilretteleggingTilbakeIJobbDato:
            frilansTilretteleggingFraState?.enPeriodeMedTilretteleggingTilbakeIJobbDato || undefined,
    };
};

export const getArbeidsforholdTilretteleggingOptions = (
    arbeidsforhold: Arbeidsforhold[],
    tilrettelegginger: Tilrettelegging[],
    termindato: string,
    intl: IntlShape,
): Tilrettelegging[] => {
    const unikeArbeidsforhold = getUnikeArbeidsforhold(arbeidsforhold, termindato);
    const arbeidsforholdOptions = unikeArbeidsforhold.map((forhold: UnikArbeidsforhold) => {
        const tilretteleggingFraState = tilrettelegginger.find((t) => t.id == forhold.id);
        return {
            id: tilretteleggingFraState?.id ?? forhold.id,
            arbeidsforhold: tilretteleggingFraState?.arbeidsforhold ?? {
                arbeidsgiverId: forhold.arbeidsgiverId,
                type:
                    forhold.arbeidsgiverIdType === 'orgnr'
                        ? Arbeidsforholdstype.VIRKSOMHET
                        : Arbeidsforholdstype.PRIVAT,
                navn:
                    forhold.arbeidsgiverIdType === 'orgnr' || forhold.arbeidsgiverNavn
                        ? forhold.arbeidsgiverNavn
                        : intlUtils(intl, 'privat.arbeidsgiver'),
                stillinger: forhold.stillinger,
                startdato: forhold.fom,
                sluttdato: forhold.tom,
            },
            varierendePerioder: tilretteleggingFraState?.varierendePerioder || [],
            vedlegg: tilretteleggingFraState?.vedlegg || [],
            behovForTilretteleggingFom: tilretteleggingFraState?.behovForTilretteleggingFom || undefined!,
            type: tilretteleggingFraState?.type || undefined!,
            enPeriodeMedTilretteleggingFom: tilretteleggingFraState?.enPeriodeMedTilretteleggingFom || undefined,
            enPeriodeMedTilretteleggingStillingsprosent:
                tilretteleggingFraState?.enPeriodeMedTilretteleggingStillingsprosent || undefined,
            delvisTilretteleggingPeriodeType: tilretteleggingFraState?.delvisTilretteleggingPeriodeType || undefined,
            enPeriodeMedTilretteleggingTomType:
                tilretteleggingFraState?.enPeriodeMedTilretteleggingTomType || undefined,
            enPeriodeMedTilretteleggingTilbakeIJobbDato:
                tilretteleggingFraState?.enPeriodeMedTilretteleggingTilbakeIJobbDato || undefined,
        };
    });
    return arbeidsforholdOptions;
};

export const mapArbeidsforholdToVelgArbeidOptions = (
    tilrettelegginger: Tilrettelegging[],
    søker: Søker,
    arbeidsforhold: Arbeidsforhold[],
    termindato: string,
    intl: IntlShape,
): Tilrettelegging[] => {
    const harNæring = søker.harJobbetSomSelvstendigNæringsdrivende;
    const erFrilanser = søker.harJobbetSomFrilans;
    const næring = søker.selvstendigNæringsdrivendeInformasjon;
    const frilans = søker.frilansInformasjon;
    const unikeArbeidsforhold = getArbeidsforholdTilretteleggingOptions(
        arbeidsforhold,
        tilrettelegginger,
        termindato,
        intl,
    );

    const næringValg = harNæring && næring ? [getNæringTilretteleggingOption(tilrettelegginger, næring)] : [];

    const frilansValg =
        erFrilanser && frilans !== undefined ? [getFrilansTilretteleggingOption(tilrettelegginger, frilans)] : [];
    return [...unikeArbeidsforhold, ...næringValg, ...frilansValg];
};

export const validateVelgArbeidIsAnswered = (value: string, intl: IntlShape) => {
    if (value.length === 0) {
        return intlUtils(intl, 'valideringsfeil.tilrettelegging.påkrevd');
    }
    return undefined;
};

export const cleanupOmValgArbeidFormData = (
    values: VelgArbeidFormData,
    options: Tilrettelegging[],
): VelgArbeidFormData => {
    const filteredValues = values.arbeidMedTilrettelegging.filter((val) =>
        options.find((tilrettelegging) => tilrettelegging.id === val),
    );
    return { arbeidMedTilrettelegging: filteredValues };
};
