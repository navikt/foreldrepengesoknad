import { ArbeidsforholdDTO } from 'types/Arbeidsforhold';
import { AttachmentDTO } from 'types/AttachmentDTO';
import { Barn } from 'types/Barn';
import { SøknadDTO } from 'types/Søknad';
import Tilrettelegging, {
    Arbeidsforholdstype,
    DelvisTilretteleggingDTO,
    HelTilretteleggingDTO,
    IngenTilretteleggingDTO,
    TilretteleggingDTO,
    TilretteleggingPeriode,
    Tilretteleggingstype,
} from 'types/Tilrettelegging';
import { getSisteDagForSvangerskapspenger } from 'utils/dateUtils';
import { mapTilretteleggingTilPerioder } from 'utils/tilretteleggingUtils';

import { AttachmentMetadataType } from '@navikt/fp-constants';
import { LocaleNo } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataMap, ContextDataType } from './SvpDataContext';

const getArbeidsforholdForInnsending = (t: TilretteleggingPeriode | Tilrettelegging): ArbeidsforholdDTO => {
    if (
        t.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER ||
        t.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG
    ) {
        return {
            type: t.arbeidsforhold.type,
            risikoFaktorer: t.risikofaktorer!,
            tilretteleggingstiltak: t.tilretteleggingstiltak!,
        };
    }
    return {
        id: t.arbeidsforhold.arbeidsgiverId!,
        type: t.arbeidsforhold.type,
    };
};

const mapHelTilretteleggingForInnsending = (
    periode: TilretteleggingPeriode,
    arbeidsforhold: ArbeidsforholdDTO,
): HelTilretteleggingDTO => {
    return {
        type: Tilretteleggingstype.HEL,
        tilrettelagtArbeidFom: periode.fom,
        arbeidsforhold,
        behovForTilretteleggingFom: periode.behovForTilretteleggingFom,
    };
};

const mapDelvisTilretteleggingForInnsending = (
    periode: TilretteleggingPeriode,
    arbeidsforhold: ArbeidsforholdDTO,
): DelvisTilretteleggingDTO => {
    return {
        type: Tilretteleggingstype.DELVIS,
        tilrettelagtArbeidFom: periode.fom,
        arbeidsforhold,
        behovForTilretteleggingFom: periode.behovForTilretteleggingFom,
        stillingsprosent: periode.stillingsprosent,
    };
};

const mapIngenTilretteleggingForInnsending = (
    periode: TilretteleggingPeriode,
    arbeidsforhold: ArbeidsforholdDTO,
): IngenTilretteleggingDTO => {
    return {
        type: Tilretteleggingstype.INGEN,
        slutteArbeidFom: periode.fom,
        arbeidsforhold,
        behovForTilretteleggingFom: periode.behovForTilretteleggingFom,
    };
};

const mapTilretteleggingPeriodeForInnsending = (periode: TilretteleggingPeriode): TilretteleggingDTO => {
    const mappedArbeid = getArbeidsforholdForInnsending(periode);
    if (periode.type === Tilretteleggingstype.HEL) {
        return mapHelTilretteleggingForInnsending(periode, mappedArbeid);
    }
    if (periode.type === Tilretteleggingstype.DELVIS) {
        return mapDelvisTilretteleggingForInnsending(periode, mappedArbeid);
    }
    return mapIngenTilretteleggingForInnsending(periode, mappedArbeid);
};

// TODO: Fikses mappingen her senere. 3 lag med objekter som er litt unødvendig.
const mapTilretteleggingerForInnsending = (tilrettelegging: Tilrettelegging[], barn: Barn): TilretteleggingDTO[] => {
    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barn);
    const tilretteleggingsPerioder = mapTilretteleggingTilPerioder(tilrettelegging, sisteDagForSvangerskapspenger);
    return tilretteleggingsPerioder.map((p: TilretteleggingPeriode) => {
        return mapTilretteleggingPeriodeForInnsending(p);
    });
};

const mapVedleggForInnsending = (tilrettelegginger: Tilrettelegging[]): AttachmentDTO[] => {
    const mappedVedlegg = tilrettelegginger.map((t) => {
        const mappedArbeid = getArbeidsforholdForInnsending(t);
        return t.vedlegg.map((v) => ({
            ...v,
            dokumenterer: {
                type: AttachmentMetadataType.TILRETTELEGGING,
                arbeidsforhold: mappedArbeid,
            },
        }));
    });
    return mappedVedlegg.flat(1);
};

export const getSøknadForInnsending = (
    hentData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    locale: LocaleNo,
): SøknadDTO => {
    const senereUtenlandsopphold = hentData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const tidligereUtenlandsopphold = hentData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const barn = notEmpty(hentData(ContextDataType.OM_BARNET));
    const tilrettelegging = notEmpty(hentData(ContextDataType.TILRETTELEGGINGER));
    const tilretteleggingForInnsending = mapTilretteleggingerForInnsending(tilrettelegging, barn);
    return {
        språkkode: locale,
        barn: barn,
        frilans: hentData(ContextDataType.FRILANS),
        egenNæring: hentData(ContextDataType.EGEN_NÆRING),
        andreInntekterSiste10Mnd: hentData(ContextDataType.ARBEID_I_UTLANDET)?.arbeidIUtlandet,
        utenlandsopphold: (tidligereUtenlandsopphold ?? []).concat(senereUtenlandsopphold ?? []),
        tilrettelegging: tilretteleggingForInnsending,
        vedlegg: mapVedleggForInnsending(tilrettelegging),
    };
};
