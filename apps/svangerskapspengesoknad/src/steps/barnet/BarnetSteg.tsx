import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import { useStepConfig } from 'appData/useStepConfig';
import { useSvpNavigator } from 'appData/useSvpNavigator';
import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Barn } from 'types/Barn';

import { BodyShort, Radio, ReadMore, VStack } from '@navikt/ds-react';

import {
    ErrorSummaryHookForm,
    RhfDatepicker,
    RhfForm,
    RhfRadioGroup,
    StepButtonsHookForm,
} from '@navikt/fp-form-hooks';
import { logAmplitudeEventOnOpen } from '@navikt/fp-metrics';
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

export const BarnetSteg = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }: Props) => {
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
            onStepChange={navigator.goToStep}
        >
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <div>
                        <RhfRadioGroup
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
                        </RhfRadioGroup>
                        <ReadMore
                            onOpenChange={logAmplitudeEventOnOpen('Svangerskapspenger', 'SVP_tilbake_i_tid')}
                            header={intl.formatMessage({ id: 'barnet.erBarnetFødt.merInfo.tittel' })}
                        >
                            <BodyShort>
                                <FormattedMessage id="barnet.erBarnetFødt.merInfo.tekst" />
                            </BodyShort>
                        </ReadMore>
                    </div>
                    {erBarnetFødt && (
                        <RhfDatepicker
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
                            onChange={() => formMethods.formState.isSubmitted && formMethods.trigger()}
                        />
                    )}
                    <div>
                        <RhfDatepicker
                            name="termindato"
                            label={intl.formatMessage({ id: 'barnet.termindato' })}
                            minDate={minDatoTermin}
                            maxDate={niMånederFremITid(new Date())}
                            useStrategyAbsolute
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
                        <ReadMore
                            onOpenChange={logAmplitudeEventOnOpen('Svangerskapspenger', 'SVP_tre_uker_før_termin')}
                            header={intl.formatMessage({ id: 'barnet.termindato.merInfo.tittel' })}
                        >
                            <BodyShort>
                                <FormattedMessage id="barnet.termindato.merInfo.tekst" />
                            </BodyShort>
                        </ReadMore>
                    </div>
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </VStack>
            </RhfForm>
        </Step>
    );
};
