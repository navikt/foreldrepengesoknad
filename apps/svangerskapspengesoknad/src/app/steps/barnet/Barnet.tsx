import { useState } from 'react';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { Block, Step, StepButtonWrapper, validateYesOrNoIsAnswered } from '@navikt/fp-common';
import { BodyShort, Button, ReadMore } from '@navikt/ds-react';
import { niMånederFremITid, halvannetÅrSiden } from 'app/utils/dateUtils';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';
import SøknadRoutes from 'app/routes/routes';
import { BarnetFormComponents, BarnetFormData, BarnetFormField } from './barnetFormConfig';
import {
    cleanupOmBarnetFormData,
    getBarnetInitialValues,
    getMinDatoTermin,
    mapOmBarnetFormDataToState,
} from './barnetUtils';
import barnetQuestionsConfig from './barnetQuestionsConfig';
import { useStepConfig } from '../stepsConfig';
import { validateFødselsdato, validateTermindato } from './barnetValidering';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
};

const Barnet: React.FunctionComponent<Props> = ({ mellomlagreSøknadOgNaviger, avbrytSøknad }) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(intl);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const barnet = useContextGetData(ContextDataType.OM_BARNET);

    const oppdaterOmBarnet = useContextSaveData(ContextDataType.OM_BARNET);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const onSubmit = (values: Partial<BarnetFormData>) => {
        setIsSubmitting(true);

        const oppdatertBarn = mapOmBarnetFormDataToState(values);

        oppdaterOmBarnet(oppdatertBarn);
        oppdaterAppRoute(SøknadRoutes.UTENLANDSOPPHOLD);

        mellomlagreSøknadOgNaviger();
    };

    return (
        <BarnetFormComponents.FormikWrapper
            initialValues={getBarnetInitialValues(barnet)}
            onSubmit={onSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = barnetQuestionsConfig.getVisbility({
                    ...formValues,
                } as BarnetFormData);
                const minDatoTermin = getMinDatoTermin(formValues.erBarnetFødt!, formValues.fødselsdato!);
                return (
                    <Step
                        bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
                        activeStepId="barnet"
                        pageTitle={intl.formatMessage({ id: 'steps.label.barnet' })}
                        onCancel={avbrytSøknad}
                        steps={stepConfig}
                    >
                        <BarnetFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                            cleanup={(values) => cleanupOmBarnetFormData(values, visibility)}
                        >
                            <Block padBottom="xxl">
                                <Block padBottom="m">
                                    <BarnetFormComponents.YesOrNoQuestion
                                        name={BarnetFormField.erBarnetFødt}
                                        legend={intl.formatMessage({ id: 'barnet.erBarnetFødt' })}
                                        validate={(value) =>
                                            validateYesOrNoIsAnswered(
                                                value,
                                                intl.formatMessage({
                                                    id: 'valideringsfeil.barnet.erBarnetFødt.påkrevd',
                                                }),
                                            )
                                        }
                                    />
                                </Block>
                                <ReadMore header={intl.formatMessage({ id: 'barnet.erBarnetFødt.merInfo.tittel' })}>
                                    <BodyShort>
                                        <FormattedMessage id="barnet.erBarnetFødt.merInfo.tekst" />
                                    </BodyShort>
                                </ReadMore>
                            </Block>
                            <Block padBottom="xxl" visible={visibility.isVisible(BarnetFormField.fødselsdato)}>
                                <BarnetFormComponents.DatePicker
                                    name={BarnetFormField.fødselsdato}
                                    label={intl.formatMessage({ id: 'barnet.fødselsdato' })}
                                    minDate={halvannetÅrSiden(new Date())}
                                    maxDate={dayjs().toDate()}
                                    validate={validateFødselsdato(intl)}
                                    placeholder={'dd.mm.åååå'}
                                />
                            </Block>
                            <Block padBottom="xxl" visible={true}>
                                <Block padBottom="l">
                                    <BarnetFormComponents.DatePicker
                                        name={BarnetFormField.termindato}
                                        label={intl.formatMessage({ id: 'barnet.termindato' })}
                                        placeholder={'dd.mm.åååå'}
                                        minDate={minDatoTermin}
                                        maxDate={niMånederFremITid(new Date())}
                                        validate={validateTermindato(intl, formValues.fødselsdato)}
                                    />
                                </Block>
                                <ReadMore header={intl.formatMessage({ id: 'barnet.termindato.merInfo.tittel' })}>
                                    <BodyShort>
                                        <FormattedMessage id="barnet.termindato.merInfo.tekst" />
                                    </BodyShort>
                                </ReadMore>
                            </Block>
                            <Block padBottom="l">
                                <StepButtonWrapper>
                                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                        <FormattedMessage id="søknad.gåVidere" />
                                    </Button>
                                </StepButtonWrapper>
                            </Block>
                        </BarnetFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default Barnet;
