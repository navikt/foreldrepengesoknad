import { useMemo } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { AnnenInntektType } from 'types/AndreInntektskilder';
import { getAktiveArbeidsforhold } from 'utils/arbeidsforholdUtils';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';
import { getFarMedmorErAleneOmOmsorg, getMorHarRettPåForeldrepengerINorgeEllerEØS } from 'utils/personUtils';

import { AnnenForelder, Barn, Søkerrolle, isAnnenForelderOppgitt, isUfødtBarn } from '@navikt/fp-common';
import { Arbeidsforhold, SøkersituasjonFp } from '@navikt/fp-types';
import { getFamiliehendelsedato } from '@navikt/fp-utils';
import { andreAugust2022ReglerGjelder, kreverUttaksplanVedlegg } from '@navikt/fp-uttaksplan';
import { notEmpty } from '@navikt/fp-validation';

import { REQUIRED_APP_STEPS, REQUIRED_APP_STEPS_ENDRINGSSØKNAD, ROUTES_ORDER, SøknadRoutes } from '../app-data/routes';
import { ContextDataMap, ContextDataType, useContextGetAnyData } from './FpDataContext';

const getKanSøkePåTermin = (rolle: Søkerrolle, termindato: string): boolean => {
    if (!isFarEllerMedmor(rolle)) {
        return true;
    }
    return termindato ? andreAugust2022ReglerGjelder(termindato) : false;
};

// TODO Bør denne flyttast ut?
const getPathToLabelMap = (intl: IntlShape) =>
    ({
        [SøknadRoutes.SØKERSITUASJON]: intl.formatMessage({ id: 'steps.label.søkersituasjon' }),
        [SøknadRoutes.OM_BARNET]: intl.formatMessage({ id: 'steps.label.omBarnet' }),
        [SøknadRoutes.UTENLANDSOPPHOLD]: intl.formatMessage({ id: 'steps.label.utenlandsopphold' }),
        [SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD]: intl.formatMessage({ id: 'steps.label.utenlandsopphold.tidligere' }),
        [SøknadRoutes.SENERE_UTENLANDSOPPHOLD]: intl.formatMessage({ id: 'steps.label.utenlandsopphold.senere' }),
        [SøknadRoutes.ARBEID_OG_INNTEKT]: intl.formatMessage({ id: 'steps.label.inntektsinformasjon' }),
        [SøknadRoutes.FRILANS]: intl.formatMessage({ id: 'steps.label.frilans' }),
        [SøknadRoutes.EGEN_NÆRING]: intl.formatMessage({ id: 'steps.label.egenNæring' }),
        [SøknadRoutes.ANDRE_INNTEKTER]: intl.formatMessage({ id: 'steps.label.andreInntekter' }),
        [SøknadRoutes.ANNEN_FORELDER]: intl.formatMessage({ id: 'steps.label.annenForelder' }),
        [SøknadRoutes.PERIODE_MED_FORELDREPENGER]: intl.formatMessage({ id: 'steps.label.periodeMedForeldrepenger' }),
        [SøknadRoutes.FORDELING]: intl.formatMessage({ id: 'steps.label.fordeling' }),
        [SøknadRoutes.UTTAKSPLAN]: intl.formatMessage({ id: 'steps.label.uttaksplan' }),
        [SøknadRoutes.OPPSUMMERING]: intl.formatMessage({ id: 'steps.label.oppsummering' }),
        [SøknadRoutes.DOKUMENTASJON]: intl.formatMessage({ id: 'søknad.manglendeVedlegg' }),
    }) as Record<string, string>;

const isAfterStep = (previousStepPath: SøknadRoutes, currentStepPath: SøknadRoutes): boolean => {
    return ROUTES_ORDER.indexOf(currentStepPath) > ROUTES_ORDER.indexOf(previousStepPath);
};

const showUtenlandsoppholdStep = (
    path: SøknadRoutes,
    currentPath: SøknadRoutes,
    getData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
) => {
    if (path === SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD) {
        const erValgtOgEtterSteg =
            getData(ContextDataType.UTENLANDSOPPHOLD)?.harBoddUtenforNorgeSiste12Mnd === true &&
            isAfterStep(SøknadRoutes.UTENLANDSOPPHOLD, currentPath);
        return erValgtOgEtterSteg || !!getData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    }
    if (path === SøknadRoutes.SENERE_UTENLANDSOPPHOLD) {
        const erValgtOgEtterSteg =
            getData(ContextDataType.UTENLANDSOPPHOLD)?.skalBoUtenforNorgeNeste12Mnd === true &&
            isAfterStep(SøknadRoutes.UTENLANDSOPPHOLD, currentPath);
        return erValgtOgEtterSteg || !!getData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    }
    return false;
};

const showFrilansOgEgenNæringOgAndreInntekter = (
    path: SøknadRoutes,
    currentPath: SøknadRoutes,
    getData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
) => {
    if (path === SøknadRoutes.FRILANS) {
        const erValgtOgEtterSteg =
            getData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT)?.harJobbetSomFrilans === true &&
            isAfterStep(SøknadRoutes.ARBEID_OG_INNTEKT, currentPath);
        return erValgtOgEtterSteg || !!getData(ContextDataType.FRILANS);
    }
    if (path === SøknadRoutes.EGEN_NÆRING) {
        const erValgtOgEtterSteg =
            getData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT)?.harJobbetSomSelvstendigNæringsdrivende === true &&
            isAfterStep(SøknadRoutes.ARBEID_OG_INNTEKT, currentPath);
        return erValgtOgEtterSteg || !!getData(ContextDataType.EGEN_NÆRING);
    }
    if (path === SøknadRoutes.ANDRE_INNTEKTER) {
        const erValgtOgEtterSteg =
            getData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT)?.harHattAndreInntektskilder === true &&
            isAfterStep(SøknadRoutes.ARBEID_OG_INNTEKT, currentPath);
        return erValgtOgEtterSteg || !!getData(ContextDataType.ANDRE_INNTEKTSKILDER);
    }
    return false;
};

const getBareFarMedmorHarRett = (
    annenForelder: AnnenForelder | undefined,
    søkersituasjon: SøkersituasjonFp | undefined,
    erFarEllerMedmor: boolean,
) => {
    if (annenForelder === undefined || søkersituasjon === undefined) {
        return false;
    }

    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const erAleneOmOmsorg = oppgittAnnenForelder ? oppgittAnnenForelder.erAleneOmOmsorg : true;

    const farMedmorErAleneOmOmsorg =
        annenForelder !== undefined
            ? getFarMedmorErAleneOmOmsorg(erFarEllerMedmor, erAleneOmOmsorg, annenForelder)
            : false;

    const bareFarMedmorHarRett =
        !getMorHarRettPåForeldrepengerINorgeEllerEØS(søkersituasjon.rolle, erFarEllerMedmor, annenForelder) &&
        !farMedmorErAleneOmOmsorg;

    return bareFarMedmorHarRett;
};

const harIngenAktiveArbeidsforhold = (
    arbeidsforhold: Arbeidsforhold[],
    søkersituasjon: SøkersituasjonFp,
    barn: Barn,
) => {
    const aktiveArbeidsforhold = getAktiveArbeidsforhold(
        arbeidsforhold,
        søkersituasjon.situasjon === 'adopsjon',
        isFarEllerMedmor(søkersituasjon.rolle),
        getFamiliehendelsedato(barn),
    );
    return aktiveArbeidsforhold.length === 0;
};

const showManglendeDokumentasjonSteg = (
    path: SøknadRoutes,
    getData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    arbeidsforhold: Arbeidsforhold[],
    erEndringssøknad: boolean,
) => {
    if (path === SøknadRoutes.DOKUMENTASJON) {
        const annenForelder = getData(ContextDataType.ANNEN_FORELDER);
        const søkersituasjon = getData(ContextDataType.SØKERSITUASJON);
        const barn = getData(ContextDataType.OM_BARNET);
        const uttaksplan = getData(ContextDataType.UTTAKSPLAN);
        const uttaksplanMetadata = getData(ContextDataType.UTTAKSPLAN_METADATA);
        const andreInntektskilder = getData(ContextDataType.ANDRE_INNTEKTSKILDER);

        const skalHaAleneomsorgDok =
            !!annenForelder && isAnnenForelderOppgitt(annenForelder) && annenForelder.erAleneOmOmsorg;

        const erFarEllerMedmor = !!søkersituasjon && isFarEllerMedmor(søkersituasjon.rolle);

        const skalHaOmBarnetDok =
            søkersituasjon?.situasjon === 'adopsjon' ||
            (barn &&
                søkersituasjon &&
                isUfødtBarn(barn) &&
                (harIngenAktiveArbeidsforhold(arbeidsforhold, søkersituasjon, barn) ||
                    getBareFarMedmorHarRett(annenForelder, søkersituasjon, erFarEllerMedmor)) &&
                getKanSøkePåTermin(søkersituasjon.rolle, barn.termindato));

        const skalHaUttakDok =
            annenForelder && uttaksplan
                ? kreverUttaksplanVedlegg(
                      uttaksplan,
                      erFarEllerMedmor,
                      annenForelder,
                      erEndringssøknad,
                      uttaksplanMetadata?.perioderSomSkalSendesInn,
                  )
                : false;

        const skalHaAndreInntekterDok = andreInntektskilder?.some(
            (i) => i.type === AnnenInntektType.MILITÆRTJENESTE || i.type === AnnenInntektType.SLUTTPAKKE,
        );

        return skalHaAleneomsorgDok || skalHaOmBarnetDok || skalHaUttakDok || skalHaAndreInntekterDok;
    }

    return false;
};

export const useStepConfig = (arbeidsforhold: Arbeidsforhold[], erEndringssøknad = false) => {
    const intl = useIntl();
    const pathToLabelMap = getPathToLabelMap(intl);

    const location = useLocation();
    const getStateData = useContextGetAnyData();

    const currentPath = useMemo(
        () => notEmpty(Object.values(SøknadRoutes).find((v) => v === decodeURIComponent(location.pathname))),
        [location.pathname],
    );

    const requiredSteps = erEndringssøknad ? REQUIRED_APP_STEPS_ENDRINGSSØKNAD : REQUIRED_APP_STEPS;
    const appPathList = useMemo(
        () =>
            ROUTES_ORDER.flatMap((path) =>
                requiredSteps.includes(path) ||
                showUtenlandsoppholdStep(path, currentPath, getStateData) ||
                showManglendeDokumentasjonSteg(path, getStateData, arbeidsforhold, erEndringssøknad) ||
                showFrilansOgEgenNæringOgAndreInntekter(path, currentPath, getStateData)
                    ? [path]
                    : [],
            ),
        [requiredSteps, currentPath, getStateData, arbeidsforhold, erEndringssøknad],
    );

    return useMemo(
        () =>
            appPathList.map((p, index) => ({
                index,
                id: p,
                label: pathToLabelMap[p],
                isSelected: p === currentPath,
            })),
        [appPathList, currentPath, pathToLabelMap],
    );
};
