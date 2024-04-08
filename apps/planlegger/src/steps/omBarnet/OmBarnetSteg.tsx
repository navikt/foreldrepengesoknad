import { TasklistStartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import Infobox from 'components/boxes/Infobox';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { isAlene } from 'types/HvemPlanlegger';

import { BodyLong, Heading, Radio, Spacer, VStack } from '@navikt/ds-react';

import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import GreenRadioGroup from '../../components/formWrappers/GreenRadioGroup';
import Adopsjon from './Adopsjon';
import Fødsel from './fødsel/Fødsel';

const finnHvorMangeBarnLabel = (erAlenesøker: boolean, erFødsel: boolean) => {
    if (erFødsel) {
        <FormattedMessage id="OmBarnetSteg.HvorMange" values={{ erAlenesøker }} />;
    }

    return <FormattedMessage id="OmBarnetSteg.Adopsjon.HvorMange" values={{ erAlenesøker }} />;
};

const OmBarnetSteg: React.FunctionComponent = () => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    const omBarnet = useContextGetData(ContextDataType.OM_BARNET);
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const oppdaterOmBarnet = useContextSaveData(ContextDataType.OM_BARNET);

    const lagre = (formValues: OmBarnet) => {
        oppdaterOmBarnet(formValues);
        navigator.goToNextDefaultStep();
    };

    const formMethods = useForm<OmBarnet>({
        shouldUnregister: true,
        defaultValues: omBarnet,
    });

    const erFødsel = formMethods.watch('erFødsel');
    const antallBarn = formMethods.watch('antallBarn');

    const erAlenesøker = isAlene(hvemPlanlegger);

    return (
        <PlanleggerStepPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
                    <Heading level="2" size="medium">
                        <FormattedMessage id="OmBarnetSteg.Tittel" />
                    </Heading>
                    <GreenRadioGroup
                        name="erFødsel"
                        label={<FormattedMessage id="OmBarnetSteg.HvaGjelder" values={{ erAlenesøker }} />}
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'ValidationMessage.Required',
                                }),
                            ),
                        ]}
                    >
                        <Radio value={true} autoFocus>
                            <FormattedMessage id="OmBarnetSteg.Fødsel" />
                        </Radio>
                        <Radio value={false}>
                            <FormattedMessage id="OmBarnetSteg.Adopsjon" />
                        </Radio>
                    </GreenRadioGroup>
                    {erFødsel !== undefined && (
                        <GreenRadioGroup
                            name="antallBarn"
                            label={finnHvorMangeBarnLabel(erAlenesøker, erFødsel)}
                            validate={[
                                isRequired(
                                    intl.formatMessage({
                                        id: 'ValidationMessage.Required',
                                    }),
                                ),
                            ]}
                        >
                            <Radio value="1" autoFocus={omBarnet === undefined}>
                                <FormattedMessage id="OmBarnetSteg.Ett" />
                            </Radio>
                            <Radio value="2">
                                {erFødsel ? (
                                    <FormattedMessage id="OmBarnetSteg.Tvillinger" />
                                ) : (
                                    <FormattedMessage id="OmBarnetSteg.To" />
                                )}
                            </Radio>
                            <Radio value="3">
                                <FormattedMessage id="OmBarnetSteg.FlereEnnTo" />
                            </Radio>
                        </GreenRadioGroup>
                    )}
                    {erFødsel && antallBarn && (
                        <Fødsel
                            hvemPlanlegger={hvemPlanlegger}
                            erOmBarnetIkkeOppgittFraFør={omBarnet === undefined}
                            antallBarn={antallBarn}
                        />
                    )}
                    {erFødsel === false && antallBarn && (
                        <>
                            <Adopsjon
                                erAlenesøker={erAlenesøker}
                                erOmBarnetIkkeOppgittFraFør={omBarnet === undefined}
                                antallBarn={antallBarn}
                            />
                            <Infobox
                                header={
                                    <FormattedMessage
                                        id="OmBarnetSteg.Adopsjon.ForeldrepengerInfo"
                                        values={{ erAlenesøker }}
                                    />
                                }
                                icon={<TasklistStartIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" />}
                            >
                                <BodyLong>
                                    <FormattedMessage id="OmBarnetSteg.Adopsjon.ForeldrepengerInfoTekst" />
                                </BodyLong>
                                <BodyLong>
                                    <FormattedMessage
                                        id="OmBarnetSteg.Adopsjon.ForeldrepengerInfoTekstDel2Deg"
                                        values={{ erAlenesøker }}
                                    />
                                </BodyLong>
                            </Infobox>
                        </>
                    )}
                    <Spacer />
                    <StepButtonsHookForm<OmBarnet>
                        saveDataOnPreviousClick={oppdaterOmBarnet}
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        useSimplifiedTexts
                    />
                </VStack>
            </Form>
        </PlanleggerStepPage>
    );
};

export default OmBarnetSteg;
