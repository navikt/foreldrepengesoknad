import { Skjemanummer } from '@navikt/fp-constants';

import { Sak } from '../types/Sak';

export const getRelevanteSkjemanummer = (sak: Sak): Skjemanummer[] => {
    const alleSkjemanummere = Object.values(Skjemanummer);

    if (sak.ytelse === 'FORELDREPENGER') {
        return sak.kanSøkeOmEndring
            ? alleSkjemanummere.filter(isSkjemanummerForEndringssøknadForeldrepenger)
            : alleSkjemanummere.filter(skjemanummerForFørstegangssøknadForeldrepenger);
    }

    if (sak.ytelse === 'ENGANGSSTØNAD') {
        return alleSkjemanummere.filter(isSkjemanummerForEngangsstønad);
    }
    return alleSkjemanummere.filter(isSkjemanummerForSvangerskapspengesoknad);
};

const skjemanummerForFørstegangssøknadForeldrepenger = (skjemanummer: Skjemanummer): boolean => {
    switch (skjemanummer) {
        case Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING:
        case Skjemanummer.DEPRECATED_TERMINBEKREFTELSE:
        case Skjemanummer.DEPRECATED_BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM:
        case Skjemanummer.DEPRECATED_DOK_BEGRUNNELSE_SØKE_TILBAKE_I_TID:
        case Skjemanummer.DEPRECATED_KOPI_SKATTEMELDING:
        case Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM:
        case Skjemanummer.DOK_INNTEKT:
        case Skjemanummer.DOK_OPPHOLD:
        case Skjemanummer.DOK_OPPFØLGING:
        case Skjemanummer.DOK_REISE:
            // case Skjemanummer.DEPRECATED_TILBAKEBETALING: // TODO Putt disse inn igjen om en måneds tid
            return false;
        default:
            return true;
    }
};

const isSkjemanummerForEndringssøknadForeldrepenger = (skjemanummer: Skjemanummer): boolean => {
    switch (skjemanummer) {
        case Skjemanummer.ANNET:
        case Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM:
        case Skjemanummer.BEKREFTELSE_FRA_ARBEIDSGIVER:
        case Skjemanummer.BEKREFTELSE_PÅ_AVTALT_FERIE:
        case Skjemanummer.DOK_AV_ALENEOMSORG:
        case Skjemanummer.DOK_BEGRUNNELSE_SØKE_TILBAKE_I_TID:
        case Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET:
        case Skjemanummer.DOK_INNLEGGELSE_BARN:
        case Skjemanummer.DOK_INNLEGGELSE_MOR:
        case Skjemanummer.DOK_INNLEGGELSE_FAR:
        case Skjemanummer.DOK_SYKDOM_MOR:
        case Skjemanummer.DOK_SYKDOM_FAR:
        case Skjemanummer.DOK_UTDANNING_MOR:
        case Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR:
        case Skjemanummer.DOK_ARBEID_MOR:
        case Skjemanummer.OMSORGSOVERTAKELSE:
        case Skjemanummer.TILBAKEBETALING:
        case Skjemanummer.HV_ØVELSE:
        case Skjemanummer.NAV_TILTAK:
        case Skjemanummer.TERMINBEKREFTELSE:
        case Skjemanummer.DEPRECATED_TILBAKEBETALING: // TODO fjern disse igjen om en måneds tid
            return true;
        default:
            return false;
    }
};

const isSkjemanummerForSvangerskapspengesoknad = (skjemanummer: Skjemanummer): boolean => {
    switch (skjemanummer) {
        case Skjemanummer.ANNET:
        case Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE:
        case Skjemanummer.INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG:
        case Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING:
        case Skjemanummer.TILBAKEBETALING:
        case Skjemanummer.TERMINBEKREFTELSE:
        case Skjemanummer.SKATTEMELDING:
        case Skjemanummer.RESULTATREGNSKAP:
            return true;
        default:
            return false;
    }
};

const isSkjemanummerForEngangsstønad = (skjemanummer: Skjemanummer): boolean => {
    switch (skjemanummer) {
        case Skjemanummer.ANNET:
        case Skjemanummer.TERMINBEKREFTELSE:
        case Skjemanummer.FØDSELSATTEST:
        case Skjemanummer.TILBAKEBETALING:
        case Skjemanummer.DOK_INNTEKT:
        case Skjemanummer.DOK_OPPHOLD:
        case Skjemanummer.DOK_OPPFØLGING:
        case Skjemanummer.DOK_REISE:
            return true;
        default:
            return false;
    }
};
