import { MinusIcon, PlusIcon, SectorChartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { usePlanleggerNavigator } from 'appData/usePlanleggerNavigator';
import { useStepData } from 'appData/useStepData';
import { PlanleggerStepPage } from 'components/page/PlanleggerStepPage';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { finnSøker1Tekst, finnSøker2Tekst, getFornavnPåSøker1, getFornavnPåSøker2 } from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { UkerOgDager, getAntallUkerOgDagerFellesperiode } from 'utils/stønadskontoerUtils';
import { finnUttaksdata } from 'utils/uttakUtils';

import { BodyShort, Button, Heading, Spacer, VStack } from '@navikt/ds-react';

import { RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { HvemPlanleggerType, KontoBeregningDto } from '@navikt/fp-types';
import { BluePanel, Infobox } from '@navikt/fp-ui';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { notEmpty } from '@navikt/fp-validation';

import { SliderComponent } from '../../components/slider';
import { FordelingsdetaljerPanel } from './FordelingsdetaljerPanel';

type Fellesperiodefordeling = {
    antallUkerOgDagerSøker1: UkerOgDager;
    antallUkerOgDagerSøker2: UkerOgDager;
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
    const oppdaterUttaksplan = useContextSaveData(ContextDataType.UTTAKSPLAN);

    const formMethods = useForm<Fordeling>({
        defaultValues: fordeling,
    });

    const antallDagerSøker1Temp = formMethods.watch('antallDagerSøker1');
    const antallDagerSøker1 =
        antallDagerSøker1Temp === undefined || antallDagerSøker1Temp === null
            ? undefined
            : Number.parseInt(antallDagerSøker1Temp.toString(), 10);

    const lagre = (formValues: Fordeling) => {
        oppdaterFordeling(formValues);

        if (fordeling && fordeling.antallDagerSøker1 !== formValues.antallDagerSøker1) {
            oppdaterUttaksplan(undefined);
        }

        navigator.goToNextDefaultStep();
    };

    const valgtStønadskonto = stønadskontoer[dekningsgrad];

    const antallUkerOgDagerFellesperiode = getAntallUkerOgDagerFellesperiode(valgtStønadskonto);

    // Sett standardverdi: del likt (8 uker hver, eller halvparten av totalen)
    useEffect(() => {
        const totalDager = antallUkerOgDagerFellesperiode.uker * 5 + antallUkerOgDagerFellesperiode.dager;
        const halvpart = Math.floor(totalDager / 2);
        if (antallDagerSøker1 === undefined) {
            formMethods.setValue('antallDagerSøker1', halvpart, { shouldDirty: false, shouldValidate: false });
        }
    }, [antallUkerOgDagerFellesperiode.uker, antallUkerOgDagerFellesperiode.dager]);

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
                            <VStack gap="space-24">
                                <Heading id="fordeling-slider-label" size="small" level="3">
                                    <FormattedMessage
                                        id="FordelingSteg.FordelingTittel"
                                        values={{
                                            uker: antallUkerOgDagerFellesperiode.uker,
                                            dager: antallUkerOgDagerFellesperiode.dager,
                                        }}
                                    />
                                </Heading>
                                <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4">
                                    <VStack gap="space-8" align="start">
                                        <BodyShort style={{ fontWeight: 600 }}>{fornavnSøker1}</BodyShort>
                                        {antallDagerSøker1 !== undefined && (
                                            <Heading size="small" level="4">
                                                <FormattedMessage
                                                    id="FordelingSteg.Uker"
                                                    values={{ uker: Math.floor(antallDagerSøker1 / 5) }}
                                                />
                                            </Heading>
                                        )}
                                        {antallDagerSøker1 !== undefined && (
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
                                                    const newValue = Math.max(0, antallDagerSøker1 - 5);
                                                    formMethods.setValue('antallDagerSøker1', newValue);
                                                    scrollToBottom();
                                                }}
                                                disabled={antallDagerSøker1 <= 0}
                                            />
                                        )}
                                    </VStack>
                                    <SliderComponent
                                        min={0}
                                        max={
                                            antallUkerOgDagerFellesperiode.uker * 5 +
                                            antallUkerOgDagerFellesperiode.dager
                                        }
                                        step={5}
                                        value={[antallDagerSøker1 ?? 0]}
                                        ariaLabelledby="fordeling-slider-label"
                                        getAriaValueText={(dager1) => {
                                            const total =
                                                antallUkerOgDagerFellesperiode.uker * 5 +
                                                antallUkerOgDagerFellesperiode.dager;
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
                                                formMethods.setValue('antallDagerSøker1', value[0]);
                                                scrollToBottom();
                                            }
                                        }}
                                    />
                                    <VStack gap="space-8" align="end">
                                        <BodyShort style={{ fontWeight: 600 }}>{fornavnSøker2}</BodyShort>
                                        {antallDagerSøker1 !== undefined && (
                                            <Heading size="small" level="4">
                                                <FormattedMessage
                                                    id="FordelingSteg.Uker"
                                                    values={{
                                                        uker: Math.floor(
                                                            (antallUkerOgDagerFellesperiode.uker * 5 +
                                                                antallUkerOgDagerFellesperiode.dager -
                                                                antallDagerSøker1) /
                                                                5,
                                                        ),
                                                    }}
                                                />
                                            </Heading>
                                        )}
                                        {antallDagerSøker1 !== undefined && (
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
                                                        antallUkerOgDagerFellesperiode.uker * 5 +
                                                        antallUkerOgDagerFellesperiode.dager;
                                                    const newValue = Math.min(maxDager, antallDagerSøker1 + 5);
                                                    formMethods.setValue('antallDagerSøker1', newValue);
                                                    scrollToBottom();
                                                }}
                                                disabled={
                                                    antallDagerSøker1 >=
                                                    antallUkerOgDagerFellesperiode.uker * 5 +
                                                        antallUkerOgDagerFellesperiode.dager
                                                }
                                            />
                                        )}
                                    </VStack>
                                </div>
                            </VStack>
                        </BluePanel>
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

export const getFellesperiodefordelingSelectOptions = (
    antallUkerOgDagerFellesperiode: UkerOgDager,
): Fellesperiodefordeling[] => {
    const values = [];
    for (let i = 0; i <= antallUkerOgDagerFellesperiode.uker; i++) {
        const søker1SkalHaDager = antallUkerOgDagerFellesperiode.uker - i >= i;
        const dagerSøker1 = søker1SkalHaDager ? antallUkerOgDagerFellesperiode.dager : 0;
        const dagerSøker2 = søker1SkalHaDager ? 0 : antallUkerOgDagerFellesperiode.dager;
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
