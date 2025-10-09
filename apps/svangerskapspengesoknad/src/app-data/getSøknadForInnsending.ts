import { Barn } from 'types/Barn';
import { DelvisTilrettelegging, IngenTilrettelegging, PeriodeMedVariasjon } from 'types/Tilrettelegging';
import { getSisteDagForSvangerskapspenger } from 'utils/dateUtils';
import {
    getArbeidsgiverStillingerForTilrettelegging,
    getTypeArbeidForTilrettelegging,
    mapEnTilretteleggingPeriode,
    mapFlereTilretteleggingPerioder,
} from 'utils/tilretteleggingUtils';

import {
    Arbeidsforhold,
    Attachment,
    Frilans,
    Målform,
    NæringDto,
    SvangerskapspengesøknadDto,
    Søkerinfo,
    TilretteleggingbehovDto,
    VedleggDto,
} from '@navikt/fp-types';
import { getDecoratorLanguageCookie } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataMap, ContextDataType } from './SvpDataContext';

const finnTilretteleggingsbehov = (
    alleArbeidsforhold: Arbeidsforhold[],
    barn: Barn,
    tilrettelegginger: Record<string, DelvisTilrettelegging | IngenTilrettelegging>,
    tilretteleggingerPerioder?: Record<string, PeriodeMedVariasjon[]>,
    egenNæring?: NæringDto,
    frilans?: Frilans,
): TilretteleggingbehovDto[] => {
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
): VedleggDto[] => {
    const mappedVedlegg = Object.keys(tilretteleggingerVedlegg).map((tilretteleggingId) => {
        const alleVedlegg = tilretteleggingerVedlegg[tilretteleggingId];
        const arbeidsforhold = {
            id: tilretteleggingId,
            type: getTypeArbeidForTilrettelegging(tilretteleggingId, alleArbeidsforhold),
        } as const;
        return alleVedlegg.map((vedlegg) => ({
            ...vedlegg,
            dokumenterer: {
                type: 'TILRETTELEGGING' as const,
                arbeidsforhold,
            },
        }));
    });
    return mappedVedlegg.flat();
};

export const getSøknadForInnsending = (
    søkerinfo: Søkerinfo,
    hentData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
): SvangerskapspengesøknadDto => {
    const senereUtenlandsopphold = hentData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const tidligereUtenlandsopphold = hentData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const barn = notEmpty(hentData(ContextDataType.OM_BARNET));
    const tilrettelegginger = notEmpty(hentData(ContextDataType.TILRETTELEGGINGER));
    const tilretteleggingerVedlegg = notEmpty(hentData(ContextDataType.TILRETTELEGGINGER_VEDLEGG));
    const tilretteleggingerPerioder = hentData(ContextDataType.TILRETTELEGGINGER_PERIODER);
    const frilans = hentData(ContextDataType.FRILANS);
    const egenNæring = hentData(ContextDataType.EGEN_NÆRING);
    const ferie = hentData(ContextDataType.FERIE);

    return {
        søkerinfo: {
            fnr: søkerinfo.søker.fnr,
            navn: [søkerinfo.søker.fornavn, søkerinfo.søker.mellomnavn, søkerinfo.søker.etternavn]
                .filter((a) => !!a)
                .join(' '),
            arbeidsforhold: søkerinfo.arbeidsforhold.map((af) => ({
                navn: af.arbeidsgiverNavn,
                orgnummer: af.arbeidsgiverId,
                stillingsprosent: af.stillingsprosent,
                fom: af.fom,
                tom: af.tom,
            })),
        },
        språkkode: getDecoratorLanguageCookie('decorator-language') as Målform,
        barn,
        frilans,
        egenNæring,
        andreInntekterSiste10Mnd: hentData(ContextDataType.ARBEID_I_UTLANDET)?.arbeidIUtlandet,
        utenlandsopphold: (tidligereUtenlandsopphold ?? []).concat(senereUtenlandsopphold ?? []),
        tilretteleggingsbehov: finnTilretteleggingsbehov(
            søkerinfo.arbeidsforhold,
            barn,
            tilrettelegginger,
            tilretteleggingerPerioder,
            egenNæring,
            frilans,
        ),
        vedlegg: finnVedlegg(tilretteleggingerVedlegg, søkerinfo.arbeidsforhold),
        avtaltFerie: ferie ? Object.values(ferie).flatMap((f) => f.feriePerioder) : [],
    };
};
