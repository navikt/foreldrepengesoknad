import { SackKronerIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { HvorMye } from 'types/HvorMye';
import { erAlenesøker, getFornavnPåSøker1, getFornavnPåSøker2 } from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyShort, Heading, Spacer, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { RhfForm, RhfTextField, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { LocaleAll, Satser } from '@navikt/fp-types';
import { BluePanel, Infobox } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import Utbetaling from './infoboks/Utbetaling';

interface Props {
    locale: LocaleAll;
    satser: Satser;
}

const HvorMyeSteg: FunctionComponent<Props> = ({ locale, satser }) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator(locale);
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

    const formMethods = useForm<HvorMye>({ defaultValues: useContextGetData(ContextDataType.HVOR_MYE) });

    const onSubmit = (formValues: HvorMye) => {
        oppdaterHvorMye(formValues);
        const lønnSøker1 = formValues.lønnSøker1;
        const lønnSøker2 = formValues.lønnSøker2;

        if (lønnSøker1 !== undefined && lønnSøker2 !== undefined) {
            navigator.goToNextStep(PlanleggerRoutes.HVOR_LANG_PERIODE);
        }
        if (lønnSøker1 !== undefined && !lønnSøker2) {
            navigator.goToNextStep(PlanleggerRoutes.HVOR_LANG_PERIODE);
        }
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
                                    label={
                                        <FormattedMessage
                                            id="HvorMyeSteg.Lønn"
                                            values={{
                                                hvem: fornavnSøker1,
                                            }}
                                        />
                                    }
                                    name="lønnSøker1"
                                    onChange={(lønnSøker1) => oppdaterHvorMye({ ...hvorMye, lønnSøker1 })}
                                />
                            </BluePanel>
                            {hvorMye && hvorMye.lønnSøker1 && hvorMye.lønnSøker1 !== undefined && (
                                <>
                                    <Utbetaling
                                        lønnSøker={hvorMye.lønnSøker1}
                                        satser={satser}
                                        fornavn={fornavnSøker1}
                                    />
                                </>
                            )}
                        </VStack>
                        <VStack gap="2">
                            {!kunEnAvSøkereneHarRett && fornavnSøker2 && (
                                <>
                                    <BluePanel isDarkBlue={true}>
                                        <RhfTextField
                                            label={
                                                <FormattedMessage
                                                    id="HvorMyeSteg.Lønn"
                                                    values={{ hvem: getFornavnPåSøker2(hvemPlanlegger, intl) }}
                                                />
                                            }
                                            name="lønnSøker2"
                                            onChange={(lønnSøker2) => oppdaterHvorMye({ ...hvorMye, lønnSøker2 })}
                                        />
                                    </BluePanel>
                                    {hvorMye && hvorMye.lønnSøker2 && hvorMye.lønnSøker2 !== undefined && (
                                        <>
                                            <Utbetaling
                                                satser={satser}
                                                lønnSøker={hvorMye.lønnSøker2}
                                                fornavn={fornavnSøker2}
                                            />
                                        </>
                                    )}
                                </>
                            )}
                        </VStack>
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
                                                <a href={links.hvorMye} target="_blank" rel="noreferrer">
                                                    {msg}
                                                </a>
                                            ),
                                        }}
                                    />
                                </BodyShort>
                            </Infobox>
                        </VStack>{' '}
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

export default HvorMyeSteg;
