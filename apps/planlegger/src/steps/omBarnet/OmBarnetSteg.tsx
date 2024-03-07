import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import Infoboks from 'components/Infoboks';
import HvorforSpørNAVOmDette from 'components/expansionCard/HvorforSpørNAVOmDette';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { isAlene } from 'types/HvemPlanlegger';

import { BodyLong, Heading, Radio, VStack } from '@navikt/ds-react';

import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import GreenRadioGroup from '../../components/formWrappers/GreenRadioGroup';
import Adopsjon from './Adopsjon';
import Fødsel from './Fødsel';

const finnHvorMangeBarnLabel = (erAlenesøker: boolean, erFødsel: boolean) => {
    if (erFødsel) {
        return erAlenesøker ? (
            <FormattedMessage id="barnet.hvorMangeDeg" />
        ) : (
            <FormattedMessage id="barnet.hvorMange" />
        );
    }

    return erAlenesøker ? (
        <FormattedMessage id="barnet.adopsjon.hvorMangeDeg" />
    ) : (
        <FormattedMessage id="barnet.adopsjon.hvorMange" />
    );
};

const OmBarnetSteg: React.FunctionComponent = () => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    const omBarnet = useContextGetData(ContextDataType.OM_BARNET);
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const lagreOmBarnet = useContextSaveData(ContextDataType.OM_BARNET);

    const lagre = (formValues: OmBarnet) => {
        lagreOmBarnet(formValues);
        return navigator.goToNextDefaultStep();
    };

    const formMethods = useForm<OmBarnet>({
        shouldUnregister: true,
        defaultValues: omBarnet,
    });

    const erFødsel = formMethods.watch('erFødsel');
    const hvorMange = formMethods.watch('hvorMange');

    const erAlenesøker = isAlene(hvemPlanlegger);

    return (
        <PlanleggerPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <Heading level="2" size="medium">
                        <FormattedMessage id="barnet.tittel" />
                    </Heading>
                    <VStack gap="10">
                        <GreenRadioGroup
                            name="erFødsel"
                            label={
                                erAlenesøker ? (
                                    <FormattedMessage id="barnet.hvaGjelderDeg" />
                                ) : (
                                    <FormattedMessage id="barnet.hvaGjelder" />
                                )
                            }
                            validate={[
                                isRequired(
                                    intl.formatMessage({
                                        id: 'feilmelding.fødselPanel.fødselEllerAdopsjon.duMåOppgi',
                                    }),
                                ),
                            ]}
                        >
                            <Radio value={true} autoFocus>
                                <FormattedMessage id="barnet.fødsel" />
                            </Radio>
                            <Radio value={false}>
                                <FormattedMessage id="barnet.adopsjon" />
                            </Radio>
                        </GreenRadioGroup>
                        {erFødsel !== undefined && (
                            <GreenRadioGroup
                                name="hvorMange"
                                label={finnHvorMangeBarnLabel(erAlenesøker, erFødsel)}
                                validate={[
                                    isRequired(
                                        intl.formatMessage({
                                            id: 'feilmelding.fødselPanel.erBarnetFødt.duMåOppgi',
                                        }),
                                    ),
                                ]}
                            >
                                <Radio value="ett" autoFocus={omBarnet === undefined}>
                                    <FormattedMessage id="barnet.ett" />
                                </Radio>
                                <Radio value="to">
                                    <FormattedMessage id="barnet.to" />
                                </Radio>
                                <Radio value="flere">
                                    <FormattedMessage id="barnet.flereEnnTo" />
                                </Radio>
                            </GreenRadioGroup>
                        )}
                    </VStack>
                    {erFødsel && hvorMange && (
                        <Fødsel hvemPlanlegger={hvemPlanlegger} erOmBarnetIkkeOppgittFraFør={omBarnet === undefined} />
                    )}
                    {erFødsel === false && hvorMange && (
                        <Adopsjon erAlenesøker={erAlenesøker} erOmBarnetIkkeOppgittFraFør={omBarnet === undefined} />
                    )}
                    {erFødsel === false && hvorMange && (
                        <Infoboks
                            header={
                                erAlenesøker ? (
                                    <FormattedMessage id="barnet.adopsjon.foreldrepengerInfoDeg" />
                                ) : (
                                    <FormattedMessage id="barnet.adopsjon.foreldrepengerInfo" />
                                )
                            }
                            icon="TODO"
                        >
                            <BodyLong>
                                <FormattedMessage id="barnet.adopsjon.foreldrepengerInfoTekst" />
                            </BodyLong>
                            <BodyLong>
                                {erAlenesøker ? (
                                    <FormattedMessage id="barnet.adopsjon.foreldrepengerInfoTekstDel2Deg" />
                                ) : (
                                    <FormattedMessage id="barnet.adopsjon.foreldrepengerInfoTekstDel2" />
                                )}
                            </BodyLong>
                        </Infoboks>
                    )}
                    <VStack gap="10">
                        <HvorforSpørNAVOmDette text="TODO" />
                        <VStack>
                            <StepButtonsHookForm<OmBarnet>
                                saveDataOnPreviousClick={lagreOmBarnet}
                                goToPreviousStep={navigator.goToPreviousDefaultStep}
                                useSimplifiedTexts
                            />
                        </VStack>
                    </VStack>
                </VStack>
            </Form>
        </PlanleggerPage>
    );
};

export default OmBarnetSteg;
