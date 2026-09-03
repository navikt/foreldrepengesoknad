import { useQuery } from '@tanstack/react-query';
import { selvstendigNæringOptions } from 'api/queries';
import { REQUIRED_APP_STEPS, REQUIRED_APP_STEPS_ENDRINGSSØKNAD, ROUTES_ORDER, SøknadRoutes } from 'appData/routes.ts';
import { useMemo } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { useLocation } from 'react-router';
import { skalViseOmsorgsovertakelseDokumentasjon } from 'steps/manglende-vedlegg/dokumentasjon/OmsorgsovertakelseDokumentasjon.tsx';
import { skalViseTerminbekreftelseDokumentasjon } from 'steps/manglende-vedlegg/dokumentasjon/TerminbekreftelseDokumentasjon.tsx';
import { isAnnenForelderOppgitt } from 'types/AnnenForelder';
import { VedleggDataType } from 'types/VedleggDataType';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';
import { finnPerioderSomInngårISøknaden } from 'utils/manglendeVedleggUtils';
import { kreverUttaksplanVedleggNy } from 'utils/uttaksplanInfoUtils';

import { skalViseEgenNæringSteg } from '@navikt/fp-steg-egen-naering';
import { EksternArbeidsforholdDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { getFamiliehendelsedato } from '../utils/barnUtils';
import { ContextDataMap, ContextDataType, useContextGetAnyData } from './FpDataContext';

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
        [SøknadRoutes.ANNEN_FORELDER]: intl.formatMessage({ id: 'steps.label.annenForelder' }),
        [SøknadRoutes.PERIODE_MED_FORELDREPENGER]: intl.formatMessage({ id: 'steps.label.periodeMedForeldrepenger' }),
        [SøknadRoutes.FORDELING]: intl.formatMessage({ id: 'steps.label.fordeling' }),
        [SøknadRoutes.UTTAKSPLAN]: intl.formatMessage({ id: 'steps.label.uttaksplan' }),
        [SøknadRoutes.OPPSUMMERING]: intl.formatMessage({ id: 'steps.label.oppsummering' }),
        [SøknadRoutes.DOKUMENTASJON]: intl.formatMessage({ id: 'søknad.manglendeVedlegg' }),
        [SøknadRoutes.KVITTERING]: '',
        [SøknadRoutes.VELKOMMEN]: '',
        [SøknadRoutes.IKKE_MYNDIG]: '',
    }) satisfies Record<SøknadRoutes, string>;

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

const showFrilansOgEgenNæring = (
    path: SøknadRoutes,
    currentPath: SøknadRoutes,
    getData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    harRegistrertNæring: boolean,
) => {
    if (path === SøknadRoutes.FRILANS) {
        const erValgtOgEtterSteg =
            getData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT)?.harJobbetSomFrilans === true &&
            isAfterStep(SøknadRoutes.ARBEID_OG_INNTEKT, currentPath);
        return erValgtOgEtterSteg || !!getData(ContextDataType.FRILANS);
    }
    if (path === SøknadRoutes.EGEN_NÆRING) {
        const arbeidsforholdOgInntekt = getData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT);
        const egenNæring = getData(ContextDataType.EGEN_NÆRING);
        const skalViseSteg = skalViseEgenNæringSteg({
            harJobbetSomSelvstendigNæringsdrivende:
                arbeidsforholdOgInntekt?.harJobbetSomSelvstendigNæringsdrivende === true,
            harRegistrertNæring,
            egenNæring,
            erPåEgenNæringSteg: currentPath === SøknadRoutes.EGEN_NÆRING,
        });
        const erValgtOgEtterSteg = skalViseSteg && isAfterStep(SøknadRoutes.ARBEID_OG_INNTEKT, currentPath);
        return erValgtOgEtterSteg || (skalViseSteg && egenNæring !== undefined);
    }
    return false;
};

const harManuelleVedlegg = (vedlegg: VedleggDataType | undefined): boolean =>
    Object.values(vedlegg ?? {})
        .flatMap((attachments) => attachments ?? [])
        .some((attachment) => attachment.innsendingsType !== 'AUTOMATISK');

const showManglendeDokumentasjonSteg = (
    path: SøknadRoutes,
    getData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
    eksisterendeSak: FpSak_fpoversikt | undefined,
) => {
    if (path === SøknadRoutes.DOKUMENTASJON) {
        // Steget skal alltid vere synleg så lenge det finst manuelt opplasta eller
        // send-seinare vedlegg. Dokumentasjonsoppsummeringa viser «Endre svar» →
        // DOKUMENTASJON så lenge slike vedlegg finst, og utan dette kunne ein endra
        // uttaksplan gjere steget usynleg medan vedlegga framleis låg lagra. «Endre svar»
        // navigerte då til eit steg utanfor steglista → Step-krasj «Ingen valgte steg funnet».
        if (harManuelleVedlegg(getData(ContextDataType.VEDLEGG))) {
            return true;
        }

        const annenForelder = getData(ContextDataType.ANNEN_FORELDER);
        const søkersituasjon = getData(ContextDataType.SØKERSITUASJON);
        const barn = getData(ContextDataType.OM_BARNET);
        const uttaksplan = getData(ContextDataType.UTTAKSPLAN);
        const andreInntektskilder = getData(ContextDataType.ANDRE_INNTEKTSKILDER);
        const familiehendelsedato = barn ? getFamiliehendelsedato(barn) : undefined;

        const skalHaAleneomsorgDok =
            !!annenForelder && isAnnenForelderOppgitt(annenForelder) && annenForelder.erAleneOmOmsorg;

        const erFarEllerMedmor = !!søkersituasjon && isFarEllerMedmor(søkersituasjon.rolle);
        const skalHaTerminDokumentasjon = skalViseTerminbekreftelseDokumentasjon({
            søkersituasjon,
            barn,
            erFarEllerMedmor,
            arbeidsforhold,
            annenForelder,
        });
        const skalHaAdopsjonDokumentasjon = skalViseOmsorgsovertakelseDokumentasjon(søkersituasjon);

        const perioderSomSkalSjekkes = uttaksplan
            ? finnPerioderSomInngårISøknaden(uttaksplan, erFarEllerMedmor, !!eksisterendeSak)
            : [];

        const skalHaUttakDok =
            familiehendelsedato && annenForelder && perioderSomSkalSjekkes.length > 0
                ? kreverUttaksplanVedleggNy(
                      perioderSomSkalSjekkes,
                      erFarEllerMedmor,
                      annenForelder,
                      familiehendelsedato,
                  )
                : false;

        const skalHaAndreInntekterDok = andreInntektskilder?.some(
            (i) => i.type === 'MILITÆR_ELLER_SIVILTJENESTE' || i.type === 'ETTERLØNN_SLUTTPAKKE',
        );

        return (
            skalHaAleneomsorgDok ||
            skalHaTerminDokumentasjon ||
            skalHaAdopsjonDokumentasjon ||
            skalHaUttakDok ||
            !!skalHaAndreInntekterDok
        );
    }

    return false;
};

const skalViseFordelingSteg = (
    path: SøknadRoutes,
    getData: <TYPE extends ContextDataType>(key: TYPE) => ContextDataMap[TYPE],
): boolean => {
    if (path === SøknadRoutes.FORDELING) {
        return getData(ContextDataType.KOMMER_FRA_PLANLEGGER) !== true;
    }
    return true;
};

export const useStepConfig = (
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[],
    erEndringssøknad: boolean = false,
    eksisterendeSak?: FpSak_fpoversikt,
) => {
    const intl = useIntl();
    const pathToLabelMap = useMemo(() => getPathToLabelMap(intl), [intl]);

    const location = useLocation();
    const getStateData = useContextGetAnyData();
    const selvstendigNæringQuery = useQuery(selvstendigNæringOptions());
    const harRegistrertNæring = (selvstendigNæringQuery.data?.length ?? 0) > 0;

    const currentPath = useMemo(
        // eslint-disable-next-line unicorn/no-useless-coercion
        () => notEmpty(Object.values(SøknadRoutes).find((v) => v.toString() === decodeURIComponent(location.pathname))),
        [location.pathname],
    );

    const requiredSteps = erEndringssøknad ? REQUIRED_APP_STEPS_ENDRINGSSØKNAD : REQUIRED_APP_STEPS;
    const appPathList = useMemo(
        () =>
            ROUTES_ORDER.flatMap((path) =>
                (requiredSteps.includes(path) && skalViseFordelingSteg(path, getStateData)) ||
                showUtenlandsoppholdStep(path, currentPath, getStateData) ||
                showManglendeDokumentasjonSteg(path, getStateData, arbeidsforhold, eksisterendeSak) ||
                showFrilansOgEgenNæring(path, currentPath, getStateData, harRegistrertNæring)
                    ? [path]
                    : [],
            ),
        [requiredSteps, currentPath, getStateData, arbeidsforhold, eksisterendeSak, harRegistrertNæring],
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
