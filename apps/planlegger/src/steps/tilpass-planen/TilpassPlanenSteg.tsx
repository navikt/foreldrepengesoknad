import { ArrowRedoIcon, TrashIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import CalendarLabels from 'components/labels/CalendarLabels';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { erAlenesøker, getNavnPåSøker1, getNavnPåSøker2 } from 'utils/HvemPlanleggerUtils';
import { harKunFarSøker1Rett, harKunMedmorEllerFarSøker2Rett, utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { getFamiliehendelsedato, lagForslagTilPlan } from 'utils/uttakUtils';

import { Button, HStack, Heading, VStack } from '@navikt/ds-react';

import { BarnType } from '@navikt/fp-constants';
import { LocaleAll, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { Calendar, StepButtons } from '@navikt/fp-ui';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { UttaksplanNy, sorterPerioder } from '@navikt/fp-uttaksplan-ny';
import { notEmpty } from '@navikt/fp-validation';

import PlanvisningToggle, { Visningsmodus } from '../../components/planvisning-toggle/PlanvisningToggle';
import { Arbeidsstatus } from '../../types/Arbeidssituasjon';
import { Situasjon } from '../../types/HvemPlanlegger';
import { erBarnetAdoptert, getFamiliesituasjon } from '../../utils/barnetUtils';
import { barnehagestartDato } from '../barnehageplass/BarnehageplassSteg';
import HvaErMulig from './hva-er-mulig/HvaErMulig';
import styles from './tilpassPlanenSteg.module.css';

interface Props {
    stønadskontoer: TilgjengeligeStønadskontoer;
    locale: LocaleAll;
}

const TilpassPlanenSteg: FunctionComponent<Props> = ({ stønadskontoer, locale }) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator(locale);
    const stepConfig = useStepData();
    const [visningsmodus, setVisningsmodus] = useState<Visningsmodus>('kalender');

    useScrollBehaviour();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const hvorLangPeriode = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const fordeling = useContextGetData(ContextDataType.FORDELING);

    const stønadskonto100 = stønadskontoer[Dekningsgrad.HUNDRE_PROSENT];
    const stønadskonto80 = stønadskontoer[Dekningsgrad.ÅTTI_PROSENT];

    const valgtStønadskonto =
        hvorLangPeriode.dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? stønadskonto100 : stønadskonto80;

    const familiesituasjon = getFamiliesituasjon(omBarnet);
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const barnehageplassdato = barnehagestartDato(omBarnet);

    const familiehendelsedato = getFamiliehendelsedato(omBarnet);

    const erAleneforsørger = erAlenesøker(hvemPlanlegger);

    const bareFarMedmorHarRett =
        harKunMedmorEllerFarSøker2Rett(hvemHarRett, hvemPlanlegger) || harKunFarSøker1Rett(hvemHarRett, hvemPlanlegger);

    const planforslag = lagForslagTilPlan({
        erDeltUttak: fordeling !== undefined,
        famDato: familiehendelsedato,
        tilgjengeligeStønadskontoer: valgtStønadskonto.kontoer,
        fellesperiodeDagerMor: fordeling?.antallDagerSøker1,
        bareFarMedmorHarRett,
        erAdopsjon: erBarnetAdoptert(omBarnet),
        erFarEllerMedmor: true,
        erMorUfør: arbeidssituasjon?.status === Arbeidsstatus.UFØR,
        erAleneOmOmsorg: hvemPlanlegger.type === Situasjon.FAR || hvemPlanlegger.type === Situasjon.MOR,
    });
    const kombinertPlanforslag = [...planforslag.søker1, ...planforslag.søker2].sort(sorterPerioder);

    return (
        <form>
            <PlanleggerStepPage steps={stepConfig} goToStep={navigator.goToNextStep}>
                <VStack gap="6">
                    <Heading size="medium" spacing level="2">
                        <FormattedMessage id="TilpassPlanenSteg.Tittel" values={{ erAleneforsørger }} />
                    </Heading>

                    <VStack gap="5">
                        <HvaErMulig
                            hvemPlanlegger={hvemPlanlegger}
                            arbeidssituasjon={arbeidssituasjon}
                            barnet={omBarnet}
                        />

                        <VStack gap="10">
                            <PlanvisningToggle setVisningsmodus={setVisningsmodus} />

                            {visningsmodus === 'kalender' && (
                                <CalendarLabels
                                    hvemPlanlegger={hvemPlanlegger}
                                    barnet={omBarnet}
                                    hvemHarRett={hvemHarRett}
                                />
                            )}
                        </VStack>
                        {visningsmodus === 'liste' && (
                            <UttaksplanNy
                                familiehendelsedato={familiehendelsedato}
                                bareFarHarRett={bareFarMedmorHarRett}
                                erFarEllerMedmor={false}
                                familiesituasjon={familiesituasjon}
                                gjelderAdopsjon={familiesituasjon === 'adopsjon'}
                                navnPåForeldre={{
                                    farMedmor: getNavnPåSøker2(hvemPlanlegger, intl) || 'Annen forelder',
                                    mor: getNavnPåSøker1(hvemPlanlegger, intl),
                                }}
                                førsteUttaksdagNesteBarnsSak={undefined}
                                harAktivitetskravIPeriodeUtenUttak={false}
                                søkersPerioder={planforslag.søker1}
                                annenPartsPerioder={planforslag.søker2}
                                barn={{
                                    antallBarn: 1,
                                    type: BarnType.FØDT,
                                    fødselsdatoer: [familiehendelsedato],
                                    termindato: familiehendelsedato,
                                }}
                            />
                        )}
                    </VStack>

                    <VStack gap="5">
                        {visningsmodus === 'kalender' && (
                            <div className={styles.calendar}>
                                <Calendar
                                    periods={kombinertPlanforslag}
                                    barnehageplassdato={barnehageplassdato}
                                    familiehendelsedato={familiehendelsedato}
                                />
                            </div>
                        )}
                        <HStack gap="4">
                            <Button
                                size="xsmall"
                                variant="secondary"
                                icon={<ArrowRedoIcon aria-hidden height={24} width={24} />}
                            >
                                <FormattedMessage id="TilpassPlanenSteg.Tilbakestill" />
                            </Button>
                            <Button
                                size="xsmall"
                                variant="secondary"
                                icon={<TrashIcon aria-hidden height={24} width={24} />}
                            >
                                <FormattedMessage id="TilpassPlanenSteg.FjernAlt" />
                            </Button>
                        </HStack>
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

export default TilpassPlanenSteg;
