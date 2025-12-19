import { BulletListIcon, CalendarIcon, PencilIcon, PersonGroupIcon } from '@navikt/aksel-icons';
import {
    ContextDataType,
    useContextComplete,
    useContextGetData,
    useContextSaveData,
} from 'appData/PlanleggerDataContext';
import { usePlanleggerNavigator } from 'appData/usePlanleggerNavigator';
import { useStepData } from 'appData/useStepData';
import { FordelingSlider } from 'components/FordelingSlider';
import { useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Fordeling } from 'types/Fordeling';
import {
    erAlenesøker,
    erMedmorDelAvSøknaden,
    getErFarEllerMedmor,
    getFornavnPåSøker1,
    getFornavnPåSøker2,
    getNavnPåForeldre,
} from 'utils/HvemPlanleggerUtils';
import { mapOmBarnetTilBarn } from 'utils/barnetUtils';
import { harKunFarSøker1Rett, harKunMedmorEllerFarSøker2Rett, utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { getAntallUkerOgDagerFellesperiode } from 'utils/stønadskontoerUtils';
import { useLagUttaksplanForslag } from 'utils/useLagUttaksplanForslag';
import { finnAntallUkerOgDagerMedForeldrepenger } from 'utils/uttakUtils';

import { BodyLong, BodyShort, Heading, Tabs, ToggleGroup, VStack } from '@navikt/ds-react';

import { loggUmamiEvent } from '@navikt/fp-metrics';
import { Dekningsgrad, HvemPlanleggerType, KontoBeregningResultatDto, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { BluePanel, Infobox, StepButtons } from '@navikt/fp-ui';
import { encodeToBase64, useMedia } from '@navikt/fp-utils';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import {
    FjernAltIUttaksplanModal,
    KvoteOppsummering,
    UttaksplanDataProvider,
    UttaksplanKalender,
    UttaksplanNy,
    UttaksplanRedigeringProvider,
} from '@navikt/fp-uttaksplan-ny';
import { notEmpty } from '@navikt/fp-validation';

import { PlanleggerStepPage } from '../../components/page/PlanleggerStepPage';
import { barnehagestartDato } from '../barnehageplass/BarnehageplassSteg';
import { HvaErMulig } from './hva-er-mulig/HvaErMulig';
import { UforutsetteEndringer } from './uforutsette-endringer/UforutsetteEndringer';

interface Props {
    stønadskontoer: KontoBeregningResultatDto;
}

export const PlanenDeresSteg = ({ stønadskontoer }: Props) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    useScrollBehaviour();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const hvorLangPeriode = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const fordeling = useContextGetData(ContextDataType.FORDELING);
    const uttaksplan = useContextGetData(ContextDataType.UTTAKSPLAN);
    const completeAppContext = useContextComplete();

    const lagreUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const stønadskonto100 = stønadskontoer['100'];
    const stønadskonto80 = stønadskontoer['80'];
    const valgtStønadskonto = hvorLangPeriode.dekningsgrad === '100' ? stønadskonto100 : stønadskonto80;
    const barnehagestartdato = barnehagestartDato(omBarnet);

    const isMedmorDelAvSøknaden = erMedmorDelAvSøknaden(hvemPlanlegger);
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);

    const erAleneOmOmsorg = erAlenesøker(hvemPlanlegger);

    const bareFarMedmorHarRett =
        harKunMedmorEllerFarSøker2Rett(hvemHarRett, hvemPlanlegger) || harKunFarSøker1Rett(hvemHarRett, hvemPlanlegger);
    const erFarEllerMedmor = getErFarEllerMedmor(hvemPlanlegger, hvemHarRett);
    const erDeltUttak = fordeling !== undefined;

    const navnPåForeldre = getNavnPåForeldre(hvemPlanlegger, intl);

    const lagreUttaksplanOgOppdaterUrl = (oppdatertUttaksplan: UttakPeriode_fpoversikt[] | undefined) => {
        lagreUttaksplan(oppdatertUttaksplan);

        const contextData = {
            ...completeAppContext,
            [ContextDataType.UTTAKSPLAN]: oppdatertUttaksplan,
        };

        const encodedData = encodeToBase64(JSON.stringify(contextData));
        const currentPath = globalThis.location.pathname;
        const newUrl = `${currentPath}?data=${encodedData}`;

        globalThis.history.replaceState(null, '', newUrl);
    };

    const planforslag = useLagUttaksplanForslag(valgtStønadskonto);

    const kvoteOppsummeringRef = useRef<HTMLDivElement>(null);
    const scrollToKvoteOppsummering = () => {
        if (kvoteOppsummeringRef.current) {
            kvoteOppsummeringRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const farOgFarKunEnPartHarRett =
        hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR &&
        (hvemHarRett === 'kunSøker1HarRett' || hvemHarRett === 'kunSøker2HarRett');

    const søker = erFarEllerMedmor ? 'farEllerMedmor' : 'mor';

    return (
        <PlanleggerStepPage steps={stepConfig} goToStep={navigator.goToNextStep}>
            <VStack gap="space-24">
                <Heading size="medium" spacing level="2">
                    <FormattedMessage id="OversiktSteg.Tittel" values={{ erAleneforsørger: erAleneOmOmsorg }} />
                </Heading>

                <UttaksplanDataProvider
                    barn={mapOmBarnetTilBarn(omBarnet)}
                    erFarEllerMedmor={erFarEllerMedmor}
                    navnPåForeldre={navnPåForeldre}
                    modus="planlegger"
                    søker={erDeltUttak ? 'ikke_spesifisert' : søker}
                    valgtStønadskonto={valgtStønadskonto}
                    aleneOmOmsorg={erAleneOmOmsorg}
                    erMedmorDelAvSøknaden={isMedmorDelAvSøknaden}
                    bareFarMedmorHarRett={bareFarMedmorHarRett}
                    harAktivitetskravIPeriodeUtenUttak={false}
                    erDeltUttak={erDeltUttak}
                    saksperioder={uttaksplan ?? [...planforslag.søker1, ...planforslag.søker2]}
                >
                    <div ref={kvoteOppsummeringRef}>
                        <KvoteOppsummering visStatusIkoner />
                    </div>

                    <DereKanTilpassePlanenInfoBox erAleneforsørger={erAleneOmOmsorg} />

                    {farOgFarKunEnPartHarRett && omBarnet.erFødsel && <FarOgFarKunEnPartHarRettInfoBox />}

                    <HvaErMulig hvemPlanlegger={hvemPlanlegger} arbeidssituasjon={arbeidssituasjon} barnet={omBarnet} />

                    <UforutsetteEndringer
                        arbeidssituasjon={arbeidssituasjon}
                        hvemPlanlegger={hvemPlanlegger}
                        barnet={omBarnet}
                    />

                    <AntallUkerVelger
                        stønadskontoer={stønadskontoer}
                        hvemHarRett={hvemHarRett}
                        lagreUttaksplanOgOppdaterUrl={lagreUttaksplanOgOppdaterUrl}
                    />

                    <UttaksplanRedigeringProvider
                        oppdaterUttaksplan={lagreUttaksplanOgOppdaterUrl}
                        harEndretPlan={uttaksplan !== undefined}
                    >
                        <FjernAltIUttaksplanModal />

                        <Tabs
                            defaultValue="kalender"
                            onChange={(value) => {
                                loggUmamiEvent({
                                    origin: 'planlegger',
                                    eventName: 'tab klikk',
                                    eventData: {
                                        tittel: value,
                                    },
                                });
                            }}
                        >
                            <Tabs.List>
                                <Tabs.Tab
                                    value="kalender"
                                    label={<FormattedMessage id="PlanvisningToggle.kalender" />}
                                    icon={<CalendarIcon aria-hidden />}
                                />
                                <Tabs.Tab
                                    value="liste"
                                    label={<FormattedMessage id="PlanvisningToggle.liste" />}
                                    icon={<BulletListIcon aria-hidden />}
                                />
                            </Tabs.List>
                            <Tabs.Panel value="kalender" className="pt-5">
                                <UttaksplanKalender
                                    readOnly={false}
                                    barnehagestartdato={barnehagestartdato}
                                    scrollToKvoteOppsummering={scrollToKvoteOppsummering}
                                />
                            </Tabs.Panel>
                            <Tabs.Panel value="liste" className="pt-5">
                                <UttaksplanNy />
                            </Tabs.Panel>
                        </Tabs>
                    </UttaksplanRedigeringProvider>
                </UttaksplanDataProvider>

                <StepButtons
                    goToPreviousStep={navigator.goToPreviousDefaultStep}
                    nextButtonOnClick={navigator.goToNextDefaultStep}
                    isJumpToEndButton
                    useSimplifiedTexts
                />
            </VStack>
        </PlanleggerStepPage>
    );
};

const FarOgFarKunEnPartHarRettInfoBox = () => (
    <Infobox
        header={<FormattedMessage id="OversiktSteg.Infoboks.FarOgFar.DereHarOppgitt" />}
        icon={
            <PersonGroupIcon height={24} width={24} fontSize="1.5rem" color="var(--ax-bg-accent-strong)" aria-hidden />
        }
        color="green"
    >
        <div>
            <BodyShort>
                <FormattedMessage id="OversiktSteg.Infoboks.FarOgFar.DenSomErBiologisk" />
            </BodyShort>
            <BodyShort>
                <FormattedMessage id="OversiktSteg.Infoboks.FarOgFar.HvisDetErStebarnsadopsjon" />
            </BodyShort>
        </div>
    </Infobox>
);

const DereKanTilpassePlanenInfoBox = ({ erAleneforsørger }: { erAleneforsørger: boolean }) => (
    <Infobox
        header={<FormattedMessage id="OversiktSteg.Infoboks.Utkast" values={{ erAleneforsørger }} />}
        color="gray"
        icon={<PencilIcon height={24} width={24} fontSize="1-5rem" aria-hidden />}
    >
        <BodyLong>
            <FormattedMessage id="OversiktSteg.Infoboks.Utkast.Tekst" values={{ erAleneforsørger }} />
        </BodyLong>
    </Infobox>
);

const AntallUkerVelger = ({
    stønadskontoer,
    hvemHarRett,
    lagreUttaksplanOgOppdaterUrl,
}: {
    stønadskontoer: KontoBeregningResultatDto;
    hvemHarRett: string;
    lagreUttaksplanOgOppdaterUrl: (oppdatertUttaksplan: UttakPeriode_fpoversikt[] | undefined) => void;
}) => {
    const intl = useIntl();

    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const hvorLangPeriode = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE));
    const fordeling = useContextGetData(ContextDataType.FORDELING);

    const lagreFordeling = useContextSaveData(ContextDataType.FORDELING);
    const lagreHvorLangPeriode = notEmpty(useContextSaveData(ContextDataType.HVOR_LANG_PERIODE));

    const isDesktop = useMedia('screen and (min-width: 480)');

    const oppdaterPeriodeOgFordeling = (value: Dekningsgrad) => {
        const dekningsgrad = value;
        lagreHvorLangPeriode({ dekningsgrad });
        if (fordeling) {
            lagreFordeling({
                antallDagerSøker1: finnAntallDagerSøker1(dekningsgrad, stønadskontoer, fordeling),
            });
        }
        lagreUttaksplanOgOppdaterUrl(undefined);
    };

    const stønadskonto100 = stønadskontoer['100'];
    const stønadskonto80 = stønadskontoer['80'];
    const valgtStønadskonto = hvorLangPeriode.dekningsgrad === '100' ? stønadskonto100 : stønadskonto80;

    const antallUkerOgDager100 = finnAntallUkerOgDagerMedForeldrepenger(stønadskonto100);
    const antallUkerOgDager80 = finnAntallUkerOgDagerMedForeldrepenger(stønadskonto80);

    const fornavnSøker1 = getFornavnPåSøker1(hvemPlanlegger, intl);
    const fornavnSøker2 = getFornavnPåSøker2(hvemPlanlegger, intl);

    return (
        <VStack gap="space-24">
            <ToggleGroup
                defaultValue={hvorLangPeriode?.dekningsgrad}
                size={isDesktop ? 'medium' : 'small'}
                variant="neutral"
                onChange={(value) => oppdaterPeriodeOgFordeling(value as Dekningsgrad)}
                style={{ width: '100%' }}
            >
                <ToggleGroup.Item value={'100'}>
                    <FormattedMessage
                        id="OversiktSteg.100"
                        values={{
                            uker: antallUkerOgDager100.uker,
                            dager: antallUkerOgDager100.dager,
                        }}
                    />
                </ToggleGroup.Item>
                <ToggleGroup.Item value={'80'}>
                    <FormattedMessage
                        id="OversiktSteg.80"
                        values={{
                            uker: antallUkerOgDager80.uker,
                            dager: antallUkerOgDager80.dager,
                        }}
                    />
                </ToggleGroup.Item>
            </ToggleGroup>

            {hvemHarRett === 'beggeHarRett' &&
                (!omBarnet.erFødsel || hvemPlanlegger.type !== HvemPlanleggerType.FAR_OG_FAR) && (
                    <Heading id="fordeling-slider-label" size="small" level="3" className="sr-only">
                        Velg fordeling fellesperiode
                    </Heading>
                )}

            {hvemHarRett === 'beggeHarRett' &&
                (!omBarnet.erFødsel || hvemPlanlegger.type !== HvemPlanleggerType.FAR_OG_FAR) && (
                    <BluePanel>
                        <Heading id="fordeling-slider-label" size="small" level="3">
                            <FormattedMessage id="PlanenDeresSteg.FordelingTittel" />
                        </Heading>
                        <BodyShort className="mb-4">
                            <FormattedMessage id="PlanenDeresSteg.Undertekst" />
                        </BodyShort>
                        <FordelingSlider
                            antallDagerSøker1={fordeling?.antallDagerSøker1}
                            onAntallDagerSøker1Change={(value) => {
                                lagreFordeling({ antallDagerSøker1: value });
                                lagreUttaksplanOgOppdaterUrl(undefined);
                            }}
                            antallUkerOgDagerFellesperiode={getAntallUkerOgDagerFellesperiode(valgtStønadskonto)}
                            fornavnSøker1={fornavnSøker1}
                            fornavnSøker2={fornavnSøker2}
                        />
                    </BluePanel>
                )}
        </VStack>
    );
};

const finnAntallDagerSøker1 = (
    dekningsgrad: Dekningsgrad,
    stønadskontoer: KontoBeregningResultatDto,
    fordeling: Fordeling,
) => {
    const ukerOgDagerFellesperiode = getAntallUkerOgDagerFellesperiode(
        dekningsgrad === '100' ? stønadskontoer['100'] : stønadskontoer['80'],
    );

    return Math.min(fordeling.antallDagerSøker1, ukerOgDagerFellesperiode.totaltAntallDager);
};
