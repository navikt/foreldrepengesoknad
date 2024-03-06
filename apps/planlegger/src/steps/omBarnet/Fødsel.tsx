import { TasklistStartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import GreenPanel from 'components/GreenPanel';
import Infoboks from 'components/Infoboks';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { finnNavn } from 'steps/arbeidssituasjon/situasjon/FlereForsørgere';
import { OmBarnet } from 'types/Barnet';
import { isAlene } from 'types/HvemPlanlegger';

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

const DATO_3_MND_FRAM = dayjs().startOf('days').add(3, 'months').add(1, 'day');
const DATO_3_ÅR_SIDEN = dayjs().startOf('days').subtract(3, 'years').add(1, 'day');

const Fødsel: React.FunctionComponent = () => {
    const formMethods = useForm<OmBarnet>();
    const intl = useIntl();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const hvorMange = formMethods.watch('hvorMange');
    const erFlereBarn = hvorMange === 'to' || hvorMange === 'flere ';
    const erFødt = formMethods.watch('erBarnetFødt');
    const erFødselsdato = formMethods.watch('fødselsdato');
    const termindato = formMethods.watch('termindato');
    const datoTreMndFraTermin = dayjs(termindato).subtract(3, 'month').toDate();
    console.log('datoTreMd', datoTreMndFraTermin);

    return (
        <Form formMethods={formMethods}>
            <VStack gap="10">
                <VStack gap="10">
                    <VStack gap="1">
                        <GreenPanel>
                            <RadioGroup
                                name="hvorMange"
                                label={
                                    isAlene(hvemPlanlegger) ? (
                                        <FormattedMessage id="barnet.hvorMangeDeg" />
                                    ) : (
                                        <FormattedMessage id="barnet.hvorMange" />
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
                                <Radio value={'ett'}>
                                    <FormattedMessage id="barnet.ett" />
                                </Radio>
                                <Radio value={'to'}>
                                    <FormattedMessage id="barnet.to" />
                                </Radio>
                                <Radio value={'flere'}>
                                    <FormattedMessage id="barnet.flereEnnTo" />
                                </Radio>
                            </RadioGroup>
                        </GreenPanel>
                    </VStack>
                </VStack>

                {hvorMange && (
                    <VStack gap="1">
                        {erFlereBarn ? (
                            <GreenPanel>
                                <RadioGroup
                                    label={<FormattedMessage id="barnet.erFødtFlere" />}
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
                        ) : (
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
                        )}
                    </VStack>
                )}
                {erFødt ? (
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
                ) : (
                    <VStack gap="1">
                        <GreenPanel>
                            <Datepicker
                                label={<FormattedMessage id="barnet.fødselsdatoFlere" />}
                                name="fødselsdato1"
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
                                    <Infoboks
                                        header={<FormattedMessage id="barnet.underTreMndTilTerminDeg" />}
                                        icon={
                                            <TasklistStartIcon
                                                height={28}
                                                width={28}
                                                color="#236B7D"
                                                fontSize="1.5rem"
                                            />
                                        }
                                    >
                                        <BodyLong>
                                            <FormattedMessage id="barnet.underTreMndTilTerminDeg" />
                                        </BodyLong>

                                        <BodyLong>
                                            <FormattedMessage id="TODO" />
                                        </BodyLong>
                                    </Infoboks>
                                )}
                                {!isAlene(hvemPlanlegger) && (
                                    <Infoboks
                                        header={<FormattedMessage id="barnet.underTreMndTilTerminInfo" />}
                                        icon={
                                            <TasklistStartIcon
                                                height={28}
                                                width={28}
                                                color="#236B7D"
                                                fontSize="1.5rem"
                                            />
                                        }
                                    >
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
                        {termindato !== undefined && dayjs(termindato).isAfter(DATO_3_MND_FRAM) && (
                            <>
                                {isAlene(hvemPlanlegger) && (
                                    <Infoboks
                                        header={
                                            <FormattedMessage
                                                id="barnet.foreldrepengerInfoDeg"
                                                values={{ dato: dayjs(datoTreMndFraTermin).format('DD.MM.YY') }}
                                            />
                                        }
                                        icon={
                                            <TasklistStartIcon
                                                height={28}
                                                width={28}
                                                color="#236B7D"
                                                fontSize="1.5rem"
                                            />
                                        }
                                    >
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
                                    <Infoboks
                                        header={
                                            <FormattedMessage
                                                id="barnet.foreldrepengerInfo"
                                                values={{ dato: dayjs(datoTreMndFraTermin).format('DD.MM.YY') }}
                                            />
                                        }
                                        icon={
                                            <TasklistStartIcon
                                                height={28}
                                                width={28}
                                                color="#236B7D"
                                                fontSize="1.5rem"
                                            />
                                        }
                                    >
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
                {erFødselsdato !== undefined && dayjs(erFødselsdato).isBefore(DATO_3_MND_FRAM) && (
                    <>
                        {isAlene(hvemPlanlegger) && (
                            <Infoboks
                                header={<FormattedMessage id="barnet.født.infoboksTittelDeg" />}
                                icon={<TasklistStartIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" />}
                            >
                                <BodyLong>
                                    <FormattedMessage id="barnet.født.infoboksTekstDel1" />
                                </BodyLong>

                                <BodyLong>
                                    <FormattedMessage id="barnet.født.infoboksTekstDel2" />
                                </BodyLong>
                            </Infoboks>
                        )}
                        {!isAlene(hvemPlanlegger) && (
                            <Infoboks
                                header={<FormattedMessage id="barnet.født.infoboksTittel" />}
                                icon={<TasklistStartIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" />}
                            >
                                <BodyLong>
                                    <FormattedMessage id="barnet.født.infoboksTekstDel1" />
                                </BodyLong>

                                <BodyLong>
                                    <FormattedMessage id="barnet.født.infoboksTekstDel2" />
                                </BodyLong>

                                <BodyLong>
                                    <FormattedMessage id="barnet.født.infoboksTekstFar" />
                                </BodyLong>
                            </Infoboks>
                        )}
                    </>
                )}
                {dayjs(erFødselsdato).isBefore(DATO_3_ÅR_SIDEN) && (
                    <>
                        {isAlene(hvemPlanlegger) && (
                            <Infoboks
                                header={<FormattedMessage id="barnet.født.infoboksTittelDeg.eldreEnnTreÅr" />}
                                icon={<TasklistStartIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" />}
                            >
                                <BodyLong>
                                    <FormattedMessage id="barnet.født.infoboksTekst.eldreEnnTreÅr" />
                                </BodyLong>

                                <BodyLong>
                                    <FormattedMessage id="barnet.født.infoboksTekstDel1" />
                                </BodyLong>
                            </Infoboks>
                        )}
                        {!isAlene(hvemPlanlegger) && (
                            <Infoboks
                                header={<FormattedMessage id="barnet.født.infoboksTittel.eldreEnnTreÅr" />}
                                icon={<TasklistStartIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" />}
                            >
                                <BodyLong>
                                    <FormattedMessage id="barnet.født.infoboksTekst.eldreEnnTreÅr" />
                                </BodyLong>

                                <BodyLong>
                                    <FormattedMessage id="barnet.født.infoboksTekstDel1" />
                                </BodyLong>
                            </Infoboks>
                        )}
                    </>
                )}
            </VStack>
        </Form>
    );
};
export default Fødsel;
