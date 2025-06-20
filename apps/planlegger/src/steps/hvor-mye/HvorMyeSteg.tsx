import { SackKronerIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { usePlanleggerNavigator } from 'appData/usePlanleggerNavigator';
import { useStepData } from 'appData/useStepData';
import { PlanleggerStepPage } from 'components/page/PlanleggerStepPage';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { HvorMye } from 'types/HvorMye';
import { erAlenesøker, getFornavnPåSøker1, getFornavnPåSøker2 } from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyShort, Heading, Link, Spacer, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { RhfForm, RhfTextField, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Satser } from '@navikt/fp-types';
import { BluePanel, Infobox } from '@navikt/fp-ui';
import { isValidNumberForm, notEmpty } from '@navikt/fp-validation';

import { Utbetaling } from './infoboks/Utbetaling';

interface Props {
    satser: Satser;
}

export const HvorMyeSteg = ({ satser }: Props) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    const hvorMye = useContextGetData(ContextDataType.HVOR_MYE);
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);

    const kunEnAvSøkereneHarRett = hvemHarRett === 'kunSøker1HarRett' || hvemHarRett === 'kunSøker2HarRett';
    const erAleneforsørger = erAlenesøker(hvemPlanlegger);

    const fornavnSøker1 = getFornavnPåSøker1(hvemPlanlegger, intl);
    const fornavnSøker2 = getFornavnPåSøker2(hvemPlanlegger, intl);

    const oppdaterHvorMye = useContextSaveData(ContextDataType.HVOR_MYE);

    const formMethods = useForm<HvorMye>({ defaultValues: hvorMye });

    const lønnSøker1 = formMethods.watch('lønnSøker1');
    const lønnSøker2 = formMethods.watch('lønnSøker2');

    const erValidLønn = (verdi: any): boolean => {
        if (!verdi) return false;
        const strVerdi = String(verdi);
        return strVerdi.length >= 3 && /^\d+$/.test(strVerdi);
    };

    const lønnSøker1Valid = erValidLønn(lønnSøker1);
    const lønnSøker2Valid = erValidLønn(lønnSøker2);

    const onSubmit = (formValues: HvorMye) => {
        oppdaterHvorMye(formValues);
        navigator.goToNextStep(PlanleggerRoutes.HVOR_LANG_PERIODE);
    };

    return (
        <PlanleggerStepPage steps={stepConfig} goToStep={navigator.goToNextStep}>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
                    <VStack gap="6">
                        <Heading size="medium" spacing level="2">
                            <FormattedMessage id="HvorMyeSteg.Tittel" />
                        </Heading>
                        <VStack gap="2">
                            <BluePanel isDarkBlue={true}>
                                <RhfTextField
                                    name={hvemHarRett === 'kunSøker2HarRett' ? 'lønnSøker2' : 'lønnSøker1'}
                                    control={formMethods.control}
                                    label={
                                        hvemHarRett === 'kunSøker2HarRett' ? (
                                            <FormattedMessage id="HvorMyeSteg.Lønn" values={{ hvem: fornavnSøker2 }} />
                                        ) : (
                                            <FormattedMessage id="HvorMyeSteg.Lønn" values={{ hvem: fornavnSøker1 }} />
                                        )
                                    }
                                    validate={[isValidNumberForm(intl.formatMessage({ id: 'Validering.ValidNumber' }))]}
                                    description={intl.formatMessage({ id: 'HvorMyeSteg.LønnBeskrivelse' })}
                                />
                            </BluePanel>
                            {lønnSøker1Valid && (
                                <Utbetaling
                                    lønnSøker={Number(lønnSøker1)}
                                    satser={satser}
                                    fornavn={
                                        hvemHarRett === 'kunSøker2HarRett'
                                            ? (fornavnSøker2 ?? '')
                                            : (fornavnSøker1 ?? '')
                                    }
                                />
                            )}
                        </VStack>
                        {!kunEnAvSøkereneHarRett && fornavnSøker2 && (
                            <VStack gap="2">
                                <BluePanel isDarkBlue={true}>
                                    <RhfTextField
                                        name="lønnSøker2"
                                        control={formMethods.control}
                                        label={
                                            <FormattedMessage
                                                id="HvorMyeSteg.Lønn"
                                                values={{ hvem: getFornavnPåSøker2(hvemPlanlegger, intl) }}
                                            />
                                        }
                                        validate={[
                                            isValidNumberForm(intl.formatMessage({ id: 'Validering.ValidNumber' })),
                                        ]}
                                        description={intl.formatMessage({ id: 'HvorMyeSteg.LønnBeskrivelse' })}
                                    />
                                </BluePanel>
                                {lønnSøker2Valid && (
                                    <Utbetaling
                                        satser={satser}
                                        lønnSøker={Number(lønnSøker2)}
                                        fornavn={fornavnSøker2}
                                    />
                                )}
                            </VStack>
                        )}
                        <VStack gap="2">
                            <Infobox
                                header={<FormattedMessage id="HvorMyeSteg.ViteMer" values={{ erAleneforsørger }} />}
                                icon={
                                    <SackKronerIcon
                                        height={24}
                                        width={24}
                                        color="#020C1CAD"
                                        fontSize="1.5rem"
                                        aria-hidden
                                    />
                                }
                                color="gray"
                            >
                                <BodyShort>
                                    <FormattedMessage
                                        id="HvorMyeSteg.MerDetaljert"
                                        values={{
                                            a: (msg: any) => (
                                                <Link href={links.hvorMye} target="_blank" rel="noreferrer" inlineText>
                                                    {msg}
                                                </Link>
                                            ),
                                        }}
                                    />
                                </BodyShort>
                            </Infobox>
                        </VStack>
                    </VStack>

                    <Spacer />
                    <StepButtonsHookForm<HvorMye>
                        saveDataOnPreviousClick={oppdaterHvorMye}
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        useSimplifiedTexts
                    />
                </VStack>
            </RhfForm>
        </PlanleggerStepPage>
    );
};
