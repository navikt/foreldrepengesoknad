import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { Næringstype } from 'app/types/EgenNæring';

export enum EgenNæringFormField {
    egenNæringType = 'egenNæringType',
    egenNæringNavn = 'egenNæringNavn',
    egenNæringRegistrertINorge = 'egenNæringRegistrertINorge',
    egenNæringOrgnr = 'egenNæringOrgnr',
    egenNæringLand = 'egenNæringLand',
    egenNæringFom = 'egenNæringFom',
    egenNæringTom = 'egenNæringTom',
    egenNæringPågående = 'egenNæringPågående',
    egenNæringYrkesAktivDato = 'egenNæringYrkesAktivDato',
    egenNæringResultat = 'egenNæringResultat',
    egenNæringBlittYrkesaktivDe3SisteÅrene = 'egenNæringBlittYrkesaktivDe3SisteÅrene',
    egenNæringHattVarigEndringDeSiste4Årene = 'egenNæringHattVarigEndringDeSiste4Årene',
    egenNæringVarigEndringDato = 'egenNæringVarigEndringDato',
    egenNæringVarigEndringInntektEtterEndring = 'egenNæringVarigEndringInntektEtterEndring',
    egenNæringVarigEndringBeskrivelse = 'egenNæringVarigEndringBeskrivelse',
}

export interface EgenNæringFormData {
    [EgenNæringFormField.egenNæringType]: Næringstype | undefined;
    [EgenNæringFormField.egenNæringNavn]: string;
    [EgenNæringFormField.egenNæringRegistrertINorge]: YesOrNo;
    [EgenNæringFormField.egenNæringOrgnr]: string;
    [EgenNæringFormField.egenNæringLand]: string;
    [EgenNæringFormField.egenNæringFom]: string;
    [EgenNæringFormField.egenNæringTom]: string;
    [EgenNæringFormField.egenNæringPågående]: YesOrNo;
    [EgenNæringFormField.egenNæringYrkesAktivDato]: string;
    [EgenNæringFormField.egenNæringResultat]: string;
    [EgenNæringFormField.egenNæringBlittYrkesaktivDe3SisteÅrene]: YesOrNo;
    [EgenNæringFormField.egenNæringHattVarigEndringDeSiste4Årene]: YesOrNo;
    [EgenNæringFormField.egenNæringVarigEndringDato]: string | undefined;
    [EgenNæringFormField.egenNæringVarigEndringInntektEtterEndring]: string | undefined;
    [EgenNæringFormField.egenNæringVarigEndringBeskrivelse]: string | undefined;
}

export const initialEgenNæringFormData: EgenNæringFormData = {
    [EgenNæringFormField.egenNæringType]: undefined,
    [EgenNæringFormField.egenNæringNavn]: '',
    [EgenNæringFormField.egenNæringRegistrertINorge]: YesOrNo.UNANSWERED,
    [EgenNæringFormField.egenNæringOrgnr]: '',
    [EgenNæringFormField.egenNæringLand]: '',
    [EgenNæringFormField.egenNæringTom]: '',
    [EgenNæringFormField.egenNæringFom]: '',
    [EgenNæringFormField.egenNæringPågående]: YesOrNo.UNANSWERED,
    [EgenNæringFormField.egenNæringResultat]: '',
    [EgenNæringFormField.egenNæringBlittYrkesaktivDe3SisteÅrene]: YesOrNo.UNANSWERED,
    [EgenNæringFormField.egenNæringYrkesAktivDato]: '',
    [EgenNæringFormField.egenNæringHattVarigEndringDeSiste4Årene]: YesOrNo.UNANSWERED,
    [EgenNæringFormField.egenNæringVarigEndringDato]: '',
    [EgenNæringFormField.egenNæringVarigEndringInntektEtterEndring]: '',
    [EgenNæringFormField.egenNæringVarigEndringBeskrivelse]: '',
};

export const EgenNæringFormComponents = getTypedFormComponents<EgenNæringFormField, EgenNæringFormData>();
