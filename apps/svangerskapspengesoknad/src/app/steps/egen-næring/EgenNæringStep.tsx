import { EgenNæringFormData, EgenNæringFormField } from './egenNæringFormConfig';
import { getInitialEgenNæringFormValues, mapEgenNæringFormValuesToState } from './egenNæringFormUtils';
import { Næringstype } from 'app/types/EgenNæring';
import { Step, date20YearsAgo, date5MonthsAgo, intlUtils } from '@navikt/fp-common';
import { getMinInputTilOgMedValue } from 'app/utils/validationUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import { getBackLinkForNæringSteg, getNextRouteForNæring, useStepConfig } from 'app/steps/stepsConfig';

import dayjs from 'dayjs';
import { Alert, BodyShort, Radio, ReadMore, VStack } from '@navikt/ds-react';
import {
    validateBlittYrkesaktivDe3SisteÅrene,
    validateEgenNæringFom,
    validateEgenNæringNavn,
    validateEgenNæringResultat,
    validateEgenNæringTom,
    validateEgenNæringYrkesAktivDatoDato,
    validateNæringPågående,
    validateNæringstype,
    validateRegistrertINorge,
} from './egenNæringValidation';
import { søkerHarKunEtAktivtArbeid } from 'app/utils/arbeidsforholdUtils';
import VarigEndringSpørsmål from './components/VarigEndringSpørsmål';
import { getNæringTilretteleggingOption } from '../velg-arbeidsforhold/velgArbeidFormUtils';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';
import { notEmpty } from '@navikt/fp-validation';
import { Søkerinfo } from 'app/types/Søkerinfo';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import OrgnummerEllerLand from './components/OrgnummerEllerLand';
import { useForm } from 'react-hook-form';
import { Datepicker, Form, RadioGroup, StepButtonsHookForm, TextField } from '@navikt/fp-form-hooks';
import { useNavigate } from 'react-router-dom';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    søkerInfo: Søkerinfo;
};

const EgenNæringStep: React.FunctionComponent<Props> = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, søkerInfo }) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(intl, søkerInfo.arbeidsforhold);
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const navigate = useNavigate();

    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const inntektsinformasjon = notEmpty(useContextGetData(ContextDataType.INNTEKTSINFORMASJON));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const tilrettelegginger = useContextGetData(ContextDataType.TILRETTELEGGINGER);

    const oppdaterEgenNæring = useContextSaveData(ContextDataType.EGEN_NÆRING);
    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const onSubmit = (values: Partial<EgenNæringFormData>) => {
        const næringsdata = mapEgenNæringFormValuesToState(values as EgenNæringFormData);

        if (
            søkerHarKunEtAktivtArbeid(
                barnet.termindato,
                søkerInfo.arbeidsforhold,
                inntektsinformasjon.harJobbetSomFrilans,
                inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende,
            )
        ) {
            const automatiskValgtTilrettelegging = [
                getNæringTilretteleggingOption(tilrettelegginger || [], næringsdata),
            ];
            oppdaterTilrettelegginger(automatiskValgtTilrettelegging);
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

    const formMethods = useForm<EgenNæringFormData>({
        defaultValues: getInitialEgenNæringFormValues(egenNæring),
    });

    const navnPåNæringSpm = intlUtils(intl, 'egenNæring.navnPåNæring');

    const næringsType = formMethods.watch(EgenNæringFormField.egenNæringType);
    const navnPåNæring = formMethods.watch(EgenNæringFormField.egenNæringNavn);
    const næringFom = formMethods.watch(EgenNæringFormField.egenNæringFom);
    const næringTom = formMethods.watch(EgenNæringFormField.egenNæringTom);

    const navnPåNæringLabel =
        næringsType === Næringstype.FISKER ? `${navnPåNæringSpm} ${intlUtils(intl, 'valgfritt')}` : navnPåNæringSpm;

    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            activeStepId="næring"
            pageTitle={intlUtils(intl, 'steps.label.næring')}
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={onFortsettSøknadSenere}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <BodyShort>
                        <FormattedMessage id="harValgfrieFelt" />
                    </BodyShort>
                    <RadioGroup
                        name={EgenNæringFormField.egenNæringType}
                        label={intlUtils(intl, 'egenNæring.næringstype')}
                        validate={[validateNæringstype(intl)]}
                    >
                        <Radio value={Næringstype.DAGMAMMA}>
                            <FormattedMessage id="egenNæring.næringstype.dagmamma" />
                        </Radio>
                        <Radio value={Næringstype.FISKER}>
                            <FormattedMessage id="egenNæring.næringstype.fiske" />
                        </Radio>
                        <Radio value={Næringstype.JORDBRUK}>
                            <FormattedMessage id="egenNæring.næringstype.jordbrukSkogbruk" />
                        </Radio>
                        <Radio value={Næringstype.ANNET}>
                            <FormattedMessage id="egenNæring.næringstype.annen" />
                        </Radio>
                    </RadioGroup>
                    <TextField
                        name={EgenNæringFormField.egenNæringNavn}
                        label={navnPåNæringLabel}
                        maxLength={100}
                        validate={[validateEgenNæringNavn(intl, navnPåNæringLabel, næringsType === Næringstype.FISKER)]}
                    />
                    <RadioGroup
                        name={EgenNæringFormField.egenNæringRegistrertINorge}
                        label={intlUtils(intl, 'egenNæring.erNæringenRegistrertINorge', {
                            navnPåNæringen: navnPåNæring,
                        })}
                        validate={[validateRegistrertINorge(intl)]}
                    >
                        <Radio value={true}>
                            <FormattedMessage id="ja" />
                        </Radio>
                        <Radio value={false}>
                            <FormattedMessage id="nei" />
                        </Radio>
                    </RadioGroup>
                    <OrgnummerEllerLand orgNummerErValgfritt={næringsType === Næringstype.FISKER} />
                    <Datepicker
                        name={EgenNæringFormField.egenNæringFom}
                        label={intlUtils(intl, 'egenNæring.næring.fom', {
                            navnPåNæringen: navnPåNæring,
                        })}
                        validate={[validateEgenNæringFom(intl, næringTom)]}
                        maxDate={dayjs().toDate()}
                        minDate={date20YearsAgo}
                    />
                    <RadioGroup
                        name={EgenNæringFormField.egenNæringPågående}
                        label={intlUtils(intl, 'egenNæring.næring.pågående', {
                            navnPåNæringen: navnPåNæring,
                        })}
                        validate={[validateNæringPågående(intl)]}
                    >
                        <Radio value={true}>
                            <FormattedMessage id="ja" />
                        </Radio>
                        <Radio value={false}>
                            <FormattedMessage id="nei" />
                        </Radio>
                    </RadioGroup>
                    <Datepicker
                        name={EgenNæringFormField.egenNæringTom}
                        label={intlUtils(intl, 'egenNæring.næring.tom', {
                            navnPåNæringen: navnPåNæring,
                        })}
                        description={intlUtils(intl, 'egenNæring.næring.tom.description')}
                        validate={[validateEgenNæringTom(intl, næringFom)]}
                        maxDate={dayjs().add(9, 'month').toDate()}
                        minDate={getMinInputTilOgMedValue(næringFom, date5MonthsAgo)}
                    />
                    <VarigEndringSpørsmål egenNæringFom={næringFom} egenNæringTom={næringTom} />
                    <TextField
                        name={EgenNæringFormField.egenNæringResultat}
                        label={intlUtils(intl, 'egenNæring.næringsinntekt')}
                        description={intlUtils(intl, 'egenNæring.næringsinntekt.description')}
                        validate={[validateEgenNæringResultat(intl)]}
                    />

                    <ReadMore header={intlUtils(intl, 'egenNæring.næringsinntekt.info.apneLabel')}>
                        <BodyShort>
                            <FormattedMessage id="egenNæring.næringsinntekt.info" />
                        </BodyShort>
                    </ReadMore>
                    <RadioGroup
                        name={EgenNæringFormField.egenNæringBlittYrkesaktivDe3SisteÅrene}
                        label={intlUtils(intl, 'egenNæring.blittYrkesaktivSiste3År')}
                        validate={[validateBlittYrkesaktivDe3SisteÅrene(intl)]}
                    >
                        <Radio value={true}>
                            <FormattedMessage id="ja" />
                        </Radio>
                        <Radio value={false}>
                            <FormattedMessage id="nei" />
                        </Radio>
                    </RadioGroup>
                    <Datepicker
                        name={EgenNæringFormField.egenNæringYrkesAktivDato}
                        label={intlUtils(intl, 'egenNæring.yrkesaktivDato')}
                        validate={[validateEgenNæringYrkesAktivDatoDato(intl)]}
                        maxDate={dayjs().toDate()}
                    />
                    <Alert variant="info">{intlUtils(intl, 'egenNæring.veileder')}</Alert>
                    <StepButtonsHookForm<EgenNæringFormData>
                        goToPreviousStep={() => {
                            const backRoute = getBackLinkForNæringSteg(inntektsinformasjon);
                            oppdaterAppRoute(backRoute);
                            navigate(backRoute);
                        }}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default EgenNæringStep;
