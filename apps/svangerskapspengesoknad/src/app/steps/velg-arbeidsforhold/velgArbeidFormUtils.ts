import { VelgArbeidFormData } from './velgArbeidFormConfig';
import { convertYesOrNoOrUndefinedToBoolean } from '@navikt/fp-common/src/common/utils/formUtils';
import { Søker } from 'app/types/Søker';
import { intlUtils } from '@navikt/fp-common';
import Tilrettelegging, { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { FrilansFormData } from '../frilans/frilansFormConfig';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { getUnikeArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import { IntlShape } from 'react-intl';
import { EgenNæring, egenNæringId } from 'app/types/EgenNæring';
import { frilansId } from 'app/types/Frilans';

export const getInitialVelgArbeidFormValues = (tilretteleggingsBehov: Tilrettelegging[]): VelgArbeidFormData => {
    return {
        arbeidMedTilrettelegging: tilretteleggingsBehov.map((t) => t.id),
    };
};

export const mapFrilansDataToSøkerState = (søker: Søker, values: FrilansFormData): Søker => {
    return {
        ...søker,
        frilansInformasjon: {
            jobberFremdelesSomFrilans: !!convertYesOrNoOrUndefinedToBoolean(values.jobberFremdelesSomFrilanser),
            oppstart: values.frilansFom,
            // sluttDato: values.frilansTom,
        },
    };
};

export const getNæringTilretteleggingOption = (
    tilrettelegginger: Tilrettelegging[],
    næring: EgenNæring,
): Tilrettelegging => {
    const næringTilretteleggingFraState = tilrettelegginger.find((t) => t.id == egenNæringId);
    return {
        id: egenNæringId,
        arbeidsforhold: næringTilretteleggingFraState?.arbeidsforhold || {
            arbeidsgiverId: næring.organisasjonsnummer || `${næring.navnPåNæringen}${næring.registrertILand}`,
            type: Arbeidsforholdstype.SELVSTENDIG,
            navn: næring.navnPåNæringen,
            opprinneligstillingsprosent: 100,
        },
        vedlegg: næringTilretteleggingFraState?.vedlegg || [],
        behovForTilretteleggingFom: næringTilretteleggingFraState?.behovForTilretteleggingFom || undefined,
        variertePerioder: næringTilretteleggingFraState?.variertePerioder || [],
        type: næringTilretteleggingFraState?.type || undefined,
        enPeriodeMedTilretteleggingFom: næringTilretteleggingFraState?.enPeriodeMedTilretteleggingFom || undefined,
        enPeriodeMedTilretteleggingStillingsprosent:
            næringTilretteleggingFraState?.enPeriodeMedTilretteleggingStillingsprosent || undefined,
        delvisTilretteleggingPeriodeType: næringTilretteleggingFraState?.delvisTilretteleggingPeriodeType || undefined,
        risikofaktorer: næringTilretteleggingFraState?.risikofaktorer || undefined,
        tilretteleggingstiltak: næringTilretteleggingFraState?.tilretteleggingstiltak || undefined,
    };
};

export const getFrilansTilretteleggingOption = (tilrettelegginger: Tilrettelegging[]): Tilrettelegging => {
    const frilansTilretteleggingFraState = tilrettelegginger.find((t) => t.id == frilansId);
    return {
        id: frilansId,
        arbeidsforhold: frilansTilretteleggingFraState?.arbeidsforhold || {
            arbeidsgiverId: frilansId,
            navn: frilansId,
            type: Arbeidsforholdstype.FRILANSER,
            opprinneligstillingsprosent: 100,
        },
        vedlegg: frilansTilretteleggingFraState?.vedlegg || [],
        behovForTilretteleggingFom: frilansTilretteleggingFraState?.behovForTilretteleggingFom || undefined,
        variertePerioder: frilansTilretteleggingFraState?.variertePerioder || [],
        type: frilansTilretteleggingFraState?.type || undefined,
        enPeriodeMedTilretteleggingFom: frilansTilretteleggingFraState?.enPeriodeMedTilretteleggingFom || undefined,
        enPeriodeMedTilretteleggingStillingsprosent:
            frilansTilretteleggingFraState?.enPeriodeMedTilretteleggingStillingsprosent || undefined,
        delvisTilretteleggingPeriodeType: frilansTilretteleggingFraState?.delvisTilretteleggingPeriodeType || undefined,
        risikofaktorer: frilansTilretteleggingFraState?.risikofaktorer || undefined,
        tilretteleggingstiltak: frilansTilretteleggingFraState?.tilretteleggingstiltak || undefined,
    };
};

export const getArbeidsforholdTilretteleggingOptions = (
    arbeidsforhold: Arbeidsforhold[],
    tilrettelegginger: Tilrettelegging[],
    termindato: string,
    intl: IntlShape,
): Tilrettelegging[] => {
    const unikeArbeidsforhold = getUnikeArbeidsforhold(arbeidsforhold, termindato);
    const arbeidsforholdOptions = unikeArbeidsforhold.map((forhold) => {
        const tilretteleggingFraState = tilrettelegginger.find((t) => t.id == forhold.id);
        return {
            id: tilretteleggingFraState?.id || forhold.id,
            arbeidsforhold: tilretteleggingFraState?.arbeidsforhold || {
                arbeidsgiverId: forhold.arbeidsgiverId,
                type:
                    forhold.arbeidsgiverIdType === 'orgnr'
                        ? Arbeidsforholdstype.VIRKSOMHET
                        : Arbeidsforholdstype.PRIVAT,
                navn:
                    forhold.arbeidsgiverIdType === 'orgnr' || forhold.arbeidsgiverNavn
                        ? forhold.arbeidsgiverNavn
                        : intlUtils(intl, 'privat.arbeidsgiver'),
                opprinneligstillingsprosent: forhold.stillingsprosent,
            },
            variertePerioder: tilretteleggingFraState?.variertePerioder || [],
            vedlegg: tilretteleggingFraState?.vedlegg || [],
            behovForTilretteleggingFom: tilretteleggingFraState?.behovForTilretteleggingFom || undefined,
            type: tilretteleggingFraState?.type || undefined,
            sammePeriodeFremTilTerminFom: tilretteleggingFraState?.enPeriodeMedTilretteleggingFom || undefined,
            sammePeriodeFremTilTerminStillingsprosent:
                tilretteleggingFraState?.enPeriodeMedTilretteleggingStillingsprosent || undefined,
            delvisTilretteleggingPeriodeType: tilretteleggingFraState?.delvisTilretteleggingPeriodeType || undefined,
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
        erFrilanser && frilans !== undefined ? [getFrilansTilretteleggingOption(tilrettelegginger)] : [];
    return [...unikeArbeidsforhold, ...næringValg, ...frilansValg];
};

export const validateVelgArbeidIsAnswered = (value: string, intl: IntlShape) => {
    if (value.length === 0) {
        return intlUtils(intl, 'valideringsfeil.tilrettelegging.påkrevd');
    }
    return undefined;
};
