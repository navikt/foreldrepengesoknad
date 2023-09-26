import { EgenNæringFormComponents, EgenNæringFormData, EgenNæringFormField } from './egenNæringFormConfig';
import {
    cleanupEgenNæringFormData,
    getInitialEgenNæringFormValues,
    mapNæringDataToSøkerState,
} from './egenNæringFormUtils';
import { Næringstype } from 'app/types/Næring';
import { egenNæringFormQuestionsConfig } from './egenNæringFormQuestions';
import {
    Block,
    Step,
    StepButtonWrapper,
    date20YearsAgo,
    date4WeeksAgo,
    intlUtils,
    validateTextInputField,
    validateYesOrNoIsAnswered,
} from '@navikt/fp-common';
import { getMinInputTilOgMedValue, hasValue } from 'app/utils/validationUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import stepConfig, { getBackLinkForNæringSteg, getNextRouteForNæring } from 'app/steps/stepsConfig';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';

import dayjs from 'dayjs';
import { Alert, BodyShort, Button, ReadMore } from '@navikt/ds-react';
import useSøknad from 'app/utils/hooks/useSøknad';
import actionCreator from 'app/context/action/actionCreator';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import { Link } from 'react-router-dom';
import {
    validateEgenNæringFom,
    validateEgenNæringResultat,
    validateEgenNæringTom,
    validateEgenNæringYrkesAktivDatoDato,
} from './egenNæringValidation';
import OrgnummerEllerLand from '../../components/egen-næring-visning/OrgnummerEllerLand';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import { mapTilrettelegging } from 'app/utils/tilretteleggingUtils';
import { søkerHarKunEtArbeid } from 'app/utils/arbeidsforholdUtils';

const EgenNæringStep: React.FunctionComponent = () => {
    const intl = useIntl();
    const { søker, barn, tilrettelegging } = useSøknad();
    const { arbeidsforhold } = useSøkerinfo();
    const onValidSubmitHandler = (values: Partial<EgenNæringFormData>) => {
        const søkerMedNæring = mapNæringDataToSøkerState(søker, values as EgenNæringFormData);
        if (
            søkerHarKunEtArbeid(
                barn.termindato,
                arbeidsforhold,
                søkerMedNæring.harJobbetSomFrilans,
                søkerMedNæring.harJobbetSomSelvstendigNæringsdrivende,
            )
        ) {
            const mappedTilretteleggingsValg = mapTilrettelegging(
                tilrettelegging,
                ['Næring'],
                søkerMedNæring,
                arbeidsforhold,
                barn.termindato,
            );

            return [
                actionCreator.setSøker(søkerMedNæring),
                actionCreator.setTilrettelegging(mappedTilretteleggingsValg),
            ];
        }

        return [actionCreator.setSøker(søkerMedNæring)];
    };
    const nextRoute = getNextRouteForNæring(søker, barn.termindato, arbeidsforhold);

    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, nextRoute);
    const onAvbrytSøknad = useAvbrytSøknad();
    const navnPåNæringLabel = intlUtils(intl, 'egenNæring.navnPåNæring');
    return (
        <EgenNæringFormComponents.FormikWrapper
            initialValues={getInitialEgenNæringFormValues(søker.selvstendigNæringsdrivendeInformasjon)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = egenNæringFormQuestionsConfig.getVisbility(formValues as EgenNæringFormData);
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="næring"
                        pageTitle={intlUtils(intl, 'steps.label.næring')}
                        onCancel={onAvbrytSøknad}
                        steps={stepConfig(intl)}
                    >
                        <EgenNæringFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                            cleanup={(values) => cleanupEgenNæringFormData(values, visibility)}
                        >
                            <Block padBottom="xxl" visible={visibility.isVisible(EgenNæringFormField.egenNæringType)}>
                                <EgenNæringFormComponents.RadioGroup
                                    name={EgenNæringFormField.egenNæringType}
                                    legend={intlUtils(intl, 'egenNæring.næringstype')}
                                    radios={[
                                        {
                                            label: intlUtils(intl, 'egenNæring.næringstype.dagmamma'),
                                            value: Næringstype.DAGMAMMA,
                                        },
                                        {
                                            label: intlUtils(intl, 'egenNæring.næringstype.fiske'),
                                            value: Næringstype.FISKER,
                                        },
                                        {
                                            label: intlUtils(intl, 'egenNæring.næringstype.jordbrukSkogbruk'),
                                            value: Næringstype.JORDBRUK,
                                        },
                                        {
                                            label: intlUtils(intl, 'egenNæring.næringstype.annen'),
                                            value: Næringstype.ANNET,
                                        },
                                    ]}
                                    validate={(value) => {
                                        if (!hasValue(value)) {
                                            return intlUtils(intl, 'valideringsfeil.egenNæringType.påkrevd');
                                        }
                                        return undefined;
                                    }}
                                />
                            </Block>
                            <Block padBottom="xxl" visible={visibility.isVisible(EgenNæringFormField.egenNæringNavn)}>
                                <EgenNæringFormComponents.TextField
                                    name={EgenNæringFormField.egenNæringNavn}
                                    label={navnPåNæringLabel}
                                    maxLength={100}
                                    validate={(value) =>
                                        !hasValue(value)
                                            ? intlUtils(intl, 'valideringsfeil.egenNæringNavn.påkrevd')
                                            : validateTextInputField(value, navnPåNæringLabel, intl)
                                    }
                                />
                            </Block>
                            <Block
                                padBottom="xxl"
                                visible={visibility.isVisible(EgenNæringFormField.egenNæringRegistrertINorge)}
                            >
                                <EgenNæringFormComponents.YesOrNoQuestion
                                    name={EgenNæringFormField.egenNæringRegistrertINorge}
                                    legend={intlUtils(intl, 'egenNæring.erNæringenRegistrertINorge', {
                                        navnPåNæringen: formValues.egenNæringNavn,
                                    })}
                                    validate={(value) =>
                                        validateYesOrNoIsAnswered(
                                            value,
                                            intlUtils(intl, 'valideringsfeil.egenNæringRegistrertINorge.påkrevd'),
                                        )
                                    }
                                />
                            </Block>
                            <OrgnummerEllerLand visibility={visibility} />
                            <Block padBottom="xxl" visible={visibility.isVisible(EgenNæringFormField.egenNæringFom)}>
                                <EgenNæringFormComponents.DatePicker
                                    name={EgenNæringFormField.egenNæringFom}
                                    label={intlUtils(intl, 'egenNæring.startetNæring.fom', {
                                        navnPåNæringen: formValues.egenNæringNavn,
                                    })}
                                    placeholder="dd.mm.åååå"
                                    fullscreenOverlay={true}
                                    showYearSelector={true}
                                    validate={validateEgenNæringFom(intl, formValues.egenNæringTom!)}
                                    maxDate={dayjs().toDate()}
                                    minDate={date20YearsAgo}
                                />
                            </Block>
                            <Block
                                padBottom="xxl"
                                visible={visibility.isVisible(EgenNæringFormField.egenNæringPågående)}
                            >
                                <EgenNæringFormComponents.YesOrNoQuestion
                                    name={EgenNæringFormField.egenNæringPågående}
                                    legend={intlUtils(intl, 'egenNæring.startetNæring.pågående', {
                                        navnPåNæringen: formValues.egenNæringNavn,
                                    })}
                                    validate={(value) =>
                                        validateYesOrNoIsAnswered(
                                            value,
                                            intlUtils(intl, 'valideringsfeil.egenNæringPågående.påkrevd'),
                                        )
                                    }
                                />
                            </Block>
                            <Block padBottom="xxl" visible={visibility.isVisible(EgenNæringFormField.egenNæringTom)}>
                                <EgenNæringFormComponents.DatePicker
                                    name={EgenNæringFormField.egenNæringTom}
                                    label={intlUtils(intl, 'egenNæring.startetNæring.tom', {
                                        navnPåNæringen: formValues.egenNæringNavn,
                                    })}
                                    placeholder="dd.mm.åååå"
                                    fullscreenOverlay={true}
                                    showYearSelector={true}
                                    validate={validateEgenNæringTom(intl, formValues.egenNæringFom!)}
                                    maxDate={dayjs().toDate()}
                                    minDate={getMinInputTilOgMedValue(formValues.egenNæringFom, date4WeeksAgo)}
                                />
                            </Block>
                            <Block
                                padBottom="xxl"
                                visible={visibility.isVisible(EgenNæringFormField.egenNæringResultat)}
                            >
                                <EgenNæringFormComponents.TextField
                                    name={EgenNæringFormField.egenNæringResultat}
                                    label={intlUtils(intl, 'egenNæring.næringsinntekt')}
                                    validate={validateEgenNæringResultat(intl)}
                                />

                                <ReadMore header={intlUtils(intl, 'egenNæring.næringsinntekt.info.apneLabel')}>
                                    <BodyShort>
                                        <FormattedMessage id="egenNæring.næringsinntekt.info" />
                                    </BodyShort>
                                </ReadMore>
                            </Block>
                            <Block
                                padBottom="xxl"
                                visible={visibility.isVisible(
                                    EgenNæringFormField.egenNæringBlittYrkesaktivDe3SisteÅrene,
                                )}
                            >
                                <EgenNæringFormComponents.YesOrNoQuestion
                                    name={EgenNæringFormField.egenNæringBlittYrkesaktivDe3SisteÅrene}
                                    legend={intlUtils(intl, 'egenNæring.blittYrkesaktivSiste3År')}
                                    validate={(value) =>
                                        validateYesOrNoIsAnswered(
                                            value,
                                            intlUtils(
                                                intl,
                                                'valideringsfeil.egenNæringBlittYrkesaktivDe3SisteÅrene.påkrevd',
                                            ),
                                        )
                                    }
                                />
                            </Block>
                            <Block
                                padBottom="xxl"
                                visible={visibility.isVisible(EgenNæringFormField.egenNæringYrkesAktivDato)}
                            >
                                <EgenNæringFormComponents.DatePicker
                                    name={EgenNæringFormField.egenNæringYrkesAktivDato}
                                    label={intlUtils(intl, 'egenNæring.yrkesaktivDato')}
                                    placeholder="dd.mm.åååå"
                                    fullscreenOverlay={true}
                                    showYearSelector={true}
                                    validate={validateEgenNæringYrkesAktivDatoDato(intl)}
                                    maxDate={dayjs().toDate()}
                                />
                            </Block>
                            <Block padBottom="xxl">
                                <Alert variant="info">{intlUtils(intl, 'egenNæring.veileder')}</Alert>
                            </Block>
                            <Block padBottom="l">
                                <StepButtonWrapper>
                                    <Button variant="secondary" as={Link} to={getBackLinkForNæringSteg(søker)}>
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                        {intlUtils(intl, 'søknad.gåVidere')}
                                    </Button>
                                </StepButtonWrapper>
                            </Block>
                        </EgenNæringFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default EgenNæringStep;
