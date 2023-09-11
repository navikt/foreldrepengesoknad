import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { Næringstype } from 'app/types/Næring';

export enum EgenNæringSubformField {
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
}

export interface EgenNæringSubformData {
    [EgenNæringSubformField.egenNæringType]: Næringstype | undefined;
    [EgenNæringSubformField.egenNæringNavn]: string;
    [EgenNæringSubformField.egenNæringRegistrertINorge]: YesOrNo;
    [EgenNæringSubformField.egenNæringOrgnr]: string;
    [EgenNæringSubformField.egenNæringLand]: string;
    [EgenNæringSubformField.egenNæringFom]: string;
    [EgenNæringSubformField.egenNæringTom]: string;
    [EgenNæringSubformField.egenNæringPågående]: YesOrNo;
    [EgenNæringSubformField.egenNæringYrkesAktivDato]: string;
    [EgenNæringSubformField.egenNæringResultat]: string;
    [EgenNæringSubformField.egenNæringBlittYrkesaktivDe3SisteÅrene]: YesOrNo;
}

export const initialEgenNæringSubformData: EgenNæringSubformData = {
    [EgenNæringSubformField.egenNæringType]: undefined,
    [EgenNæringSubformField.egenNæringNavn]: '',
    [EgenNæringSubformField.egenNæringRegistrertINorge]: YesOrNo.UNANSWERED,
    [EgenNæringSubformField.egenNæringOrgnr]: '',
    [EgenNæringSubformField.egenNæringLand]: '',
    [EgenNæringSubformField.egenNæringTom]: '',
    [EgenNæringSubformField.egenNæringFom]: '',
    [EgenNæringSubformField.egenNæringPågående]: YesOrNo.UNANSWERED,
    [EgenNæringSubformField.egenNæringResultat]: '',
    [EgenNæringSubformField.egenNæringBlittYrkesaktivDe3SisteÅrene]: YesOrNo.UNANSWERED,
    [EgenNæringSubformField.egenNæringYrkesAktivDato]: '',
};

export const EgenNæringSubformComponents = getTypedFormComponents<EgenNæringSubformField, EgenNæringSubformData>();
