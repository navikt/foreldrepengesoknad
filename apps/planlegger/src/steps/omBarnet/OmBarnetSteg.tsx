import { PersonGroupIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { erAlenesøker as erAlene, erFarOgFar } from 'utils/HvemPlanleggerUtils';
import { erBarnetFødt } from 'utils/barnetUtils';

import { BodyShort, Heading, Link, Radio, Spacer, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { DATE_3_YEARS_AGO } from '@navikt/fp-constants/src/dates';
import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Infobox } from '@navikt/fp-ui';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import BlueRadioGroup from '../../components/formWrappers/BlueRadioGroup';
import Adopsjon from './Adopsjon';
import Fødsel from './fødsel/Fødsel';

const finnHvorMangeBarnLabel = (erAlenesøker: boolean, erFødsel: boolean) => {
    if (erFødsel) {
        return <FormattedMessage id="OmBarnetSteg.HvorMange" values={{ erAlenesøker }} />;
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

        if (erBarnetFødt(formValues) && dayjs(formValues.fødselsdato).isBefore(DATE_3_YEARS_AGO)) {
            navigator.goToNextStep(PlanleggerRoutes.OPPSUMMERING);
        } else {
            navigator.goToNextStep(PlanleggerRoutes.ARBEIDSSITUASJON);
        }
    };

    const formMethods = useForm<OmBarnet>({
        shouldUnregister: true,
        defaultValues: omBarnet,
    });

    const erFødsel = formMethods.watch('erFødsel');
    const antallBarn = formMethods.watch('antallBarn');

    const erAlenesøker = erAlene(hvemPlanlegger);
    const erFedre = erFarOgFar(hvemPlanlegger);

    const { ref, scrollToBottom } = useScrollBehaviour();

    return (
        <PlanleggerStepPage ref={ref} steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
                    <VStack gap="8">
                        <Heading level="2" size="medium">
                            <FormattedMessage id="OmBarnetSteg.Tittel" />
                        </Heading>
                        <BlueRadioGroup
                            name="erFødsel"
                            label={<FormattedMessage id="OmBarnetSteg.HvaGjelder" values={{ erAlenesøker }} />}
                            validate={[
                                isRequired(
                                    intl.formatMessage(
                                        {
                                            id: 'OmBarnetSteg.HvaGjelder.Required',
                                        },
                                        { erAlenesøker },
                                    ),
                                ),
                            ]}
                            onChange={() => {
                                formMethods.resetField('antallBarn');
                                scrollToBottom();
                            }}
                        >
                            <Radio value={true} autoFocus>
                                <FormattedMessage id="OmBarnetSteg.Fødsel" />
                            </Radio>
                            <Radio value={false}>
                                <FormattedMessage id="OmBarnetSteg.Adopsjon" />
                            </Radio>
                        </BlueRadioGroup>
                        {erFødsel !== undefined && erFødsel === true && erFedre && (
                            <Infobox
                                header={<FormattedMessage id="OmBarnetSteg.Fødsel.Infoboks" />}
                                icon={
                                    <PersonGroupIcon
                                        height={24}
                                        width={24}
                                        color="#7F8900"
                                        fontSize="1.5rem"
                                        aria-hidden
                                    />
                                }
                                color="green"
                            >
                                <BodyShort>
                                    <FormattedMessage id="OmBarnetSteg.Fødsel.Infoboks.DenSomErBiologiskFar" />
                                </BodyShort>
                                <BodyShort>
                                    <FormattedMessage
                                        id="OmBarnetSteg.Fødsel.Infoboks.LesMer"
                                        values={{
                                            a: (msg: any) => (
                                                <Link href={links.foreldrepengerFarOgFar} target="_blank" inlineText>
                                                    {msg}
                                                </Link>
                                            ),
                                        }}
                                    />
                                </BodyShort>
                            </Infobox>
                        )}
                        {erFødsel !== undefined && (
                            <BlueRadioGroup
                                name="antallBarn"
                                label={finnHvorMangeBarnLabel(erAlenesøker, erFødsel)}
                                shouldFadeIn
                                validate={[
                                    isRequired(
                                        intl.formatMessage(
                                            {
                                                id: 'OmBarnetSteg.HvorMange.Required',
                                            },
                                            { erAlenesøker, erFødsel },
                                        ),
                                    ),
                                ]}
                                onChange={() => {
                                    formMethods.resetField('erBarnetFødt');
                                    scrollToBottom();
                                }}
                            >
                                <Radio value="1">
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
                            </BlueRadioGroup>
                        )}
                        {erFødsel && antallBarn && (
                            <Fødsel
                                hvemPlanlegger={hvemPlanlegger}
                                erOmBarnetIkkeOppgittFraFør={omBarnet === undefined}
                                antallBarn={antallBarn}
                                scrollToBottom={scrollToBottom}
                            />
                        )}
                        {erFødsel === false && antallBarn && (
                            <Adopsjon
                                erAlenesøker={erAlenesøker}
                                erOmBarnetIkkeOppgittFraFør={omBarnet === undefined}
                                antallBarn={antallBarn}
                                hvemPlanlegger={hvemPlanlegger}
                            />
                        )}
                    </VStack>
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
