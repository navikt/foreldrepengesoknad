import { Block, Step, StepButtonWrapper, intlUtils } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import { Alert, Button, ReadMore } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    TilretteleggingFormComponents,
    TilretteleggingFormData,
    TilretteleggingFormField,
    TilretteleggingPeriodeType,
} from './tilretteleggingStepFormConfig';
import { getTilretteleggingInitialValues, mapOmTilretteleggingFormDataToState } from './tilretteleggingStepUtils';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import actionCreator from 'app/context/action/actionCreator';
import useSøknad from 'app/utils/hooks/useSøknad';
import { Arbeidsforholdstype, Tilretteleggingstype } from 'app/types/Tilrettelegging';
import { Link } from 'react-router-dom';
import { FunctionComponent } from 'react';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import useUpdateCurrentTilretteleggingId from 'app/utils/hooks/useUpdateCurrentTilretteleggingId';
import { getNesteTilretteleggingId } from 'app/routes/SvangerskapspengesøknadRoutes';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import ArbeidsgiverVisning from './components/ArbeidsgiverVisning';
import { dagenFør, tiMånederSidenDato } from 'app/utils/dateUtils';
import {
    validateTilrettelagtArbeidFom,
    validateTilrettelagtArbeidType,
    validateTilretteleggingPeriodetype,
} from 'app/utils/tilretteleggingUtils';
import tilretteleggingQuestionsConfig from './tilretteleggingStepQuestionsConfig';
import { validateStillingsprosent } from './tilretteleggingValidation';

interface Props {
    id: string;
    type: Arbeidsforholdstype;
    navn: string;
}

const TilretteleggingStep: FunctionComponent<Props> = ({ navn, id }) => {
    useUpdateCurrentTilretteleggingId(id);
    const intl = useIntl();
    const { tilrettelegging: tilretteleggingFraState, søker, barn } = useSøknad();
    const { frilansInformasjon, selvstendigNæringsdrivendeInformasjon } = søker;
    const { state } = useSvangerskapspengerContext();
    const { arbeidsforhold } = useSøkerinfo();
    const onAvbrytSøknad = useAvbrytSøknad();
    const currentTilrettelegging = tilretteleggingFraState.find((t) => t.id === id);

    const onValidSubmitHandler = (values: Partial<TilretteleggingFormData>) => {
        const mappedTilrettelegging = mapOmTilretteleggingFormDataToState(id, values, tilretteleggingFraState);
        return [actionCreator.setTilrettelegging(mappedTilrettelegging)];
    };

    const erFlereTilrettelegginger = tilretteleggingFraState.length > 1;
    const sideTittel = erFlereTilrettelegginger
        ? intlUtils(intl, 'steps.label.periode.flere', { navn })
        : intlUtils(intl, 'steps.label.periode.en');

    const nesteTilretteleggingId = getNesteTilretteleggingId(tilretteleggingFraState, state.currentTilretteleggingId);
    let nextRoute = SøknadRoutes.OPPSUMMERING.toString();
    if (nesteTilretteleggingId) {
        nextRoute = `${SøknadRoutes.PERIODE}/${nesteTilretteleggingId}`;
    }

    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, nextRoute);
    return (
        <TilretteleggingFormComponents.FormikWrapper
            enableReinitialize={true}
            initialValues={getTilretteleggingInitialValues(currentTilrettelegging!)}
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
                        onCancel={onAvbrytSøknad}
                        steps={stepConfig(intl, erFlereTilrettelegginger ? navn : undefined)}
                    >
                        <TilretteleggingFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            {erFlereTilrettelegginger && (
                                <>
                                    <Block padBottom="l">
                                        <Alert variant="info">
                                            <FormattedMessage id="tilrettelegging.flereTilrettelegginger.info" />
                                        </Alert>
                                    </Block>
                                    <Block padBottom="xxl">
                                        <ArbeidsgiverVisning
                                            currentTilrettelegging={currentTilrettelegging!}
                                            arbeidsforhold={arbeidsforhold}
                                            frilans={frilansInformasjon}
                                            egenNæring={selvstendigNæringsdrivendeInformasjon}
                                        />
                                    </Block>
                                </>
                            )}
                            <Block padBottom="xl">
                                <TilretteleggingFormComponents.DatePicker
                                    name={TilretteleggingFormField.tilrettelagtArbeidFom}
                                    label={intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidFom.label')}
                                    placeholder={'dd.mm.åååå'}
                                    description={intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidFom.description')}
                                    minDate={tiMånederSidenDato(barn.termindato)}
                                    maxDate={dagenFør(barn.termindato)}
                                    validate={validateTilrettelagtArbeidFom(intl, barn.termindato)}
                                />
                            </Block>
                            <Block padBottom="xl">
                                <TilretteleggingFormComponents.RadioGroup
                                    name={TilretteleggingFormField.tilrettelagtArbeidType}
                                    legend={intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.label')}
                                    description={intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.description')}
                                    radios={[
                                        {
                                            label: intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.delvis'),
                                            value: Tilretteleggingstype.DELVIS,
                                        },
                                        {
                                            label: intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.ingen'),
                                            value: Tilretteleggingstype.INGEN,
                                        },
                                    ]}
                                    validate={validateTilrettelagtArbeidType(intl)}
                                />
                            </Block>
                            <Block padBottom="xl">
                                <TilretteleggingFormComponents.RadioGroup
                                    name={TilretteleggingFormField.tilretteleggingPeriodetype}
                                    legend={intlUtils(intl, 'tilrettelegging.tilretteleggingPeriodetype.label')}
                                    description={intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidType.description')}
                                    radios={[
                                        {
                                            label: intlUtils(intl, 'tilrettelegging.tilretteleggingPeriodetype.en'),
                                            value: TilretteleggingPeriodeType.EN,
                                        },
                                        {
                                            label: intlUtils(
                                                intl,
                                                'tilrettelegging.tilretteleggingPeriodetype.variert'
                                            ),
                                            value: TilretteleggingPeriodeType.VARIERT,
                                        },
                                    ]}
                                    validate={validateTilretteleggingPeriodetype(intl)}
                                />
                                <ReadMore
                                    header={intlUtils(
                                        intl,
                                        'tilrettelegging.tilretteleggingPeriodetype.readmore.tittel'
                                    )}
                                >
                                    <FormattedMessage id="tilrettelegging.tilretteleggingPeriodetype.readmore.description" />
                                </ReadMore>
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={visibility.isVisible(TilretteleggingFormField.stillingsprosent)}
                            >
                                <TilretteleggingFormComponents.NumberInput
                                    name={TilretteleggingFormField.stillingsprosent}
                                    label={intlUtils(intl, 'tilrettelegging.stillingsprosent.label')}
                                    validate={validateStillingsprosent(intl)}
                                />
                            </Block>
                            <Alert variant="warning"> Denne siden er under utvikling </Alert>
                            <Block margin="xl">
                                <StepButtonWrapper>
                                    <Button
                                        variant="secondary"
                                        as={Link}
                                        to={getPreviousStepHref(
                                            'periode',
                                            undefined,
                                            tilretteleggingFraState,
                                            state.currentTilretteleggingId
                                        )}
                                    >
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

export default TilretteleggingStep;

// const [tilretteleggingInput, setTilretteleggingInput] = useState<TilretteleggingInput[]>(
//     currentTilrettelegging && currentTilrettelegging.tilrettelegginger
//         ? currentTilrettelegging.tilrettelegginger
//         : []
// );
// const allSortertTilrettelegging = tilretteleggingInput.sort((a, b) => {
//     return dayjs(a.fom).isBefore(b.fom, 'day') ? -1 : 1;
// });

/* 
                            <Block>
                                <DelvisTilretteleggingDetaljer
                                    tilretteleggingInput={allSortertTilrettelegging}
                                    setTilretteleggingInput={setTilretteleggingInput}
                                />
                            </Block> */
