import { AttachmentDTO } from 'types/AttachmentDTO';
import { Barn } from 'types/Barn';
import { SøknadDTO } from 'types/Søknad';
import { DelvisTilrettelegging, IngenTilrettelegging, PeriodeMedVariasjon } from 'types/Tilrettelegging';
import { TilretteleggingDTO } from 'types/TilretteleggingDto';
import { getSisteDagForSvangerskapspenger } from 'utils/dateUtils';
import {
    getArbeidsgiverStillingerForTilrettelegging,
    getTypeArbeidForTilrettelegging,
    mapEnTilretteleggingPeriode,
    mapFlereTilretteleggingPerioder,
} from 'utils/tilretteleggingUtils';

import { AttachmentMetadataType } from '@navikt/fp-constants';
import { Arbeidsforhold, Attachment, EgenNæring, Frilans, LocaleNo } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataMap, ContextDataType } from './SvpDataContext';

const finnTilretteleggingsbehov = (
    alleArbeidsforhold: Arbeidsforhold[],
    barn: Barn,
    tilrettelegginger: Record<string, DelvisTilrettelegging | IngenTilrettelegging>,
    tilretteleggingerPerioder?: Record<string, PeriodeMedVariasjon[]>,
    egenNæring?: EgenNæring,
    frilans?: Frilans,
): TilretteleggingDTO[] => {
    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barn);

    return Object.keys(tilrettelegginger).map((tilretteleggingId) => {
        const tilrettelegging = tilrettelegginger[tilretteleggingId];
        const perioder = tilretteleggingerPerioder?.[tilretteleggingId];

        const stillinger = getArbeidsgiverStillingerForTilrettelegging(
            barn.termindato,
            tilretteleggingId,
            alleArbeidsforhold,
            egenNæring,
            frilans,
        );

        return {
            arbeidsforhold: {
                id: tilretteleggingId,
                type: getTypeArbeidForTilrettelegging(tilretteleggingId, alleArbeidsforhold),
            },
            behovForTilretteleggingFom: tilrettelegging.behovForTilretteleggingFom,
            risikofaktorer: tilrettelegging.risikofaktorer,
            tilretteleggingstiltak: tilrettelegging.tilretteleggingstiltak,
            tilrettelegginger:
                perioder && perioder.length > 0
                    ? mapFlereTilretteleggingPerioder(perioder, sisteDagForSvangerskapspenger, stillinger)
                    : mapEnTilretteleggingPeriode(tilrettelegging, sisteDagForSvangerskapspenger, stillinger),
        };
    });
};

const finnVedlegg = (
    tilretteleggingerVedlegg: Record<string, Attachment[]>,
    alleArbeidsforhold: Arbeidsforhold[],
): AttachmentDTO[] => {
    const mappedVedlegg = Object.keys(tilretteleggingerVedlegg).map((tilretteleggingId) => {
        const alleVedlegg = tilretteleggingerVedlegg[tilretteleggingId];
        const arbeidsforhold = {
            id: tilretteleggingId,
            type: getTypeArbeidForTilrettelegging(tilretteleggingId, alleArbeidsforhold),
        };
        return alleVedlegg.map((vedlegg) => ({
            ...vedlegg,
            dokumenterer: {
                type: AttachmentMetadataType.TILRETTELEGGING,
                arbeidsforhold,
            },
        }));
    });
    return mappedVedlegg.flat();
};

export const getSøknadForInnsending = (
    alleArbeidsforhold: Arbeidsforhold[],
    hentData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    locale: LocaleNo,
): SøknadDTO => {
    const senereUtenlandsopphold = hentData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const tidligereUtenlandsopphold = hentData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const barn = notEmpty(hentData(ContextDataType.OM_BARNET));
    const tilrettelegginger = notEmpty(hentData(ContextDataType.TILRETTELEGGINGER));
    const tilretteleggingerVedlegg = notEmpty(hentData(ContextDataType.TILRETTELEGGINGER_VEDLEGG));
    const tilretteleggingerPerioder = hentData(ContextDataType.TILRETTELEGGINGER_PERIODER);
    const frilans = hentData(ContextDataType.FRILANS);
    const egenNæring = hentData(ContextDataType.EGEN_NÆRING);

    return {
        språkkode: locale,
        barn,
        frilans,
        egenNæring,
        andreInntekterSiste10Mnd: hentData(ContextDataType.ARBEID_I_UTLANDET)?.arbeidIUtlandet,
        utenlandsopphold: (tidligereUtenlandsopphold ?? []).concat(senereUtenlandsopphold ?? []),
        tilretteleggingsbehov: finnTilretteleggingsbehov(
            alleArbeidsforhold,
            barn,
            tilrettelegginger,
            tilretteleggingerPerioder,
            egenNæring,
            frilans,
        ),
        vedlegg: finnVedlegg(tilretteleggingerVedlegg, alleArbeidsforhold),
    };
};
