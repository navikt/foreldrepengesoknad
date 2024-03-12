import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { BodyShort, Radio, ReadMore, VStack } from '@navikt/ds-react';

import { Datepicker, ErrorSummaryHookForm, Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold } from '@navikt/fp-types';
import { Step } from '@navikt/fp-ui';
import {
    enMånedSiden,
    etÅrSiden,
    halvannetÅrSiden,
    isValidDate as isStringADate,
    niMånederFremITid,
} from '@navikt/fp-utils';
import {
    isAfterOrSame,
    isBeforeDate,
    isBeforeTodayOrToday,
    isLessThanOneAndHalfYearsAgo,
    isRequired,
    isValidDate,
} from '@navikt/fp-validation';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/appData/SvpDataContext';
import useStepConfig from 'app/appData/useStepConfig';
import useSvpNavigator from 'app/appData/useSvpNavigator';
import { Barn } from 'app/types/Barn';

const getMinDatoTermin = (erBarnetFødt: boolean, fødselsdato?: string): Dayjs =>
    erBarnetFødt && fødselsdato && isStringADate(fødselsdato) ? enMånedSiden(fødselsdato) : enMånedSiden(new Date());

const validerTermindato = (intl: IntlShape, fødselsdato?: string) => (termindato: string) => {
    if (fødselsdato && !dayjs(termindato).subtract(6, 'months').isSameOrBefore(dayjs(fødselsdato), 'day')) {
        return intl.formatMessage({
            id: 'valideringsfeil.barnet.termindato.6mndEtterFødsel',
        });
    }

    if (fødselsdato && !dayjs(termindato).add(1, 'months').isSameOrAfter(dayjs(fødselsdato), 'day')) {
        return intl.formatMessage({
            id: 'valideringsfeil.barnet.termindato.1mndFørFødsel',
        });
    }
    return null;
};

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
};

const Barnet: React.FunctionComponent<Props> = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const barnet = useContextGetData(ContextDataType.OM_BARNET);
    const oppdaterOmBarnet = useContextSaveData(ContextDataType.OM_BARNET);

    const onSubmit = (values: Barn) => {
        oppdaterOmBarnet(values);
        return navigator.goToNextDefaultStep();
    };

    const formMethods = useForm<Barn>({
        shouldUnregister: true,
        defaultValues: barnet,
    });

    const erBarnetFødt = formMethods.watch('erBarnetFødt');
    const fødselsdato = formMethods.watch('fødselsdato');

    const minDatoTermin = getMinDatoTermin(erBarnetFødt, fødselsdato);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={navigator.fortsettSøknadSenere}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <div>
                        <RadioGroup
                            name="erBarnetFødt"
                            label={intl.formatMessage({ id: 'barnet.erBarnetFødt' })}
                            validate={[
                                isRequired(
                                    intl.formatMessage({
                                        id: 'valideringsfeil.barnet.erBarnetFødt.påkrevd',
                                    }),
                                ),
                            ]}
                        >
                            <Radio value={true}>
                                <FormattedMessage id="ja" />
                            </Radio>
                            <Radio value={false}>
                                <FormattedMessage id="nei" />
                            </Radio>
                        </RadioGroup>
                        <ReadMore header={intl.formatMessage({ id: 'barnet.erBarnetFødt.merInfo.tittel' })}>
                            <BodyShort>
                                <FormattedMessage id="barnet.erBarnetFødt.merInfo.tekst" />
                            </BodyShort>
                        </ReadMore>
                    </div>
                    {erBarnetFødt && (
                        <Datepicker
                            name="fødselsdato"
                            label={intl.formatMessage({ id: 'barnet.fødselsdato' })}
                            validate={[
                                isRequired(intl.formatMessage({ id: 'valideringsfeil.barnet.fødselsdato.duMåOppgi' })),
                                isValidDate(
                                    intl.formatMessage({ id: 'valideringsfeil.barnet.fødselsdato.ugyldigDatoFormat' }),
                                ),
                                isBeforeTodayOrToday(
                                    intl.formatMessage({
                                        id: 'valideringsfeil.barnet.fødselsdato.måVæreIdagEllerTidligere',
                                    }),
                                ),
                                isLessThanOneAndHalfYearsAgo(
                                    intl.formatMessage({
                                        id: 'valideringsfeil.barnet.termindato.forLangtTilbakeITid',
                                    }),
                                ),
                            ]}
                            minDate={halvannetÅrSiden(new Date())}
                            maxDate={dayjs().toDate()}
                        />
                    )}
                    <div>
                        <Datepicker
                            name="termindato"
                            label={intl.formatMessage({ id: 'barnet.termindato' })}
                            minDate={minDatoTermin}
                            maxDate={niMånederFremITid(new Date())}
                            validate={[
                                isRequired(intl.formatMessage({ id: 'valideringsfeil.barnet.termindato.duMåOppgi' })),
                                isValidDate(
                                    intl.formatMessage({ id: 'valideringsfeil.barnet.termindato.ugyldigDatoFormat' }),
                                ),
                                isBeforeDate(
                                    intl.formatMessage({ id: 'valideringsfeil.barnet.termindato.forLangtFremITid' }),
                                    niMånederFremITid(new Date()),
                                ),
                                (termindato) =>
                                    !fødselsdato
                                        ? isAfterOrSame(
                                              intl.formatMessage({
                                                  id: 'valideringsfeil.barnet.termindato.vennligstOppgiBarnetsFødselsDato',
                                              }),
                                              enMånedSiden(new Date()),
                                          )(termindato)
                                        : null,
                                isAfterOrSame(
                                    intl.formatMessage({ id: 'valideringsfeil.barnet.termindato.forLangtTilbakeITid' }),
                                    etÅrSiden(new Date()),
                                ),
                                validerTermindato(intl, fødselsdato),
                            ]}
                        />
                        <ReadMore header={intl.formatMessage({ id: 'barnet.termindato.merInfo.tittel' })}>
                            <BodyShort>
                                <FormattedMessage id="barnet.termindato.merInfo.tekst" />
                            </BodyShort>
                        </ReadMore>
                    </div>
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </VStack>
            </Form>
        </Step>
    );
};

export default Barnet;
