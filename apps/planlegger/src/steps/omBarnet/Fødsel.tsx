import GreenPanel from 'components/GreenPanel';
import Infoboks from 'components/Infoboks';
import GreenRadioGroup from 'components/formWrappers/GreenRadioGroup';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { finnNavn } from 'steps/arbeidssituasjon/situasjon/FlereForsørgere';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, isAlene } from 'types/HvemPlanlegger';

import { BodyLong, Radio, VStack } from '@navikt/ds-react';

import { Datepicker } from '@navikt/fp-form-hooks';
import {
    erI22SvangerskapsukeEllerSenere,
    isAfterOrSameAsSixMonthsAgo,
    isBeforeTodayOrToday,
    isLessThanThreeWeeksAgo,
    isRequired,
    isValidDate,
} from '@navikt/fp-validation';

const DATO_3_MND_FRAM = dayjs().startOf('days').add(3, 'months').add(1, 'day');

type Props = {
    hvemPlanlegger: HvemPlanlegger;
    erOmBarnetIkkeOppgittFraFør: boolean;
};

const Fødsel: React.FunctionComponent<Props> = ({ hvemPlanlegger, erOmBarnetIkkeOppgittFraFør }) => {
    const formMethods = useFormContext<OmBarnet>();
    const intl = useIntl();

    const erBarnetFødt = formMethods.watch('erBarnetFødt');
    const termindato = formMethods.watch('termindato');

    const erAlenesøker = isAlene(hvemPlanlegger);

    return (
        <>
            <GreenRadioGroup
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
                <Radio value={true} autoFocus={erOmBarnetIkkeOppgittFraFør}>
                    <FormattedMessage id="ja" />
                </Radio>
                <Radio value={false}>
                    <FormattedMessage id="nei" />
                </Radio>
            </GreenRadioGroup>
            {erBarnetFødt && (
                <GreenPanel isDarkGreen={erOmBarnetIkkeOppgittFraFør}>
                    <VStack gap="10">
                        <Datepicker
                            label={<FormattedMessage id="barnet.fødselsdato" />}
                            name="fødselsdato"
                            minDate={dayjs().subtract(6, 'month').toDate()}
                            maxDate={dayjs().toDate()}
                            autofocusWhenEmpty
                            validate={[
                                isRequired(intl.formatMessage({ id: 'feilmelding.fødselPanel.fødselsdato.duMåOppgi' })),
                                isValidDate(intl.formatMessage({ id: 'feilmelding.fødselPanel.fødselsdato.gyldig' })),
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
                        <Datepicker
                            label={<FormattedMessage id="barnet.nårVarTermin" />}
                            name="termindato"
                            minDate={dayjs().subtract(3, 'week').toDate()}
                            maxDate={dayjs().add(18, 'weeks').add(3, 'days').toDate()}
                            validate={[
                                isRequired(intl.formatMessage({ id: 'feilmelding.fødselPanel.termindato.duMåOppgi' })),
                                isValidDate(intl.formatMessage({ id: 'feilmelding.fødselPanel.termindato.gyldig' })),
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
                    </VStack>
                </GreenPanel>
            )}
            {erBarnetFødt === false && (
                <>
                    <GreenPanel isDarkGreen={erOmBarnetIkkeOppgittFraFør}>
                        <Datepicker
                            label={<FormattedMessage id="barnet.termin" />}
                            name="termindato"
                            minDate={dayjs().subtract(3, 'week').toDate()}
                            maxDate={dayjs().add(18, 'weeks').add(3, 'days').toDate()}
                            autofocusWhenEmpty
                            validate={[
                                isRequired(intl.formatMessage({ id: 'feilmelding.fødselPanel.termindato.duMåOppgi' })),
                                isValidDate(intl.formatMessage({ id: 'feilmelding.fødselPanel.termindato.gyldig' })),
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
                            {erAlenesøker && (
                                <Infoboks header={<FormattedMessage id="barnet.underTreMndTilTerminDeg" />}>
                                    <BodyLong>
                                        <FormattedMessage id="barnet.underTreMndTilTerminDeg" />
                                    </BodyLong>

                                    <BodyLong>
                                        <FormattedMessage id="TODO" />
                                    </BodyLong>
                                </Infoboks>
                            )}
                            {!erAlenesøker && (
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
                            {erAlenesøker && (
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
                            {!erAlenesøker && (
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
                </>
            )}
        </>
    );
};
export default Fødsel;
