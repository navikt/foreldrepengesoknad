import { TasklistStartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import Infobox from 'components/boxes/Infobox';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { OmBarnet, erBarnetFødt } from 'types/Barnet';
import { HvemPlanlegger, Situasjon, isAlene } from 'types/HvemPlanlegger';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { BodyLong, Heading, Radio, Spacer, VStack } from '@navikt/ds-react';

import { DATE_3_YEARS_AGO } from '@navikt/fp-constants/src/dates';
import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { LocaleAll } from '@navikt/fp-types';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import GreenRadioGroup from '../../components/formWrappers/GreenRadioGroup';
import Adopsjon from './Adopsjon';
import Fødsel from './fødsel/Fødsel';

const finnHvorMangeBarnLabel = (erAlenesøker: boolean, erFødsel: boolean) => {
    if (erFødsel) {
        return <FormattedMessage id="OmBarnetSteg.HvorMange" values={{ erAlenesøker }} />;
    }

    return <FormattedMessage id="OmBarnetSteg.Adopsjon.HvorMange" values={{ erAlenesøker }} />;
};
const finnAnnenPartTekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string | undefined => {
    if (hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR) {
        return intl.formatMessage({ id: 'OversiktSteg.Medmor' });
    }
    if (
        hvemPlanlegger.type === Situasjon.FAR ||
        hvemPlanlegger.type === Situasjon.FAR_OG_FAR ||
        hvemPlanlegger.type === Situasjon.MOR_OG_FAR
    ) {
        return intl.formatMessage({ id: 'OversiktSteg.Far' });
    }
    return undefined;
};

interface Props {
    locale: LocaleAll;
}

const OmBarnetSteg: React.FunctionComponent<Props> = ({ locale }) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator(locale);
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

    const erAlenesøker = isAlene(hvemPlanlegger);
    const erFarEllerMedmor =
        hvemPlanlegger.type === Situasjon.MOR_OG_FAR || hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR;

    const { ref, scrollToBottom } = useScrollBehaviour();

    return (
        <PlanleggerStepPage ref={ref} steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
                    <VStack gap="8">
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
                        </GreenRadioGroup>
                        {erFødsel !== undefined && (
                            <GreenRadioGroup
                                name="antallBarn"
                                label={finnHvorMangeBarnLabel(erAlenesøker, erFødsel)}
                                shouldFadeIn
                                validate={[
                                    isRequired(
                                        intl.formatMessage({
                                            id: 'ValidationMessage.Required',
                                        }),
                                    ),
                                ]}
                                onChange={() => {
                                    formMethods.resetField('erBarnetFødt');
                                    scrollToBottom();
                                }}
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
                                scrollToBottom={scrollToBottom}
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
                                    icon={
                                        <TasklistStartIcon
                                            height={28}
                                            width={28}
                                            color="#236B7D"
                                            fontSize="1.5rem"
                                            aria-hidden
                                        />
                                    }
                                    shouldFadeIn
                                >
                                    <BodyLong>
                                        <FormattedMessage id="OmBarnetSteg.Adopsjon.ForeldrepengerInfoTekst" />
                                    </BodyLong>
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OmBarnetSteg.Adopsjon.ForeldrepengerInfoTekstDel2Deg"
                                            values={{
                                                erAlenesøker,
                                                erFarEllerMedmor,
                                                hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
                                            }}
                                        />
                                    </BodyLong>
                                </Infobox>
                            </>
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
