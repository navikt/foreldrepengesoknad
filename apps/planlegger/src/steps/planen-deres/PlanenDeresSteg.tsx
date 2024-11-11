import { PersonGroupIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import CalendarLabels from 'components/labels/CalendarLabels';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    finnFellesperiodeFordelingOptionTekst,
    getFellesperiodefordelingSelectOptions,
} from 'steps/fordeling/FordelingSteg';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { Fordeling } from 'types/Fordeling';
import { Situasjon } from 'types/HvemPlanlegger';
import { erAlenesøker, getFornavnPåSøker1, getFornavnPåSøker2 } from 'utils/HvemPlanleggerUtils';
import { harKunFarSøker1Rett, harKunMedmorEllerFarSøker2Rett, utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { getAntallUkerOgDagerFellesperiode } from 'utils/stønadskontoerUtils';
import { finnAntallUkerOgDagerMedForeldrepenger, getFamiliehendelsedato, lagForslagTilPlan } from 'utils/uttakUtils';

import { BodyShort, HStack, Heading, Select, ToggleGroup, VStack } from '@navikt/ds-react';

import { LocaleAll, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { Calendar, Infobox, StepButtons } from '@navikt/fp-ui';
import { UttaksdagenString } from '@navikt/fp-utils';
import { useMedia } from '@navikt/fp-utils/src/hooks/useMedia';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { sorterPerioder } from '@navikt/fp-uttaksplan-ny';
import { notEmpty } from '@navikt/fp-validation';

import { Arbeidsstatus } from '../../types/Arbeidssituasjon';
import { erBarnetAdoptert } from '../../utils/barnetUtils';
import { barnehagestartDato } from '../barnehageplass/BarnehageplassSteg';
import styles from './planenDeresSteg.module.css';
import OmÅTilpassePlanen from './tilpasse-planen/OmÅTilpassePlanen';
import UforutsetteEndringer from './uforutsette-endringer/UforutsetteEndringer';

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
    locale: LocaleAll;
}

const PlanenDeresSteg: FunctionComponent<Props> = ({ stønadskontoer, locale }) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator(locale);
    const stepConfig = useStepData();

    useScrollBehaviour();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const hvorLangPeriode = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const fordeling = useContextGetData(ContextDataType.FORDELING);

    const lagreFordeling = useContextSaveData(ContextDataType.FORDELING);
    const lagreHvorLangPeriode = notEmpty(useContextSaveData(ContextDataType.HVOR_LANG_PERIODE));

    const stønadskonto100 = stønadskontoer[Dekningsgrad.HUNDRE_PROSENT];
    const stønadskonto80 = stønadskontoer[Dekningsgrad.ÅTTI_PROSENT];

    const valgtStønadskonto =
        hvorLangPeriode.dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? stønadskonto100 : stønadskonto80;

    const antallUkerOgDagerFellesperiode = getAntallUkerOgDagerFellesperiode(valgtStønadskonto);
    const barnehageplassdato = barnehagestartDato(omBarnet);

    const oppdaterPeriodeOgFordeling = (value: string) => {
        const dekningsgrad = value as Dekningsgrad;
        lagreHvorLangPeriode({ dekningsgrad });
        if (fordeling) {
            lagreFordeling({
                antallDagerSøker1: finnAntallDagerSøker1(dekningsgrad, stønadskontoer, fordeling),
            });
        }
    };

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const farOgFarKunEnPartHarRett =
        hvemPlanlegger.type === Situasjon.FAR_OG_FAR &&
        (hvemHarRett === 'kunSøker1HarRett' || hvemHarRett === 'kunSøker2HarRett');

    const antallUkerOgDager100 = finnAntallUkerOgDagerMedForeldrepenger(stønadskonto100);
    const antallUkerOgDager80 = finnAntallUkerOgDagerMedForeldrepenger(stønadskonto80);
    const familiehendelsedato = getFamiliehendelsedato(omBarnet);

    const erAleneforsørger = erAlenesøker(hvemPlanlegger);

    const bareFarMedmorHarRett =
        harKunMedmorEllerFarSøker2Rett(hvemHarRett, hvemPlanlegger) || harKunFarSøker1Rett(hvemHarRett, hvemPlanlegger);

    const getErFarEllerMedmor = () => {
        if (
            hvemPlanlegger.type === Situasjon.FAR ||
            (hvemPlanlegger.type === Situasjon.MOR_OG_FAR && hvemHarRett === 'kunSøker2HarRett') ||
            hvemPlanlegger.type === Situasjon.FAR_OG_FAR ||
            (hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR && hvemHarRett === 'kunSøker2HarRett')
        ) {
            return true;
        }

        return false;
    };

    let startdato = undefined;

    if (
        (hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR || hvemPlanlegger.type === Situasjon.MOR_OG_FAR) &&
        hvemHarRett === 'kunSøker2HarRett'
    ) {
        startdato = UttaksdagenString(familiehendelsedato).leggTil(30);
    }

    const planforslag = lagForslagTilPlan({
        erDeltUttak: fordeling !== undefined,
        famDato: familiehendelsedato,
        startdato,
        tilgjengeligeStønadskontoer: valgtStønadskonto.kontoer,
        fellesperiodeDagerMor: fordeling?.antallDagerSøker1,
        bareFarMedmorHarRett,
        erAdopsjon: erBarnetAdoptert(omBarnet),
        erFarEllerMedmor: getErFarEllerMedmor(),
        erMorUfør: arbeidssituasjon?.status === Arbeidsstatus.UFØR,
        erAleneOmOmsorg: hvemPlanlegger.type === Situasjon.FAR || hvemPlanlegger.type === Situasjon.MOR,
    });
    const kombinertPlanforslag = [...planforslag.søker1, ...planforslag.søker2].sort(sorterPerioder);

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
                        {/* <VStack gap="1">
                            <Button
                                size="xsmall"
                                variant="secondary"
                                icon={<PencilIcon height={24} width={24} fontSize="1-5rem" aria-hidden />}
                            >
                                <FormattedMessage id="OversiktSteg.Infoboks.Tilpass" />
                            </Button>
                        </VStack> */}
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
                            (!omBarnet.erFødsel || hvemPlanlegger.type !== Situasjon.FAR_OG_FAR) && (
                                <Select
                                    defaultValue={fordeling?.antallDagerSøker1}
                                    label={''}
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
                        <CalendarLabels hvemPlanlegger={hvemPlanlegger} barnet={omBarnet} hvemHarRett={hvemHarRett} />
                    </VStack>

                    <VStack gap="5">
                        <div className={styles.calendar}>
                            <Calendar
                                periods={kombinertPlanforslag}
                                barnehageplassdato={barnehageplassdato}
                                familiehendelsedato={familiehendelsedato}
                            />
                        </div>
                    </VStack>
                    {/* <Infobox
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
                                <Button variant="primary">
                                    <BodyShort size="small">
                                        <FormattedMessage id="OversiktSteg.Infoboks.TilpassPlanen" />
                                    </BodyShort>
                                </Button>
                            </HStack>
                        </VStack>
                    </Infobox> */}
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
                        nextButtonOnClick={navigator.goToNextDefaultStep}
                        useSimplifiedTexts
                    />
                </VStack>
            </PlanleggerStepPage>
        </form>
    );
};

export default PlanenDeresSteg;
