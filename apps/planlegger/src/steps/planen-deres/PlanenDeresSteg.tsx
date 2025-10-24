import { PencilIcon, PersonGroupIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes.ts';
import { usePlanleggerNavigator } from 'appData/usePlanleggerNavigator';
import { useStepData } from 'appData/useStepData';
import { PlanleggerStepPage } from 'components/page/PlanleggerStepPage';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    finnFellesperiodeFordelingOptionTekst,
    getFellesperiodefordelingSelectOptions,
} from 'steps/fordeling/FordelingSteg';
import { Fordeling } from 'types/Fordeling';
import {
    erAlenesøker,
    erMedmorDelAvSøknaden,
    getErFarEllerMedmor,
    getFornavnPåSøker1,
    getFornavnPåSøker2,
    getNavnPåForeldre,
} from 'utils/HvemPlanleggerUtils';
import { harKunFarSøker1Rett, harKunMedmorEllerFarSøker2Rett, utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { getAntallUkerOgDagerFellesperiode } from 'utils/stønadskontoerUtils';
import { finnAntallUkerOgDagerMedForeldrepenger, getFamiliehendelsedato, lagForslagTilPlan } from 'utils/uttakUtils';

import { BodyLong, BodyShort, Button, HStack, Heading, Select, ToggleGroup, VStack } from '@navikt/ds-react';

import { Dekningsgrad, HvemPlanleggerType, KontoBeregningResultatDto } from '@navikt/fp-types';
import { Infobox, StepButtons } from '@navikt/fp-ui';
import { UttaksdagenString } from '@navikt/fp-utils';
import { useMedia } from '@navikt/fp-utils/src/hooks/useMedia';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { UttaksplanKalender } from '@navikt/fp-uttaksplan-ny';
import { notEmpty } from '@navikt/fp-validation';

import { CalendarLabels } from '../../components/labels/CalendarLabels';
import { Arbeidsstatus } from '../../types/Arbeidssituasjon';
import { erBarnetAdoptert, getFamiliesituasjon, mapOmBarnetTilBarn } from '../../utils/barnetUtils';
import { barnehagestartDato } from '../barnehageplass/BarnehageplassSteg';
import { OmÅTilpassePlanen } from './tilpasse-planen/OmÅTilpassePlanen';
import { UforutsetteEndringer } from './uforutsette-endringer/UforutsetteEndringer';

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
    const uttaksplan = useContextGetData(ContextDataType.UTTAKSPLAN) || [];
    const fordeling = useContextGetData(ContextDataType.FORDELING);

    const lagreFordeling = useContextSaveData(ContextDataType.FORDELING);
    const lagreHvorLangPeriode = notEmpty(useContextSaveData(ContextDataType.HVOR_LANG_PERIODE));
    const lagreUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);
    const lagreOriginalUttaksplan = useContextSaveData(ContextDataType.ORIGINAL_UTTAKSPLAN);
    const lagreTilpassPlan = useContextSaveData(ContextDataType.TILPASS_PLAN);

    const stønadskonto100 = stønadskontoer['100'];
    const stønadskonto80 = stønadskontoer['80'];

    const barnehagestartdato = barnehagestartDato(omBarnet);

    const valgtStønadskonto = hvorLangPeriode.dekningsgrad === '100' ? stønadskonto100 : stønadskonto80;

    const antallUkerOgDagerFellesperiode = getAntallUkerOgDagerFellesperiode(valgtStønadskonto);

    const oppdaterPeriodeOgFordeling = (value: Dekningsgrad) => {
        const dekningsgrad = value;
        lagreHvorLangPeriode({ dekningsgrad });
        if (fordeling) {
            lagreFordeling({
                antallDagerSøker1: finnAntallDagerSøker1(dekningsgrad, stønadskontoer, fordeling),
            });
        }
    };

    const oppdaterOgLagreUttaksplan = () => {
        const nyUttaksplan = [...uttaksplan];
        nyUttaksplan.push([...planforslag.søker1, ...planforslag.søker2]);
        return nyUttaksplan;
    };

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const farOgFarKunEnPartHarRett =
        hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR &&
        (hvemHarRett === 'kunSøker1HarRett' || hvemHarRett === 'kunSøker2HarRett');

    const antallUkerOgDager100 = finnAntallUkerOgDagerMedForeldrepenger(stønadskonto100);
    const antallUkerOgDager80 = finnAntallUkerOgDagerMedForeldrepenger(stønadskonto80);
    const familiehendelsedato = getFamiliehendelsedato(omBarnet);

    const erAleneforsørger = erAlenesøker(hvemPlanlegger);

    const bareFarMedmorHarRett =
        harKunMedmorEllerFarSøker2Rett(hvemHarRett, hvemPlanlegger) || harKunFarSøker1Rett(hvemHarRett, hvemPlanlegger);

    let startdato = undefined;

    if (
        (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR ||
            hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_FAR) &&
        hvemHarRett === 'kunSøker2HarRett'
    ) {
        startdato = UttaksdagenString(UttaksdagenString(familiehendelsedato).denneEllerNeste()).leggTil(30);
    }

    const erFarEllerMedmor = getErFarEllerMedmor(hvemPlanlegger, hvemHarRett);

    const planforslag = lagForslagTilPlan({
        erDeltUttak: fordeling !== undefined,
        famDato: familiehendelsedato,
        startdato,
        tilgjengeligeStønadskontoer: valgtStønadskonto.kontoer,
        fellesperiodeDagerMor: fordeling?.antallDagerSøker1,
        bareFarMedmorHarRett,
        erAdopsjon: erBarnetAdoptert(omBarnet),
        erFarEllerMedmor: erFarEllerMedmor,
        erMorUfør: arbeidssituasjon?.status === Arbeidsstatus.UFØR,
        erAleneOmOmsorg:
            hvemPlanlegger.type === HvemPlanleggerType.FAR || hvemPlanlegger.type === HvemPlanleggerType.MOR,
        farOgFar: hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR,
    });

    const fornavnSøker1 = getFornavnPåSøker1(hvemPlanlegger, intl);
    const fornavnSøker2 = getFornavnPåSøker2(hvemPlanlegger, intl);
    const erOversiktSteg = true;
    const isDesktop = useMedia('screen and (min-width: 480)');

    return (
        <form>
            <PlanleggerStepPage steps={stepConfig} goToStep={navigator.goToNextStep}>
                <VStack gap="space-24">
                    <HStack justify="space-between">
                        <Heading size="medium" spacing level="2">
                            <FormattedMessage id="OversiktSteg.Tittel" values={{ erAleneforsørger }} />
                        </Heading>
                        <VStack gap="space-4">
                            <Button
                                size="xsmall"
                                variant="secondary"
                                type="button"
                                icon={<PencilIcon height={24} width={24} fontSize="1-5rem" aria-hidden />}
                                onClick={() => {
                                    lagreUttaksplan(oppdaterOgLagreUttaksplan());
                                    lagreOriginalUttaksplan([...planforslag.søker1, ...planforslag.søker2]);
                                    lagreTilpassPlan(true);
                                    navigator.goToNextStep(PlanleggerRoutes.TILPASS_PLANEN);
                                }}
                            >
                                <FormattedMessage id="OversiktSteg.Infoboks.Tilpass" />
                            </Button>
                        </VStack>
                    </HStack>

                    {farOgFarKunEnPartHarRett && omBarnet.erFødsel && (
                        <Infobox
                            header={<FormattedMessage id="OversiktSteg.Infoboks.FarOgFar.DereHarOppgitt" />}
                            icon={
                                <PersonGroupIcon
                                    height={24}
                                    width={24}
                                    fontSize="1.5rem"
                                    color="var(--ax-bg-accent-strong)"
                                    aria-hidden
                                />
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
                    )}
                    <VStack gap="space-4">
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
                                <Select
                                    defaultValue={fordeling?.antallDagerSøker1}
                                    label="Velg fordeling fellesperiode"
                                    hideLabel
                                    name="antallDagerSøker1"
                                    onChange={(e) => {
                                        lagreFordeling({ antallDagerSøker1: Number.parseInt(e.target.value, 10) });
                                    }}
                                >
                                    {getFellesperiodefordelingSelectOptions(antallUkerOgDagerFellesperiode).map(
                                        (value) => (
                                            <option
                                                key={value.antallUkerOgDagerSøker1.totaltAntallDager}
                                                value={value.antallUkerOgDagerSøker1.totaltAntallDager}
                                            >
                                                {finnFellesperiodeFordelingOptionTekst(
                                                    intl,
                                                    value,
                                                    hvemPlanlegger,
                                                    fornavnSøker1,
                                                    fornavnSøker2,
                                                    erOversiktSteg,
                                                )}
                                            </option>
                                        ),
                                    )}
                                </Select>
                            )}
                    </VStack>

                    <VStack gap="space-20">
                        <div className="max-[479px]:p-0">
                            <UttaksplanDataProvider
                                barn={mapOmBarnetTilBarn(omBarnet)}
                                planleggerLegend={
                                    <CalendarLabels
                                        hvemPlanlegger={hvemPlanlegger}
                                        barnet={omBarnet}
                                        hvemHarRett={hvemHarRett}
                                        uttaksplan={[...planforslag.søker1, ...planforslag.søker2]}
                                    />
                                }
                                barnehagestartdato={barnehagestartdato}
                                familiehendelsedato={familiehendelsedato}
                                modus="planlegger"
                                erAleneOmOmsorg={erAlenesøker(hvemPlanlegger)}
                                erMedmorDelAvSøknaden={erMedmorDelAvSøknaden(hvemPlanlegger)}
                                familiesituasjon={getFamiliesituasjon(omBarnet)}
                                navnPåForeldre={getNavnPåForeldre(hvemPlanlegger, intl)}
                                valgtStønadskonto={valgtStønadskonto}
                            />
                        </div>
                    </VStack>
                    <Infobox
                        header={<FormattedMessage id="OversiktSteg.Infoboks.Utkast" values={{ erAleneforsørger }} />}
                        color="gray"
                        icon={<PencilIcon height={24} width={24} fontSize="1-5rem" aria-hidden />}
                    >
                        <VStack gap="space-8">
                            <BodyLong>
                                <FormattedMessage
                                    id="OversiktSteg.Infoboks.Utkast.Tekst"
                                    values={{ erAleneforsørger }}
                                />
                            </BodyLong>
                            <HStack>
                                <Button
                                    variant="primary"
                                    type="button"
                                    onClick={() => {
                                        lagreUttaksplan(oppdaterOgLagreUttaksplan());
                                        lagreOriginalUttaksplan([...planforslag.søker1, ...planforslag.søker2]);
                                        lagreTilpassPlan(true);
                                        navigator.goToNextStep(PlanleggerRoutes.TILPASS_PLANEN);
                                    }}
                                >
                                    <BodyShort size="small">
                                        <FormattedMessage id="OversiktSteg.Infoboks.TilpassPlanen" />
                                    </BodyShort>
                                </Button>
                            </HStack>
                        </VStack>
                    </Infobox>
                    <VStack gap="space-4">
                        <OmÅTilpassePlanen
                            arbeidssituasjon={arbeidssituasjon}
                            barnet={omBarnet}
                            hvemPlanlegger={hvemPlanlegger}
                        />
                        <UforutsetteEndringer
                            arbeidssituasjon={arbeidssituasjon}
                            hvemPlanlegger={hvemPlanlegger}
                            barnet={omBarnet}
                        />
                    </VStack>
                    <StepButtons
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonOnClick={() => {
                            lagreUttaksplan(oppdaterOgLagreUttaksplan());
                            lagreOriginalUttaksplan([...planforslag.søker1, ...planforslag.søker2]);
                            lagreTilpassPlan(false);
                            navigator.goToNextStep(PlanleggerRoutes.OPPSUMMERING);
                        }}
                        isJumpToEndButton
                        useSimplifiedTexts
                    />
                </VStack>
            </PlanleggerStepPage>
        </form>
    );
};
