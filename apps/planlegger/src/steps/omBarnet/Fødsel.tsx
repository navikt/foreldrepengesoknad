import { Radio, VStack } from '@navikt/ds-react';
import { Datepicker, Form, RadioGroup } from '@navikt/fp-form-hooks';
import {
    erI22SvangerskapsukeEllerSenere,
    isAfterOrSameAsSixMonthsAgo,
    isBeforeTodayOrToday,
    isLessThanThreeWeeksAgo,
    isRequired,
    isValidDate,
} from '@navikt/fp-validation';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import Foreldrepengeinfo from './Foreldrepengeinfo';
import { useForm } from 'react-hook-form';
import GreenPanel from 'components/GreenPanel';
import { OmBarnet } from 'types/Barnet';
import { isLessThanThreeMonthsLeft } from './OmBarnetSteg';

const Fødsel: React.FunctionComponent = () => {
    const formMethods = useForm<OmBarnet>();
    const intl = useIntl();

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
                        {isLessThanThreeMonthsLeft(termindato) && (
                            <VStack gap="10">
                                <Foreldrepengeinfo />
                            </VStack>
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
