import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { Næring } from 'app/context/types/Næring';
import { date4YearsAgo } from 'app/utils/dateUtils';
import dayjs from 'dayjs';
import { EgenNæringModalFormData, EgenNæringModalFormField } from './egenNæringModalFormConfig';

export const initialEgenNæringModalValues: EgenNæringModalFormData = {
    [EgenNæringModalFormField.type]: undefined,
    [EgenNæringModalFormField.navnPåNæringen]: '',
    [EgenNæringModalFormField.registrertINorge]: YesOrNo.UNANSWERED,
    [EgenNæringModalFormField.orgnr]: '',
    [EgenNæringModalFormField.land]: '',
    [EgenNæringModalFormField.tom]: '',
    [EgenNæringModalFormField.fom]: '',
    [EgenNæringModalFormField.pågående]: YesOrNo.UNANSWERED,
    [EgenNæringModalFormField.næringsresultat]: '',
    [EgenNæringModalFormField.hattVarigEndringAvNæringsinntektSiste4Kalenderår]: YesOrNo.UNANSWERED,
    [EgenNæringModalFormField.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene]: YesOrNo.UNANSWERED,
    [EgenNæringModalFormField.yrkesAktivDato]: '',
    [EgenNæringModalFormField.datoForEndring]: '',
    [EgenNæringModalFormField.inntektEtterEndring]: '',
    [EgenNæringModalFormField.forklaringEndring]: '',
    [EgenNæringModalFormField.harRegnskapsfører]: YesOrNo.UNANSWERED,
    [EgenNæringModalFormField.navnRegnskapsfører]: '',
    [EgenNæringModalFormField.telefonRegnskapsfører]: '',
    [EgenNæringModalFormField.regnskapsførerNærVennEllerFamilie]: YesOrNo.UNANSWERED,
    [EgenNæringModalFormField.harRevisor]: YesOrNo.UNANSWERED,
    [EgenNæringModalFormField.navnRevisor]: '',
    [EgenNæringModalFormField.telefonRevisor]: '',
    [EgenNæringModalFormField.revisorNærVennEllerFamilie]: YesOrNo.UNANSWERED,
    [EgenNæringModalFormField.revisorOpplysningerFullmakt]: YesOrNo.UNANSWERED,
};

export const getInitialEgenNæringModalValues = (næring: Næring | undefined): EgenNæringModalFormData => {
    if (!næring) {
        return {
            ...initialEgenNæringModalValues,
        };
    }

    return {
        ...initialEgenNæringModalValues,
    };
};

export const erVirksomhetRegnetSomNyoppstartet = (oppstartsdato: Date | undefined): boolean => {
    if (!oppstartsdato) {
        return true;
    }

    return dayjs(oppstartsdato).startOf('day').isAfter(date4YearsAgo);
};
