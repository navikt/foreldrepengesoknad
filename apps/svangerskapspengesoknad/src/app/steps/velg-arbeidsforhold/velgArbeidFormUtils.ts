import { capitalizeFirstLetter } from '@navikt/fp-common/src/common/utils/stringUtils';
import { Arbeidsforhold } from '@navikt/fp-types';
import { UnikArbeidsforhold } from 'app/types/Arbeidsforhold';
import { EgenNæring, egenNæringId } from 'app/types/EgenNæring';
import { Frilans, frilansId } from 'app/types/Frilans';
import { Inntektsinformasjon } from 'app/types/Inntektsinformasjon';
import Tilrettelegging, { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { getUnikeArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import { IntlShape } from 'react-intl';

export const getOptionNavn = (type: Arbeidsforholdstype, navn: string, intl: IntlShape) => {
    if (type === Arbeidsforholdstype.FRILANSER) {
        return capitalizeFirstLetter(navn);
    }
    if (type === Arbeidsforholdstype.SELVSTENDIG && navn.trim().length === 0) {
        return intl.formatMessage({ id: 'egenNæring' });
    }
    return navn;
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
            navn: næring.navnPåNæringen!,
            startdato: næring.fomDato,
            sluttdato: næring.tomDato,
            stillinger: [{ fom: næring.fomDato, tom: næring.tomDato, stillingsprosent: 100 }],
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
    oppstart: string,
): Tilrettelegging => {
    const frilansTilretteleggingFraState = tilrettelegginger.find((t) => t.id == frilansId);
    return {
        id: frilansId,
        arbeidsforhold: {
            arbeidsgiverId: frilansId,
            navn: frilansId,
            type: Arbeidsforholdstype.FRILANSER,
            startdato: oppstart,
            stillinger: [{ fom: oppstart, tom: undefined, stillingsprosent: 100 }],
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
                        : intl.formatMessage({ id: 'privat.arbeidsgiver' }),
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
    inntektsinformasjon: Inntektsinformasjon,
    arbeidsforhold: Arbeidsforhold[],
    termindato: string,
    intl: IntlShape,
    frilans?: Frilans,
    egenNæring?: EgenNæring,
): Tilrettelegging[] => {
    const harNæring = inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende;
    const erFrilanser = inntektsinformasjon.harJobbetSomFrilans;
    const unikeArbeidsforhold = getArbeidsforholdTilretteleggingOptions(
        arbeidsforhold,
        tilrettelegginger,
        termindato,
        intl,
    );

    const næringValg = harNæring && egenNæring ? [getNæringTilretteleggingOption(tilrettelegginger, egenNæring)] : [];

    const frilansValg =
        erFrilanser && frilans !== undefined
            ? [getFrilansTilretteleggingOption(tilrettelegginger, frilans.oppstart)]
            : [];
    return [...unikeArbeidsforhold, ...næringValg, ...frilansValg];
};
