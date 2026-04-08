import { SectorChartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { usePlanleggerNavigator } from 'appData/usePlanleggerNavigator';
import { useStepData } from 'appData/useStepData';
import { PlanleggerStepPage } from 'components/page/PlanleggerStepPage';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Fordeling } from 'types/Fordeling';
import { getFornavnPåSøker1, getFornavnPåSøker2 } from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { getAntallUkerOgDagerFellesperiode } from 'utils/stønadskontoerUtils';
import { finnUttaksdata } from 'utils/uttakUtils';

import { BodyShort, Box, Heading, InlineMessage, Spacer, VStack } from '@navikt/ds-react';

import { RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { KontoBeregningDto } from '@navikt/fp-types';
import { BluePanel, Infobox } from '@navikt/fp-ui';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { notEmpty } from '@navikt/fp-validation';

import { FordelingSlider } from '../../components/FordelingSlider';
import { FordelingsdetaljerPanel } from './FordelingsdetaljerPanel';

interface Props {
    stønadskontoer: { '100': KontoBeregningDto; '80': KontoBeregningDto };
}

export const FordelingSteg = ({ stønadskontoer }: Props) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    const fordeling = useContextGetData(ContextDataType.FORDELING);
    const { dekningsgrad } = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE));
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterFordeling = useContextSaveData(ContextDataType.FORDELING);
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const valgtStønadskonto = stønadskontoer[dekningsgrad];
    const antallUkerOgDagerFellesperiode = getAntallUkerOgDagerFellesperiode(valgtStønadskonto);

    // Sett standardverdi: del likt (halvparten av totalen)
    const totalDager = antallUkerOgDagerFellesperiode.uker * 5 + antallUkerOgDagerFellesperiode.dager;
    const halvpart = Math.floor(totalDager / 2);
    const restdager = antallUkerOgDagerFellesperiode.dager;

    const formMethods = useForm<Fordeling>({
        defaultValues: fordeling ?? { antallDagerSøker1: halvpart },
    });

    const antallDagerSøker1Temp = formMethods.watch('antallDagerSøker1');
    const antallDagerSøker1 =
        antallDagerSøker1Temp === undefined || antallDagerSøker1Temp === null
            ? undefined
            : Number(antallDagerSøker1Temp);

    const lagre = (formValues: Fordeling) => {
        oppdaterFordeling(formValues);

        if (fordeling && fordeling.antallDagerSøker1 !== formValues.antallDagerSøker1) {
            oppdaterUttaksplan(undefined);
        }

        navigator.goToNextDefaultStep();
    };

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const uttaksdata100 = finnUttaksdata(hvemHarRett, hvemPlanlegger, valgtStønadskonto, barnet, antallDagerSøker1);
    const uttaksdata80 = finnUttaksdata(hvemHarRett, hvemPlanlegger, valgtStønadskonto, barnet, antallDagerSøker1);

    const fornavnSøker1 = getFornavnPåSøker1(hvemPlanlegger, intl);
    const fornavnSøker2 = getFornavnPåSøker2(hvemPlanlegger, intl);

    const { ref } = useScrollBehaviour();

    return (
        <PlanleggerStepPage ref={ref} steps={stepConfig} goToStep={navigator.goToNextStep}>
            <RhfForm formMethods={formMethods} onSubmit={lagre} shouldUseFlexbox>
                <VStack gap="space-40" style={{ flex: 1 }}>
                    <VStack gap="space-32">
                        <Heading size="medium" spacing level="2">
                            <FormattedMessage id="FordelingSteg.Tittel" />
                        </Heading>
                        <Infobox
                            header={<FormattedMessage id="FordelingSteg.Infoboks.HvordanFordeleTittel" />}
                            icon={
                                <SectorChartIcon
                                    height={24}
                                    width={24}
                                    color="var(--ax-bg-neutral-strong)"
                                    fontSize="1.5rem"
                                    aria-hidden
                                />
                            }
                            color="gray"
                        >
                            <BodyShort>
                                <FormattedMessage
                                    id="FordelingSteg.Infoboks.HvordanFordeleTekst"
                                    values={{
                                        uker: antallUkerOgDagerFellesperiode.uker,
                                        dager: antallUkerOgDagerFellesperiode.dager,
                                        prosent: dekningsgrad,
                                    }}
                                />
                            </BodyShort>
                        </Infobox>
                        <BluePanel isDarkBlue={fordeling === undefined}>
                            <Heading id="fordeling-slider-label" size="small" level="3">
                                <FormattedMessage
                                    id="FordelingSteg.FordelingTittel"
                                    values={{
                                        uker: antallUkerOgDagerFellesperiode.uker,
                                        dager: antallUkerOgDagerFellesperiode.dager,
                                    }}
                                />
                            </Heading>
                            <FordelingSlider
                                antallDagerSøker1={antallDagerSøker1}
                                onAntallDagerSøker1Change={(value) => {
                                    formMethods.setValue('antallDagerSøker1', value);
                                }}
                                antallUkerOgDagerFellesperiode={antallUkerOgDagerFellesperiode}
                                fornavnSøker1={fornavnSøker1}
                                fornavnSøker2={fornavnSøker2}
                            />
                        </BluePanel>
                        {restdager > 0 && (
                            <Box paddingInline="space-16">
                                <InlineMessage status="info">
                                    <BodyShort size="small" className="text-text-subtle">
                                        {restdager === 1 ? (
                                            <FormattedMessage id="FordelingSteg.EkstraDagInfo.EnDag" />
                                        ) : (
                                            <FormattedMessage id="FordelingSteg.EkstraDagInfo.FlereDager" />
                                        )}
                                    </BodyShort>
                                </InlineMessage>
                            </Box>
                        )}
                        {antallDagerSøker1 !== undefined && (
                            <FordelingsdetaljerPanel
                                barnet={barnet}
                                hvemPlanlegger={hvemPlanlegger}
                                fornavnSøker1={fornavnSøker1}
                                fornavnSøker2={fornavnSøker2}
                                uttaksdata={dekningsgrad === '100' ? uttaksdata100 : uttaksdata80}
                            />
                        )}
                    </VStack>
                    <Spacer />
                    <StepButtonsHookForm<Fordeling>
                        saveDataOnPreviousClick={oppdaterFordeling}
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        useSimplifiedTexts
                    />
                </VStack>
            </RhfForm>
        </PlanleggerStepPage>
    );
};
