import { BodyShort, Button, Radio, ReadMore, VStack } from '@navikt/ds-react';
import { Step, StepButtonWrapper } from '@navikt/fp-common';
import { Datepicker, Form, RadioGroup } from '@navikt/fp-form-hooks';
import { isBeforeTodayOrToday, isLessThanOneAndHalfYearsAgo, isRequired, isValidDate } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';
import SøknadRoutes from 'app/routes/routes';
import { Barn } from 'app/types/Barn';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { useStepConfig } from '../stepsConfig';
import { halvannetÅrSiden, enMånedSiden, etÅrSiden, niMånederFremITid } from '@navikt/fp-utils';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { Arbeidsforhold } from '@navikt/fp-types';

const getMinDatoTermin = (erBarnetFødt: boolean, fødselsdato?: string): Date =>
    erBarnetFødt && fødselsdato && isValidDate(fødselsdato)
        ? enMånedSiden(new Date(fødselsdato))
        : enMånedSiden(new Date());

const validerTermindato = (intl: IntlShape, fødselsdato?: string) => (termindato: string) => {
    if (dayjs(termindato).isSameOrAfter(niMånederFremITid(new Date()), 'day')) {
        return intl.formatMessage({
            id: 'valideringsfeil.barnet.termindato.forLangtFremITid',
        });
    }
    if (dayjs(termindato).isBefore(enMånedSiden(new Date()), 'day') && !fødselsdato) {
        return intl.formatMessage({
            id: 'valideringsfeil.barnet.termindato.vennligstOppgiBarnetsFødselsDato',
        });
    }
    if (dayjs(termindato).isBefore(etÅrSiden(new Date()), 'day')) {
        return intl.formatMessage({
            id: 'valideringsfeil.barnet.termindato.forLangtTilbakeITid',
        });
    }
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

    return undefined;
};

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
};

const Barnet: React.FunctionComponent<Props> = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(intl, arbeidsforhold);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    const barnet = useContextGetData(ContextDataType.OM_BARNET);

    const oppdaterOmBarnet = useContextSaveData(ContextDataType.OM_BARNET);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const onSubmit = (values: Barn) => {
        setIsSubmitting(true);

        oppdaterOmBarnet(values);
        oppdaterAppRoute(SøknadRoutes.UTENLANDSOPPHOLD);

        return mellomlagreSøknadOgNaviger();
    };

    const formMethods = useForm<Barn>({
        defaultValues: barnet,
    });

    const erBarnetFødt = formMethods.watch('erBarnetFødt');
    const fødselsdato = formMethods.watch('fødselsdato');

    const minDatoTermin = getMinDatoTermin(erBarnetFødt, fødselsdato);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            activeStepId="barnet"
            pageTitle={intl.formatMessage({ id: 'steps.label.barnet' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={onFortsettSøknadSenere}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
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
                                validerTermindato(intl, fødselsdato),
                            ]}
                        />
                        <ReadMore header={intl.formatMessage({ id: 'barnet.termindato.merInfo.tittel' })}>
                            <BodyShort>
                                <FormattedMessage id="barnet.termindato.merInfo.tekst" />
                            </BodyShort>
                        </ReadMore>
                    </div>
                    <StepButtonWrapper>
                        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                            <FormattedMessage id="søknad.gåVidere" />
                        </Button>
                    </StepButtonWrapper>
                </VStack>
            </Form>
        </Step>
    );
};

export default Barnet;
