import { hasValue } from '@navikt/fp-common';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { ISOStringToDate } from 'app/utils/dateUtils';
import { EgenNæringModalFormData, EgenNæringModalFormField } from './egenNæringModalFormConfig';
import { erVirksomhetRegnetSomNyoppstartet } from './egenNæringModalFormUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

const EgenNæringModalFormConfig: QuestionConfig<EgenNæringModalFormData, EgenNæringModalFormField> = {
    [EgenNæringModalFormField.type]: {
        isIncluded: () => true,
        isAnswered: ({ type }) => type !== undefined,
    },
    [EgenNæringModalFormField.navnPåNæringen]: {
        isIncluded: () => true,
        isAnswered: ({ navnPåNæringen }) => hasValue(navnPåNæringen),
        visibilityFilter: ({ type }) => type !== undefined,
    },
    [EgenNæringModalFormField.registrertINorge]: {
        isIncluded: () => true,
        isAnswered: ({ registrertINorge }) => registrertINorge !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ navnPåNæringen }) => hasValue(navnPåNæringen),
    },
    [EgenNæringModalFormField.orgnr]: {
        isIncluded: ({ registrertINorge }) => registrertINorge === YesOrNo.YES,
        isAnswered: ({ orgnr }) => hasValue(orgnr),
        visibilityFilter: ({ registrertINorge }) => registrertINorge === YesOrNo.YES,
    },
    [EgenNæringModalFormField.land]: {
        isIncluded: ({ registrertINorge }) => registrertINorge === YesOrNo.NO,
        isAnswered: ({ land }) => hasValue(land),
        visibilityFilter: ({ registrertINorge }) => registrertINorge === YesOrNo.NO,
    },
    [EgenNæringModalFormField.fom]: {
        isIncluded: () => true,
        isAnswered: ({ fom }) => hasValue(fom),
        visibilityFilter: ({ orgnr, land }) => hasValue(orgnr) || hasValue(land),
    },
    [EgenNæringModalFormField.pågående]: {
        isIncluded: () => true,
        isAnswered: ({ pågående }) => pågående !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ fom }) => hasValue(fom),
    },
    [EgenNæringModalFormField.tom]: {
        isIncluded: ({ pågående }) => pågående === YesOrNo.NO,
        isAnswered: ({ tom }) => hasValue(tom),
        visibilityFilter: ({ pågående }) => pågående === YesOrNo.NO,
    },
    [EgenNæringModalFormField.næringsresultat]: {
        isIncluded: ({ fom }) => erVirksomhetRegnetSomNyoppstartet(ISOStringToDate(fom)),
        isAnswered: ({ næringsresultat }) => hasValue(næringsresultat),
        visibilityFilter: ({ pågående, tom }) => pågående === YesOrNo.YES || hasValue(tom),
    },
    [EgenNæringModalFormField.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene]: {
        isIncluded: ({ fom }) => erVirksomhetRegnetSomNyoppstartet(ISOStringToDate(fom)),
        isAnswered: ({ harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene }) =>
            harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ næringsresultat }) => hasValue(næringsresultat),
    },
    [EgenNæringModalFormField.yrkesAktivDato]: {
        isIncluded: ({ fom }) => erVirksomhetRegnetSomNyoppstartet(ISOStringToDate(fom)),
        isAnswered: ({ yrkesAktivDato }) => hasValue(yrkesAktivDato),
        visibilityFilter: ({ harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene }) =>
            harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene === YesOrNo.YES,
    },
    [EgenNæringModalFormField.hattVarigEndringAvNæringsinntektSiste4Kalenderår]: {
        isIncluded: ({ fom }) => !erVirksomhetRegnetSomNyoppstartet(ISOStringToDate(fom)),
        isAnswered: ({ hattVarigEndringAvNæringsinntektSiste4Kalenderår }) =>
            hattVarigEndringAvNæringsinntektSiste4Kalenderår !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ pågående, tom }) => pågående === YesOrNo.YES || hasValue(tom),
    },
    [EgenNæringModalFormField.datoForEndring]: {
        isIncluded: ({ hattVarigEndringAvNæringsinntektSiste4Kalenderår }) =>
            hattVarigEndringAvNæringsinntektSiste4Kalenderår === YesOrNo.YES,
        isAnswered: ({ datoForEndring }) => hasValue(datoForEndring),
        visibilityFilter: ({ hattVarigEndringAvNæringsinntektSiste4Kalenderår }) =>
            hattVarigEndringAvNæringsinntektSiste4Kalenderår === YesOrNo.YES,
    },
    [EgenNæringModalFormField.inntektEtterEndring]: {
        isIncluded: ({ hattVarigEndringAvNæringsinntektSiste4Kalenderår }) =>
            hattVarigEndringAvNæringsinntektSiste4Kalenderår === YesOrNo.YES,
        isAnswered: ({ inntektEtterEndring }) => hasValue(inntektEtterEndring),
        visibilityFilter: ({ datoForEndring }) => hasValue(datoForEndring),
    },
    [EgenNæringModalFormField.forklaringEndring]: {
        isIncluded: ({ hattVarigEndringAvNæringsinntektSiste4Kalenderår }) =>
            hattVarigEndringAvNæringsinntektSiste4Kalenderår === YesOrNo.YES,
        isAnswered: ({ forklaringEndring }) => hasValue(forklaringEndring),
        visibilityFilter: ({ inntektEtterEndring }) => hasValue(inntektEtterEndring),
    },
    [EgenNæringModalFormField.harRegnskapsfører]: {
        isIncluded: () => true,
        isAnswered: ({ harRegnskapsfører }) => harRegnskapsfører !== YesOrNo.UNANSWERED,
        visibilityFilter: ({
            yrkesAktivDato,
            forklaringEndring,
            harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
            hattVarigEndringAvNæringsinntektSiste4Kalenderår,
        }) =>
            hasValue(yrkesAktivDato) ||
            hasValue(forklaringEndring) ||
            harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene === YesOrNo.NO ||
            hattVarigEndringAvNæringsinntektSiste4Kalenderår === YesOrNo.NO,
    },
    [EgenNæringModalFormField.navnRegnskapsfører]: {
        isIncluded: ({ harRegnskapsfører }) => harRegnskapsfører === YesOrNo.YES,
        isAnswered: ({ navnRegnskapsfører }) => hasValue(navnRegnskapsfører),
        visibilityFilter: ({ harRegnskapsfører }) => harRegnskapsfører === YesOrNo.YES,
    },
    [EgenNæringModalFormField.telefonRegnskapsfører]: {
        isIncluded: ({ harRegnskapsfører }) => harRegnskapsfører === YesOrNo.YES,
        isAnswered: ({ telefonRegnskapsfører }) => hasValue(telefonRegnskapsfører),
        visibilityFilter: ({ navnRegnskapsfører }) => hasValue(navnRegnskapsfører),
    },
    [EgenNæringModalFormField.regnskapsførerNærVennEllerFamilie]: {
        isIncluded: ({ harRegnskapsfører }) => harRegnskapsfører === YesOrNo.YES,
        isAnswered: ({ regnskapsførerNærVennEllerFamilie }) => regnskapsførerNærVennEllerFamilie !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ telefonRegnskapsfører }) => hasValue(telefonRegnskapsfører),
    },
};

const egenNæringModalQuestionsConfig = Questions<EgenNæringModalFormData, EgenNæringModalFormField>(
    EgenNæringModalFormConfig
);

export default egenNæringModalQuestionsConfig;
