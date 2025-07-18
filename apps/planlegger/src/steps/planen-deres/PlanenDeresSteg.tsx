import { PencilIcon, PersonGroupIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { usePlanleggerNavigator } from 'appData/usePlanleggerNavigator';
import { useStepData } from 'appData/useStepData';
import { PlanleggerStepPage } from 'components/page/PlanleggerStepPage';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    finnFellesperiodeFordelingOptionTekst,
    getFellesperiodefordelingSelectOptions,
} from 'steps/fordeling/FordelingSteg';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { Fordeling } from 'types/Fordeling';
import { erAlenesøker, getErFarEllerMedmor, getFornavnPåSøker1, getFornavnPåSøker2 } from 'utils/HvemPlanleggerUtils';
import { harKunFarSøker1Rett, harKunMedmorEllerFarSøker2Rett, utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { getAntallUkerOgDagerFellesperiode } from 'utils/stønadskontoerUtils';
import { finnAntallUkerOgDagerMedForeldrepenger, getFamiliehendelsedato, lagForslagTilPlan } from 'utils/uttakUtils';

import { BodyLong, BodyShort, Button, HStack, Heading, Select, ToggleGroup, VStack } from '@navikt/ds-react';

import { HvemPlanleggerType, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { Infobox, StepButtons } from '@navikt/fp-ui';
import { UttaksdagenString } from '@navikt/fp-utils';
import { useMedia } from '@navikt/fp-utils/src/hooks/useMedia';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { UttaksplanKalender } from '@navikt/fp-uttaksplan-kalender-ny';
import { notEmpty } from '@navikt/fp-validation';

import { PlanleggerRoutes } from '../../app-data/routes';
import { CalendarLabels } from '../../components/labels/CalendarLabels';
import { Arbeidsstatus } from '../../types/Arbeidssituasjon';
import { erBarnetAdoptert, mapOmBarnetTilBarn } from '../../utils/barnetUtils';
import { barnehagestartDato } from '../barnehageplass/BarnehageplassSteg';
import styles from './planenDeresSteg.module.css';
import { OmÅTilpassePlanen } from './tilpasse-planen/OmÅTilpassePlanen';
import { UforutsetteEndringer } from './uforutsette-endringer/UforutsetteEndringer';

const finnAntallDagerSøker1 = (
    dekningsgrad: Dekningsgrad,
    stønadskontoer: TilgjengeligeStønadskontoer,
    fordeling: Fordeling,
) => {
    const ukerOgDagerFellesperiode = getAntallUkerOgDagerFellesperiode(
        dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? stønadskontoer[Dekningsgrad.HUNDRE_PROSENT]
            : stønadskontoer[Dekningsgrad.ÅTTI_PROSENT],
    );
    return fordeling.antallDagerSøker1 > ukerOgDagerFellesperiode.totaltAntallDager
        ? ukerOgDagerFellesperiode.totaltAntallDager
        : fordeling.antallDagerSøker1;
};

interface Props {
    stønadskontoer: TilgjengeligeStønadskontoer;
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

    const stønadskonto100 = stønadskontoer[Dekningsgrad.HUNDRE_PROSENT];
    const stønadskonto80 = stønadskontoer[Dekningsgrad.ÅTTI_PROSENT];

    const barnehagestartdato = barnehagestartDato(omBarnet);

    const valgtStønadskonto =
        hvorLangPeriode.dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? stønadskonto100 : stønadskonto80;

    const antallUkerOgDagerFellesperiode = getAntallUkerOgDagerFellesperiode(valgtStønadskonto);

    const oppdaterPeriodeOgFordeling = (value: string) => {
        const dekningsgrad = value as Dekningsgrad;
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
                <VStack gap="6">
                    <HStack justify="space-between">
                        <Heading size="medium" spacing level="2">
                            <FormattedMessage id="OversiktSteg.Tittel" values={{ erAleneforsørger }} />
                        </Heading>
                        <VStack gap="1">
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
                                <PersonGroupIcon height={24} width={24} fontSize="1.5rem" color="#0067C5" aria-hidden />
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
                    <VStack gap="1">
                        <ToggleGroup
                            defaultValue={hvorLangPeriode?.dekningsgrad}
                            size={isDesktop ? 'medium' : 'small'}
                            variant="neutral"
                            onChange={oppdaterPeriodeOgFordeling}
                            style={{ width: '100%' }}
                        >
                            <ToggleGroup.Item value={Dekningsgrad.HUNDRE_PROSENT}>
                                <FormattedMessage
                                    id="OversiktSteg.100"
                                    values={{
                                        uker: antallUkerOgDager100.uker,
                                        dager: antallUkerOgDager100.dager,
                                    }}
                                />
                            </ToggleGroup.Item>
                            <ToggleGroup.Item value={Dekningsgrad.ÅTTI_PROSENT}>
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
                                        lagreFordeling({ antallDagerSøker1: parseInt(e.target.value, 10) });
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

                    <VStack gap="5">
                        <div className={styles.calendar}>
                            <UttaksplanKalender
                                bareFarMedmorHarRett={bareFarMedmorHarRett}
                                erFarEllerMedmor={erFarEllerMedmor}
                                harAktivitetskravIPeriodeUtenUttak={false}
                                søkersPerioder={planforslag.søker1}
                                annenPartsPerioder={planforslag.søker2}
                                navnAnnenPart="Test"
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
                            />
                        </div>
                    </VStack>
                    <Infobox
                        header={<FormattedMessage id="OversiktSteg.Infoboks.Utkast" values={{ erAleneforsørger }} />}
                        color="gray"
                        icon={<PencilIcon height={24} width={24} fontSize="1-5rem" aria-hidden />}
                    >
                        <VStack gap="2">
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
                    <VStack gap="1">
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
