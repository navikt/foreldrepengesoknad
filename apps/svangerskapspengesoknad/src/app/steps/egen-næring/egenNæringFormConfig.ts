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
    [EgenNæringFormField.egenNæringType]: Næringstype;
    [EgenNæringFormField.egenNæringNavn]: string;
    [EgenNæringFormField.egenNæringRegistrertINorge]: boolean | undefined;
    [EgenNæringFormField.egenNæringOrgnr]: string;
    [EgenNæringFormField.egenNæringLand]: string;
    [EgenNæringFormField.egenNæringFom]: string;
    [EgenNæringFormField.egenNæringTom]: string;
    [EgenNæringFormField.egenNæringPågående]: boolean | undefined;
    [EgenNæringFormField.egenNæringYrkesAktivDato]: string;
    [EgenNæringFormField.egenNæringResultat]: string;
    [EgenNæringFormField.egenNæringBlittYrkesaktivDe3SisteÅrene]: boolean | undefined;
    [EgenNæringFormField.egenNæringHattVarigEndringDeSiste4Årene]: boolean | undefined;
    [EgenNæringFormField.egenNæringVarigEndringDato]: string | undefined;
    [EgenNæringFormField.egenNæringVarigEndringInntektEtterEndring]: string | undefined;
    [EgenNæringFormField.egenNæringVarigEndringBeskrivelse]: string | undefined;
}
