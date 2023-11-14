import { YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { Næringstype } from 'app/context/types/Næring';

export enum EgenNæringModalFormField {
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
}

export const EgenNæringModalFormComponents = getTypedFormComponents<
    EgenNæringModalFormField,
    EgenNæringModalFormData
>();
