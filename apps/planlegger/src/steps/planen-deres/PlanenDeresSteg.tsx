import { BulletListIcon, CalendarIcon, MinusIcon, PencilIcon, PersonGroupIcon, PlusIcon } from '@navikt/aksel-icons';
import {
    ContextDataType,
    useContextComplete,
    useContextGetData,
    useContextSaveData,
} from 'appData/PlanleggerDataContext';
import { usePlanleggerNavigator } from 'appData/usePlanleggerNavigator';
import { useStepData } from 'appData/useStepData';
import { SliderComponent } from 'components/slider';
import { useEffect, useRef } from 'react';
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

import { BodyLong, BodyShort, Button, Heading, Tabs, ToggleGroup, VStack } from '@navikt/ds-react';

import { loggUmamiEvent } from '@navikt/fp-metrics';
import { Dekningsgrad, HvemPlanleggerType, KontoBeregningResultatDto, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Infobox, StepButtons } from '@navikt/fp-ui';
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

    // Sett standardverdi: del likt (8 uker hver, eller halvparten av totalen)
    useEffect(() => {
        if (fordeling === undefined) {
            const totalDager =
                getAntallUkerOgDagerFellesperiode(valgtStønadskonto).uker * 5 +
                getAntallUkerOgDagerFellesperiode(valgtStønadskonto).dager;
            const halvpart = Math.floor(totalDager / 2);
            lagreFordeling({ antallDagerSøker1: halvpart });
        }
    }, [fordeling, valgtStønadskonto, lagreFordeling]);

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
                    <VStack gap="space-4" className="bg-ax-bg-brand-blue-soft rounded-r-sm p-4">
                        <Heading id="oversikt-fordeling-slider-label" size="small" level="3">
                            <FormattedMessage
                                id="PlanenDeresSteg.FordelingTittel"
                                values={{
                                    uker: getAntallUkerOgDagerFellesperiode(valgtStønadskonto).uker,
                                    dager: getAntallUkerOgDagerFellesperiode(valgtStønadskonto).dager,
                                }}
                            />
                        </Heading>
                        <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4">
                            <VStack gap="space-8" align="start">
                                <BodyShort weight="semibold">{fornavnSøker1}</BodyShort>
                                {fordeling?.antallDagerSøker1 !== undefined && (
                                    <Heading size="small" level="4">
                                        <FormattedMessage
                                            id="FordelingSteg.Uker"
                                            values={{ uker: Math.floor(fordeling.antallDagerSøker1 / 5) }}
                                        />
                                    </Heading>
                                )}
                                {fordeling?.antallDagerSøker1 !== undefined && (
                                    <Button
                                        type="button"
                                        variant="tertiary"
                                        size="small"
                                        icon={<MinusIcon aria-hidden />}
                                        aria-label={intl.formatMessage(
                                            { id: 'FordelingSteg.ReduserAntallUker' },
                                            { navn: fornavnSøker1 },
                                        )}
                                        onClick={() => {
                                            const newValue = Math.max(0, fordeling.antallDagerSøker1 - 5);
                                            lagreFordeling({ antallDagerSøker1: newValue });
                                            lagreUttaksplanOgOppdaterUrl(undefined);
                                        }}
                                        disabled={fordeling.antallDagerSøker1 <= 0}
                                    />
                                )}
                            </VStack>
                            <SliderComponent
                                min={0}
                                max={
                                    getAntallUkerOgDagerFellesperiode(valgtStønadskonto).uker * 5 +
                                    getAntallUkerOgDagerFellesperiode(valgtStønadskonto).dager
                                }
                                step={5}
                                value={[fordeling?.antallDagerSøker1 ?? 0]}
                                ariaLabelledby="oversikt-fordeling-slider-label"
                                getAriaValueText={(dager1) => {
                                    const total =
                                        getAntallUkerOgDagerFellesperiode(valgtStønadskonto).uker * 5 +
                                        getAntallUkerOgDagerFellesperiode(valgtStønadskonto).dager;
                                    const uker1 = Math.floor(dager1 / 5);
                                    const dager1Rest = dager1 % 5;
                                    const resterende = total - dager1;
                                    const uker2 = Math.floor(resterende / 5);
                                    const dager2Rest = resterende % 5;

                                    return intl.formatMessage(
                                        { id: 'FordelingSteg.Slider.AriaValueText' },
                                        {
                                            uker1,
                                            dager1: dager1Rest,
                                            uker2,
                                            dager2: dager2Rest,
                                            fornavn1: fornavnSøker1,
                                            fornavn2: fornavnSøker2,
                                        },
                                    );
                                }}
                                onValueChange={(value) => {
                                    if (value[0] !== undefined) {
                                        lagreFordeling({ antallDagerSøker1: value[0] });
                                        lagreUttaksplanOgOppdaterUrl(undefined);
                                    }
                                }}
                            />
                            <VStack gap="space-8" align="end">
                                <BodyShort weight="semibold">{fornavnSøker2}</BodyShort>
                                {fordeling?.antallDagerSøker1 !== undefined && (
                                    <Heading size="small" level="4">
                                        <FormattedMessage
                                            id="FordelingSteg.Uker"
                                            values={{
                                                uker: Math.floor(
                                                    (getAntallUkerOgDagerFellesperiode(valgtStønadskonto).uker * 5 +
                                                        getAntallUkerOgDagerFellesperiode(valgtStønadskonto).dager -
                                                        fordeling.antallDagerSøker1) /
                                                        5,
                                                ),
                                            }}
                                        />
                                    </Heading>
                                )}
                                {fordeling?.antallDagerSøker1 !== undefined && (
                                    <Button
                                        type="button"
                                        variant="tertiary"
                                        size="small"
                                        icon={<PlusIcon aria-hidden />}
                                        aria-label={intl.formatMessage(
                                            { id: 'FordelingSteg.ØkAntallUker' },
                                            { navn: fornavnSøker2 },
                                        )}
                                        onClick={() => {
                                            const maxDager =
                                                getAntallUkerOgDagerFellesperiode(valgtStønadskonto).uker * 5 +
                                                getAntallUkerOgDagerFellesperiode(valgtStønadskonto).dager;
                                            const newValue = Math.min(maxDager, fordeling.antallDagerSøker1 + 5);
                                            lagreFordeling({ antallDagerSøker1: newValue });
                                            lagreUttaksplanOgOppdaterUrl(undefined);
                                        }}
                                        disabled={
                                            fordeling.antallDagerSøker1 >=
                                            getAntallUkerOgDagerFellesperiode(valgtStønadskonto).uker * 5 +
                                                getAntallUkerOgDagerFellesperiode(valgtStønadskonto).dager
                                        }
                                    />
                                )}
                            </VStack>
                        </div>
                    </VStack>
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
