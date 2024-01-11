import { EgenNæringFormComponents, EgenNæringFormData, EgenNæringFormField } from './egenNæringFormConfig';
import {
    cleanupEgenNæringFormData,
    getInitialEgenNæringFormValues,
    mapEgenNæringFormValuesToState,
} from './egenNæringFormUtils';
import { Næringstype } from 'app/types/EgenNæring';
import { egenNæringFormQuestionsConfig } from './egenNæringFormQuestions';
import {
    Block,
    Step,
    StepButtonWrapper,
    date20YearsAgo,
    date5MonthsAgo,
    intlUtils,
    validateYesOrNoIsAnswered,
} from '@navikt/fp-common';
import { getMinInputTilOgMedValue, hasValue } from 'app/utils/validationUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import { getBackLinkForNæringSteg, getNextRouteForNæring, useStepConfig } from 'app/steps/stepsConfig';

import dayjs from 'dayjs';
import { Alert, BodyShort, Button, ReadMore } from '@navikt/ds-react';
import {
    validateEgenNæringFom,
    validateEgenNæringNavn,
    validateEgenNæringResultat,
    validateEgenNæringTom,
    validateEgenNæringYrkesAktivDatoDato,
} from './egenNæringValidation';
import OrgnummerEllerLand from '../../components/egen-næring-visning/OrgnummerEllerLand';
import { søkerHarKunEtAktivtArbeid } from 'app/utils/arbeidsforholdUtils';
import VarigEndringSpørsmål from './components/VarigEndringSpørsmål';
import { getNæringTilretteleggingOption } from '../velg-arbeidsforhold/velgArbeidFormUtils';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';
import { notEmpty } from '@navikt/fp-validation';
import { useState } from 'react';
import { Søkerinfo } from 'app/types/Søkerinfo';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import BackButton from '../BackButton';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    søkerInfo: Søkerinfo;
};

const EgenNæringStep: React.FunctionComponent<Props> = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, søkerInfo }) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(intl, søkerInfo.arbeidsforhold);
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const inntektsinformasjon = notEmpty(useContextGetData(ContextDataType.INNTEKTSINFORMASJON));
    const tilrettelegging = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGING));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterEgenNæring = useContextSaveData(ContextDataType.EGEN_NÆRING);
    const oppdaterTilrettelegging = useContextSaveData(ContextDataType.TILRETTELEGGING);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const onSubmit = (values: Partial<EgenNæringFormData>) => {
        setIsSubmitting(true);

        const næringsdata = mapEgenNæringFormValuesToState(values as EgenNæringFormData);

        if (
            søkerHarKunEtAktivtArbeid(
                barnet.termindato,
                søkerInfo.arbeidsforhold,
                inntektsinformasjon.harJobbetSomFrilans,
                inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende,
            )
        ) {
            const automatiskValgtTilrettelegging = [getNæringTilretteleggingOption(tilrettelegging, næringsdata)];

            oppdaterTilrettelegging(automatiskValgtTilrettelegging);
        }

        oppdaterEgenNæring(næringsdata);

        const { nextRoute, nextTilretteleggingId } = getNextRouteForNæring(
            inntektsinformasjon,
            barnet.termindato,
            søkerInfo.arbeidsforhold,
        );
        oppdaterValgtTilretteleggingId(nextTilretteleggingId);
        oppdaterAppRoute(nextRoute);

        mellomlagreSøknadOgNaviger();
    };

    const navnPåNæringSpm = intlUtils(intl, 'egenNæring.navnPåNæring');
    return (
        <EgenNæringFormComponents.FormikWrapper
            initialValues={getInitialEgenNæringFormValues(egenNæring)}
            onSubmit={onSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = egenNæringFormQuestionsConfig.getVisbility(formValues as EgenNæringFormData);
                const navnPåNæringLabel =
                    formValues.egenNæringType === Næringstype.FISKER
                        ? `${navnPåNæringSpm} ${intlUtils(intl, 'valgfritt')}`
                        : navnPåNæringSpm;
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="næring"
                        pageTitle={intlUtils(intl, 'steps.label.næring')}
                        onCancel={avbrytSøknad}
                        steps={stepConfig}
                        onContinueLater={onFortsettSøknadSenere}
                    >
                        <EgenNæringFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                            cleanup={(values) => cleanupEgenNæringFormData(values, visibility)}
                        >
                            <Block padBottom="xl">
                                <BodyShort>
                                    <FormattedMessage id="harValgfrieFelt" />
                                </BodyShort>
                            </Block>
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
                                    style={{ width: 'var(--app-text-input-width)' }}
                                    maxLength={100}
                                    validate={validateEgenNæringNavn(
                                        intl,
                                        navnPåNæringLabel,
                                        formValues.egenNæringType === Næringstype.FISKER,
                                    )}
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
                            <OrgnummerEllerLand
                                visibility={visibility}
                                orgNummerErValgfritt={formValues.egenNæringType === Næringstype.FISKER}
                            />
                            <Block padBottom="xxl" visible={visibility.isVisible(EgenNæringFormField.egenNæringFom)}>
                                <EgenNæringFormComponents.DatePicker
                                    name={EgenNæringFormField.egenNæringFom}
                                    label={intlUtils(intl, 'egenNæring.næring.fom', {
                                        navnPåNæringen: formValues.egenNæringNavn,
                                    })}
                                    placeholder={'dd.mm.åååå'}
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
                                    legend={intlUtils(intl, 'egenNæring.næring.pågående', {
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
                                    label={intlUtils(intl, 'egenNæring.næring.tom', {
                                        navnPåNæringen: formValues.egenNæringNavn,
                                    })}
                                    description={intlUtils(intl, 'egenNæring.næring.tom.description')}
                                    placeholder={'dd.mm.åååå'}
                                    fullscreenOverlay={true}
                                    showYearSelector={true}
                                    validate={validateEgenNæringTom(intl, formValues.egenNæringFom!)}
                                    maxDate={dayjs().add(9, 'month').toDate()}
                                    minDate={getMinInputTilOgMedValue(formValues.egenNæringFom, date5MonthsAgo)}
                                />
                            </Block>
                            <VarigEndringSpørsmål
                                visibility={visibility}
                                formValues={formValues}
                            ></VarigEndringSpørsmål>
                            <Block
                                padBottom="xxl"
                                visible={visibility.isVisible(EgenNæringFormField.egenNæringResultat)}
                            >
                                <EgenNæringFormComponents.TextField
                                    style={{ width: 'var(--app-text-input-width)' }}
                                    name={EgenNæringFormField.egenNæringResultat}
                                    label={intlUtils(intl, 'egenNæring.næringsinntekt')}
                                    description={intlUtils(intl, 'egenNæring.næringsinntekt.description')}
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
                                    placeholder={'dd.mm.åååå'}
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
                                    <BackButton
                                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                                        route={getBackLinkForNæringSteg(inntektsinformasjon)}
                                    />
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
