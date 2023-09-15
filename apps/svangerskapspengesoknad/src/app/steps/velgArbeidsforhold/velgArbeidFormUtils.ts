import { VelgArbeidFormData } from './velgArbeidFormConfig';
import { convertYesOrNoOrUndefinedToBoolean } from '@navikt/fp-common/src/common/utils/formUtils';
import { Søker } from 'app/types/Søker';
import { ISOStringToDate, intlUtils } from '@navikt/fp-common';
import Tilrettelegging, { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { FrilansFormData } from '../frilans/frilansFormConfig';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Næring } from 'app/types/Næring';
import { Frilans } from 'app/types/Frilans';
import { getUnikeArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import { IntlShape } from 'react-intl';

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
            oppstart: ISOStringToDate(values.frilansFom)!,
            sluttDato: ISOStringToDate(values.frilansTom)!,
        },
    };
};

export const mapArbeidsforholdToVelgArbeidOptions = (
    tilrettelegginger: Tilrettelegging[],
    erFrilanser: boolean,
    harNæring: boolean,
    frilans: Frilans | undefined,
    næring: Næring | undefined,
    arbeidsforhold: Arbeidsforhold[],
    termindato: Date
): Tilrettelegging[] => {
    const unikeArbeidsforhold = [
        ...getUnikeArbeidsforhold(arbeidsforhold, termindato).map((forhold) => {
            const tilretteleggingFraState = tilrettelegginger.find((t) => t.id == forhold.id);
            return {
                id: tilretteleggingFraState?.id || forhold.id,
                arbeidsforhold: tilretteleggingFraState?.arbeidsforhold || {
                    id: forhold.id,
                    type:
                        forhold.arbeidsgiverIdType === 'orgnr'
                            ? Arbeidsforholdstype.VIRKSOMHET
                            : Arbeidsforholdstype.PRIVAT,
                    navn: forhold.arbeidsgiverNavn || 'privat arbeidsgiver',
                },
                variertePerioder: tilretteleggingFraState?.variertePerioder || [],
                vedlegg: tilretteleggingFraState?.vedlegg || [],
                behovForTilretteleggingFom: tilretteleggingFraState?.behovForTilretteleggingFom || undefined,
            };
        }),
    ];

    const næringTilretteleggingFraState = tilrettelegginger.find((t) => t.id == 'Næring');
    const næringValg =
        harNæring && næring
            ? [
                  {
                      id: 'Næring',
                      arbeidsforhold: næringTilretteleggingFraState?.arbeidsforhold || {
                          id: næring.organisasjonsnummer || `${næring.navnPåNæringen}${næring.registrertILand}`,
                          type: Arbeidsforholdstype.SELVSTENDIG,
                          navn: næring.navnPåNæringen,
                      },
                      vedlegg: næringTilretteleggingFraState?.vedlegg || [],
                      behovForTilretteleggingFom:
                          næringTilretteleggingFraState?.behovForTilretteleggingFom || undefined,
                      variertePerioder: næringTilretteleggingFraState?.variertePerioder || [],
                  },
              ]
            : [];

    const frilansTilretteleggingFraState = tilrettelegginger.find((t) => t.id == 'Frilans');
    const frilansValg =
        erFrilanser && frilans !== undefined
            ? [
                  {
                      id: 'Frilans',
                      arbeidsforhold: frilansTilretteleggingFraState?.arbeidsforhold || {
                          id: 'Frilans',
                          navn: 'Frilans',
                          type: Arbeidsforholdstype.FRILANSER,
                      },
                      vedlegg: frilansTilretteleggingFraState?.vedlegg || [],
                      behovForTilretteleggingFom:
                          frilansTilretteleggingFraState?.behovForTilretteleggingFom || undefined,
                      variertePerioder: frilansTilretteleggingFraState?.variertePerioder || [],
                  },
              ]
            : [];
    return [...unikeArbeidsforhold, ...næringValg, ...frilansValg];
};

export const validateVelgArbeidIsAnswered = (value: string, intl: IntlShape) => {
    if (value.length === 0) {
        return intlUtils(intl, 'valideringsfeil.tilrettelegging.påkrevd');
    }
    return undefined;
};
