import { Heading, Radio, VStack } from '@navikt/ds-react';
import { Datepicker, Form, RadioGroup } from '@navikt/fp-form-hooks';
import {
    erI22SvangerskapsukeEllerSenere,
    isAfterOrSameAsSixMonthsAgo,
    isBeforeTodayOrToday,
    isLessThanThreeWeeksAgo,
    isRequired,
    isValidDate,
    notEmpty,
} from '@navikt/fp-validation';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import GreenPanel from 'components/GreenPanel';
import styles from './omBarnetSteg.module.css';
import { AdopsjonsEnum, OmBarnet } from 'types/Barnet';
import { isAlene } from 'types/HvemPlanlegger';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';

const Adopsjon: React.FunctionComponent = () => {
    const formMethods = useForm<OmBarnet>();
    const intl = useIntl();
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));

    const hvorMange = formMethods.watch('hvorMange');
    const overtakelsesdato = formMethods.watch('overtakelsesdato');

    return (
        <Form formMethods={formMethods}>
            <VStack gap="10">
                <VStack gap="1">
                    <GreenPanel>
                        <RadioGroup
                            name="hvorMange"
                            label={
                                isAlene(hvemPlanlegger) ? (
                                    <FormattedMessage id="barnet.adopsjon.hvorMangeDeg" />
                                ) : (
                                    <FormattedMessage id="barnet.adopsjon.hvorMange" />
                                )
                            }
                            validate={[
                                isRequired(
                                    intl.formatMessage({
                                        id: 'feilmelding.fødselPanel.erBarnetFødt.duMåOppgi',
                                    }),
                                ),
                            ]}
                        >
                            <Radio value={AdopsjonsEnum.ETT}>
                                <FormattedMessage id="barnet.adopsjon.ett" />
                            </Radio>
                            <Radio value={AdopsjonsEnum.TO}>
                                <FormattedMessage id="barnet.adopsjon.to" />
                            </Radio>
                            <Radio value={AdopsjonsEnum.FLERE}>
                                <FormattedMessage id="barnet.adopsjon.flereEnnTo" />
                            </Radio>
                        </RadioGroup>
                    </GreenPanel>
                </VStack>

                {hvorMange && (
                    <VStack gap="1">
                        <GreenPanel>
                            <Datepicker
                                label={
                                    isAlene(hvemPlanlegger) ? (
                                        <FormattedMessage id="barnet.adopsjon.overtakelsesdatoDeg" />
                                    ) : (
                                        <FormattedMessage id="barnet.adopsjon.overtakelsesdato" />
                                    )
                                }
                                name="overtakelsesdato"
                                minDate={dayjs().subtract(6, 'month').toDate()}
                                maxDate={dayjs().toDate()}
                                validate={[
                                    isRequired(
                                        intl.formatMessage({ id: 'feilmelding.fødselPanel.fødselsdato.duMåOppgi' }),
                                    ),
                                    isValidDate(
                                        intl.formatMessage({ id: 'feilmelding.fødselPanel.fødselsdato.gyldig' }),
                                    ),
                                    isBeforeTodayOrToday(
                                        intl.formatMessage({
                                            id: 'feilmelding.fødselPanel.fødselsdato.måVæreIdagEllerTidligere',
                                        }),
                                    ),
                                    isAfterOrSameAsSixMonthsAgo(
                                        intl.formatMessage({
                                            id: 'feilmelding.fødselPanel.fødselsdato.ikkeMerEnn6MånederTilbake',
                                        }),
                                    ),
                                ]}
                            />
                        </GreenPanel>
                    </VStack>
                )}
                {overtakelsesdato && (
                    <VStack gap="1">
                        <div className={styles.greenPanel}>
                            <Heading size="small">
                                <FormattedMessage id="barnet.fødselsdato" />
                            </Heading>
                            <Datepicker
                                name="fødselsdato"
                                minDate={dayjs().subtract(3, 'week').toDate()}
                                maxDate={dayjs().add(18, 'weeks').add(3, 'days').toDate()}
                                validate={[
                                    isRequired(
                                        intl.formatMessage({ id: 'feilmelding.fødselPanel.termindato.duMåOppgi' }),
                                    ),
                                    isValidDate(
                                        intl.formatMessage({ id: 'feilmelding.fødselPanel.termindato.gyldig' }),
                                    ),
                                    isLessThanThreeWeeksAgo(
                                        intl.formatMessage({
                                            id: 'feilmelding.fødselPanel.termindato.termindatoKanIkkeVære3UkerFraIdag',
                                        }),
                                    ),
                                    erI22SvangerskapsukeEllerSenere(
                                        intl.formatMessage({
                                            id: 'feilmelding.fødselPanel.termindato.duMåVæreIUke22',
                                        }),
                                    ),
                                ]}
                            />
                        </div>
                    </VStack>
                )}
            </VStack>
        </Form>
    );
};

export default Adopsjon;
