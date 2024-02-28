import { BodyLong, Radio, VStack } from '@navikt/ds-react';
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
import { OmBarnet } from 'types/Barnet';
import Infoboks from 'components/Infoboks';
import { isAlene } from 'types/HvemPlanlegger';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import { finnNavn } from 'steps/arbeidssituasjon/situasjon/FlereForsørgere';

const DATO_3_MND_FRAM = dayjs().startOf('days').add(3, 'months').add(1, 'day');

const Fødsel: React.FunctionComponent = () => {
    const formMethods = useForm<OmBarnet>();
    const intl = useIntl();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const erFødt = formMethods.watch('erBarnetFødt');
    const erFødselsdato = formMethods.watch('fødselsdato');
    const termindato = formMethods.watch('termindato');

    return (
        <Form formMethods={formMethods}>
            <VStack gap="10">
                <VStack gap="1">
                    <GreenPanel>
                        <RadioGroup
                            label={<FormattedMessage id="barnet.erFødt" />}
                            name="erBarnetFødt"
                            validate={[
                                isRequired(
                                    intl.formatMessage({
                                        id: 'feilmelding.fødselPanel.erBarnetFødt.duMåOppgi',
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
                    </GreenPanel>
                </VStack>

                {erFødt && (
                    <VStack gap="1">
                        <GreenPanel>
                            <Datepicker
                                label={<FormattedMessage id="barnet.fødselsdato" />}
                                name="fødselsdato"
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

                {erFødt === false && (
                    <VStack gap="10">
                        <GreenPanel>
                            <Datepicker
                                label={<FormattedMessage id="barnet.termin" />}
                                name="termindato"
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
                        </GreenPanel>

                        {termindato !== undefined && dayjs(termindato).isBefore(DATO_3_MND_FRAM) && (
                            <>
                                {isAlene(hvemPlanlegger) && (
                                    <Infoboks header={<FormattedMessage id="barnet.underTreMndTilTerminDeg" />}>
                                        <BodyLong>
                                            <FormattedMessage id="barnet.underTreMndTilTerminDeg" />
                                        </BodyLong>

                                        <BodyLong>
                                            <FormattedMessage id="TODO" />
                                        </BodyLong>
                                    </Infoboks>
                                )}
                                {!isAlene(hvemPlanlegger) && (
                                    <Infoboks header={<FormattedMessage id="barnet.underTreMndTilTerminInfo" />}>
                                        <BodyLong>
                                            <FormattedMessage
                                                id="barnet.underTreMndTilTerminMor"
                                                values={{ navn: finnNavn(hvemPlanlegger)[0] }}
                                            />
                                        </BodyLong>

                                        <BodyLong>
                                            <FormattedMessage id="barnet.foreldrepengerInfoTekstFar" />
                                        </BodyLong>
                                    </Infoboks>
                                )}
                            </>
                        )}
                        {dayjs(termindato).isAfter(DATO_3_MND_FRAM) && (
                            <>
                                {isAlene(hvemPlanlegger) && (
                                    <Infoboks header={<FormattedMessage id="barnet.foreldrepengerInfoDeg" />}>
                                        <BodyLong>
                                            <FormattedMessage id="barnet.foreldrepengerInfoTekstDeg" />
                                        </BodyLong>

                                        <BodyLong>
                                            <FormattedMessage id="barnet.foreldrepengerInfoTekstMor" />
                                        </BodyLong>

                                        <BodyLong>
                                            <FormattedMessage id="barnet.foreldrepengerInfoTekstFar" />
                                        </BodyLong>
                                    </Infoboks>
                                )}
                                {!isAlene(hvemPlanlegger) && (
                                    <Infoboks header={<FormattedMessage id="barnet.foreldrepengerInfo" />}>
                                        <BodyLong>
                                            <FormattedMessage id="barnet.foreldrepengerInfoTekst" />
                                        </BodyLong>

                                        <BodyLong>
                                            <FormattedMessage id="barnet.foreldrepengerInfoTekstMor" />
                                        </BodyLong>

                                        <BodyLong>
                                            <FormattedMessage id="barnet.foreldrepengerInfoTekstFar" />
                                        </BodyLong>
                                    </Infoboks>
                                )}
                            </>
                        )}
                    </VStack>
                )}
                {erFødselsdato && (
                    <VStack gap="10">
                        <GreenPanel>
                            <Datepicker
                                label={<FormattedMessage id="barnet.nårVarTermin" />}
                                name="termindato"
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
                        </GreenPanel>
                    </VStack>
                )}
            </VStack>
        </Form>
    );
};
export default Fødsel;
