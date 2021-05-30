import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';
import { Næringstype } from 'app/context/types/Næring';

export const enum EgenNæringModalFormField {
    type = 'type',
    navnPåNæringen = 'navnPåNæringen',
    registrertINorge = 'registrertINorge',
    orgnr = 'orgnr',
    land = 'land',
    fom = 'fom',
    tom = 'tom',
    pågående = 'pågående',
    yrkesAktivDato = 'yrkesAktivDato',
    næringsresultat = 'næringsresultat',
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene = 'harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene',
    hattVarigEndringAvNæringsinntektSiste4Kalenderår = 'hattVarigEndringAvNæringsinntektSiste4Kalenderår',
    datoForEndring = 'datoForEndring',
    inntektEtterEndring = 'inntektEtterEndring',
    forklaringEndring = 'forklaringEndring',
    harRegnskapsfører = 'harRegnskapsfører',
    navnRegnskapsfører = 'navnRegnskapsfører',
    telefonRegnskapsfører = 'telefonRegnskapsfører',
    regnskapsførerNærVennEllerFamilie = 'regnskapsførerNærVennEllerFamilie',
    harRevisor = 'harRevisor',
    navnRevisor = 'navnRevisor',
    telefonRevisor = 'telefonRevisor',
    revisorNærVennEllerFamilie = 'revisorNærVennEllerFamilie',
    revisorOpplysningerFullmakt = 'revisorOpplysningerFullmakt',
}

export interface EgenNæringModalFormData {
    [EgenNæringModalFormField.type]: Næringstype | undefined;
    [EgenNæringModalFormField.navnPåNæringen]: string;
    [EgenNæringModalFormField.registrertINorge]: YesOrNo;
    [EgenNæringModalFormField.orgnr]: string;
    [EgenNæringModalFormField.land]: string;
    [EgenNæringModalFormField.fom]: string;
    [EgenNæringModalFormField.tom]: string;
    [EgenNæringModalFormField.pågående]: YesOrNo;
    [EgenNæringModalFormField.yrkesAktivDato]: string;
    [EgenNæringModalFormField.næringsresultat]: string;
    [EgenNæringModalFormField.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene]: YesOrNo;
    [EgenNæringModalFormField.hattVarigEndringAvNæringsinntektSiste4Kalenderår]: YesOrNo;
    [EgenNæringModalFormField.datoForEndring]: string;
    [EgenNæringModalFormField.inntektEtterEndring]: string;
    [EgenNæringModalFormField.forklaringEndring]: string;
    [EgenNæringModalFormField.harRegnskapsfører]: YesOrNo;
    [EgenNæringModalFormField.navnRegnskapsfører]: string;
    [EgenNæringModalFormField.telefonRegnskapsfører]: string;
    [EgenNæringModalFormField.regnskapsførerNærVennEllerFamilie]: YesOrNo;
    [EgenNæringModalFormField.harRevisor]: YesOrNo;
    [EgenNæringModalFormField.navnRevisor]: string;
    [EgenNæringModalFormField.telefonRevisor]: string;
    [EgenNæringModalFormField.revisorNærVennEllerFamilie]: YesOrNo;
    [EgenNæringModalFormField.revisorOpplysningerFullmakt]: YesOrNo;
}

export const EgenNæringModalFormComponents = getTypedFormComponents<
    EgenNæringModalFormField,
    EgenNæringModalFormData,
    string
>();
