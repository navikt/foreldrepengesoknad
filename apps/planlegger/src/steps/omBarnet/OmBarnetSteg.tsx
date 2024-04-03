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
                        <FormattedMessage id="barnet.tittel" />
                    </Heading>
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
                                    id: 'validation.required',
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
                            name="antallBarn"
                            label={finnHvorMangeBarnLabel(erAlenesøker, erFødsel)}
                            validate={[
                                isRequired(
                                    intl.formatMessage({
                                        id: 'validation.required',
                                    }),
                                ),
                            ]}
                        >
                            <Radio value="1" autoFocus={omBarnet === undefined}>
                                <FormattedMessage id="barnet.ett" />
                            </Radio>
                            <Radio value="2">
                                {erFødsel ? (
                                    <FormattedMessage id="barnet.tvillinger" />
                                ) : (
                                    <FormattedMessage id="barnet.to" />
                                )}
                            </Radio>
                            <Radio value="3">
                                <FormattedMessage id="barnet.flereEnnTo" />
                            </Radio>
                        </GreenRadioGroup>
                    )}
                    <>
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
                                        erAlenesøker ? (
                                            <FormattedMessage id="barnet.adopsjon.foreldrepengerInfoDeg" />
                                        ) : (
                                            <FormattedMessage id="barnet.adopsjon.foreldrepengerInfo" />
                                        )
                                    }
                                    icon={
                                        <TasklistStartIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" />
                                    }
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
                                </Infobox>
                            </>
                        )}
                    </>
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
