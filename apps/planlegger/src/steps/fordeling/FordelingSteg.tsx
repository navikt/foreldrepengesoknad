import { SectorChartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { usePlanleggerNavigator } from 'appData/usePlanleggerNavigator';
import { useStepData } from 'appData/useStepData';
import { PlanleggerStepPage } from 'components/page/PlanleggerStepPage';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { finnSøker1Tekst, finnSøker2Tekst, getFornavnPåSøker1, getFornavnPåSøker2 } from 'utils/HvemPlanleggerUtils';
import { formatError } from 'utils/customErrorFormatter';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { UkerOgDager, getAntallUkerOgDagerFellesperiode } from 'utils/stønadskontoerUtils';
import { finnUttaksdata } from 'utils/uttakUtils';

import { BodyShort, Heading, Spacer, VStack } from '@navikt/ds-react';

import { RhfForm, RhfSelect, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { HvemPlanleggerType, KontoBeregningDto } from '@navikt/fp-types';
import { BluePanel, Infobox } from '@navikt/fp-ui';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { FordelingsdetaljerPanel } from './FordelingsdetaljerPanel';

type Fellesperiodefordeling = {
    antallUkerOgDagerSøker1: UkerOgDager;
    antallUkerOgDagerSøker2: UkerOgDager;
};

export const getFellesperiodefordelingSelectOptions = (
    antallUkerOgDagerFellesperiode: UkerOgDager,
): Fellesperiodefordeling[] => {
    const values = [];
    for (let i = 0; i <= antallUkerOgDagerFellesperiode.uker; i++) {
        const søker1SkalHaDager = antallUkerOgDagerFellesperiode.uker - i >= i;
        const dagerSøker1 = søker1SkalHaDager ? antallUkerOgDagerFellesperiode.dager : 0;
        const dagerSøker2 = !søker1SkalHaDager ? antallUkerOgDagerFellesperiode.dager : 0;
        values.push({
            antallUkerOgDagerSøker1: {
                uker: antallUkerOgDagerFellesperiode.uker - i,
                dager: søker1SkalHaDager ? antallUkerOgDagerFellesperiode.dager : 0,
                totaltAntallDager: (antallUkerOgDagerFellesperiode.uker - i) * 5 + dagerSøker1,
            },
            antallUkerOgDagerSøker2: {
                uker: i,
                dager: søker1SkalHaDager ? 0 : antallUkerOgDagerFellesperiode.dager,
                totaltAntallDager: i * 5 + dagerSøker2,
            },
        });
    }
    return values;
};

export const finnFellesperiodeFordelingOptionTekst = (
    intl: IntlShape,
    value: Fellesperiodefordeling,
    hvemPlanlegger: HvemPlanlegger,
    fornavnSøker1?: string,
    fornavnSøker2?: string,
    erOversiktSteg?: boolean,
) => {
    const erFarOgFar = hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR;
    const søker1Tekst = erFarOgFar && fornavnSøker1 ? fornavnSøker1 : finnSøker1Tekst(intl, hvemPlanlegger);
    const søker2Tekst = erFarOgFar && fornavnSøker2 ? fornavnSøker2 : finnSøker2Tekst(intl, hvemPlanlegger);

    if (value.antallUkerOgDagerSøker1.uker === 0) {
        return (
            <FormattedMessage
                id="FordelingSteg.FordelingOptionAlt"
                values={{
                    hvem: søker2Tekst,
                    uker: value.antallUkerOgDagerSøker2.uker,
                    dager: value.antallUkerOgDagerSøker2.dager,
                    erOversiktSteg,
                }}
            />
        );
    }
    if (value.antallUkerOgDagerSøker2.uker === 0) {
        return (
            <FormattedMessage
                id="FordelingSteg.FordelingOptionAlt"
                values={{
                    hvem: søker1Tekst,
                    uker: value.antallUkerOgDagerSøker1.uker,
                    dager: value.antallUkerOgDagerSøker1.dager,
                    erOversiktSteg,
                }}
            />
        );
    }
    return (
        <FormattedMessage
            id="FordelingSteg.FordelingOptions"
            values={{
                hvem: søker1Tekst,
                hvem2: søker2Tekst,
                uker: value.antallUkerOgDagerSøker1.uker,
                dagerS1: value.antallUkerOgDagerSøker1.dager,
                uker2: value.antallUkerOgDagerSøker2.uker,
                dagerS2: value.antallUkerOgDagerSøker2.dager,
                erOversiktSteg,
            }}
        />
    );
};

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

    const formMethods = useForm<Fordeling>({
        defaultValues: fordeling,
    });

    // TODO FIX string => number
    const antallDagerSøker1Temp = formMethods.watch('antallDagerSøker1');
    const antallDagerSøker1 = antallDagerSøker1Temp ? Number.parseInt(antallDagerSøker1Temp.toString(), 10) : undefined;

    const lagre = (formValues: Fordeling) => {
        oppdaterFordeling(formValues);
        navigator.goToNextDefaultStep();
    };

    const valgtStønadskonto = stønadskontoer[dekningsgrad];

    const antallUkerOgDagerFellesperiode = getAntallUkerOgDagerFellesperiode(valgtStønadskonto);

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const uttaksdata100 = finnUttaksdata(hvemHarRett, hvemPlanlegger, valgtStønadskonto, barnet, antallDagerSøker1);
    const uttaksdata80 = finnUttaksdata(hvemHarRett, hvemPlanlegger, valgtStønadskonto, barnet, antallDagerSøker1);

    const fornavnSøker1 = getFornavnPåSøker1(hvemPlanlegger, intl);
    const fornavnSøker2 = getFornavnPåSøker2(hvemPlanlegger, intl);

    const { ref, scrollToBottom } = useScrollBehaviour();

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
                            <RhfSelect
                                name="antallDagerSøker1"
                                control={formMethods.control}
                                label={
                                    <FormattedMessage
                                        id="FordelingSteg.FordelingTittel"
                                        values={{
                                            uker: antallUkerOgDagerFellesperiode.uker,
                                            dager: antallUkerOgDagerFellesperiode.dager,
                                        }}
                                    />
                                }
                                autofocusWhenEmpty
                                validate={[
                                    isRequired(intl.formatMessage({ id: 'FordelingSteg.FordelingTittel.Required' })),
                                ]}
                                customErrorFormatter={formatError}
                                onChange={scrollToBottom}
                            >
                                {getFellesperiodefordelingSelectOptions(antallUkerOgDagerFellesperiode).map((value) => (
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
                                        )}
                                    </option>
                                ))}
                            </RhfSelect>
                        </BluePanel>
                        {antallDagerSøker1 !== undefined && (
                            <FordelingsdetaljerPanel
                                key={antallDagerSøker1}
                                barnet={barnet}
                                hvemPlanlegger={hvemPlanlegger}
                                fornavnSøker1={fornavnSøker1}
                                fornavnSøker2={fornavnSøker2}
                                uttaksdata={dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? uttaksdata100 : uttaksdata80}
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
