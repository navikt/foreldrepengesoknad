import { Block, Step, StepButtonWrapper, intlUtils } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import { Button, GuidePanel, Heading, ReadMore } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    TilretteleggingFormComponents,
    TilretteleggingFormData,
    TilretteleggingFormField,
} from './tilretteleggingFormConfig';
import {
    cleanupOmTilretteleggingFormData,
    getTilretteleggingInitialValues,
    mapOmTilretteleggingFormDataToState,
} from './tilretteleggingUtils';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import actionCreator from 'app/context/action/actionCreator';
import tilretteleggingQuestionsConfig from './tilretteleggingQuestionsConfig';
import useSøknad from 'app/utils/hooks/useSøknad';
import { Arbeidsforholdstype, Tilretteleggingstype } from 'app/types/Tilrettelegging';
import { Link } from 'react-router-dom';
import { FunctionComponent } from 'react';

interface Props {
    id: string;
    type: Arbeidsforholdstype;
    navn: string;
}

const Tilrettelegging: FunctionComponent<Props> = ({ type, navn }) => {
    const intl = useIntl();
    const { tilrettelegging } = useSøknad();
    const onValidSubmitHandler = (values: Partial<TilretteleggingFormData>) => {
        console.log(values);
        const tilrettelegging = mapOmTilretteleggingFormDataToState(values);
        return [actionCreator.setTilrettelegging(tilrettelegging)];
    };
    const sideTittel = intlUtils(intl, 'steps.label.periode', { navn });
    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.ARBEID);

    return (
        <TilretteleggingFormComponents.FormikWrapper
            initialValues={getTilretteleggingInitialValues(tilrettelegging)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = tilretteleggingQuestionsConfig.getVisbility({
                    ...formValues,
                } as TilretteleggingFormData);
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="periode"
                        pageTitle={sideTittel}
                        // onCancel={onAvbrytSøknad}
                        // onContinueLater={onFortsettSøknadSenere}
                        steps={stepConfig(intl, type)}
                    >
                        <TilretteleggingFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                            cleanup={(values) => cleanupOmTilretteleggingFormData(values, visibility)}
                        >
                            <Block padBottom="xl">
                                <Heading level="2" size="small">
                                    {navn}
                                </Heading>
                            </Block>
                            <Block padBottom="xl">
                                <GuidePanel>{intlUtils(intl, 'tilrettelegging.veileder.intro')}</GuidePanel>
                            </Block>
                            <Block padBottom="xl">
                                <TilretteleggingFormComponents.DatePicker
                                    name={TilretteleggingFormField.tilrettelagtArbeidFom}
                                    label={intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidFom.label')}
                                    // minDate={halvannetÅrSiden(new Date())} //TODO
                                    // maxDate={dayjs().toDate()}
                                    // validate={validateFødselsdato(intl)}
                                    placeholder={'dd.mm.åååå'}
                                />
                                <ReadMore
                                    header={intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidFom.lesMer.tittel')}
                                >
                                    {intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidFom.lesMer.info')}
                                </ReadMore>
                            </Block>
                            <Block padBottom="xl">
                                <TilretteleggingFormComponents.CheckboxGroup
                                    name={TilretteleggingFormField.tilretteleggingsType}
                                    legend={intlUtils(intl, 'tilrettelegging.tilretteleggingsType.label')}
                                    checkboxes={[
                                        {
                                            label: intlUtils(intl, 'tilrettelegging.tilretteleggingsType.hel'),
                                            value: Tilretteleggingstype.INGEN,
                                        },
                                        {
                                            label: intlUtils(intl, 'tilrettelegging.tilretteleggingsType.delvis'),
                                            value: Tilretteleggingstype.DELVIS,
                                        },
                                        {
                                            label: intlUtils(intl, 'tilrettelegging.tilretteleggingsType.ingen'),
                                            value: Tilretteleggingstype.HEL,
                                        },
                                    ]}
                                />
                            </Block>
                            <Block margin="xl">
                                <StepButtonWrapper>
                                    <Button variant="secondary" as={Link} to={getPreviousStepHref('periode')}>
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                        {intlUtils(intl, 'søknad.gåVidere')}
                                    </Button>
                                </StepButtonWrapper>
                            </Block>
                        </TilretteleggingFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default Tilrettelegging;
