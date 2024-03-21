import { TasklistStartIcon } from '@navikt/aksel-icons';
import GreenPanel from 'components/boxes/GreenPanel';
import Infoboks from 'components/boxes/Infoboks';
import GreenRadioGroup from 'components/formWrappers/GreenRadioGroup';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, getNavnPåSøker, isAlene, isFar, isMor } from 'types/HvemPlanlegger';
import { formatError } from 'utils/customErrorFormatter';

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
const DATO_3_ÅR_SIDEN = dayjs().startOf('days').subtract(3, 'years').add(1, 'day');

type Props = {
    hvemPlanlegger: HvemPlanlegger;
    erOmBarnetIkkeOppgittFraFør: boolean;
};

const Fødsel: React.FunctionComponent<Props> = ({ hvemPlanlegger, erOmBarnetIkkeOppgittFraFør }) => {
    const formMethods = useFormContext<OmBarnet>();
    const intl = useIntl();
    const antallBarn = formMethods.watch('antallBarn');
    const flereBarn = antallBarn === '3' || antallBarn === '2';

    const erBarnetFødt = formMethods.watch('erBarnetFødt');
    const erFødselsdato = formMethods.watch('fødselsdato');

    const termindato = formMethods.watch('termindato');
    const datoTreMndFraTermin = dayjs(termindato).subtract(3, 'month').toDate();

    const erAlenesøker = isAlene(hvemPlanlegger);
    const erMor = isMor(hvemPlanlegger);
    const erFar = isFar(hvemPlanlegger);

    return (
        <VStack gap="10">
            <GreenRadioGroup
                label={
                    !flereBarn ? <FormattedMessage id="barnet.erFødt" /> : <FormattedMessage id="barnet.erFødtFlere" />
                }
                name="erBarnetFødt"
                validate={[
                    isRequired(
                        intl.formatMessage({
                            id: 'validation.required',
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
                <VStack gap="5">
                    <GreenPanel isDarkGreen={erOmBarnetIkkeOppgittFraFør}>
                        <VStack gap="10">
                            <Datepicker
                                label={
                                    flereBarn ? (
                                        <FormattedMessage id="barnet.fødselsdatoFlere" />
                                    ) : (
                                        <FormattedMessage id="barnet.fødselsdato" />
                                    )
                                }
                                name="fødselsdato"
                                minDate={dayjs().subtract(6, 'month').toDate()}
                                maxDate={dayjs().toDate()}
                                autofocusWhenEmpty
                                validate={[
                                    isRequired(intl.formatMessage({ id: 'validation.required' })),
                                    isValidDate(intl.formatMessage({ id: 'validation.validDate' })),
                                    isBeforeTodayOrToday(
                                        intl.formatMessage({
                                            id: 'validation.inFuture',
                                        }),
                                    ),
                                    isAfterOrSameAsSixMonthsAgo(
                                        intl.formatMessage({
                                            id: 'validation.olderThan6months',
                                        }),
                                    ),
                                ]}
                                customErrorFormatter={formatError}
                            />
                            <Datepicker
                                label={<FormattedMessage id="barnet.nårVarTermin" />}
                                name="termindato"
                                minDate={dayjs().subtract(3, 'week').toDate()}
                                maxDate={dayjs().add(18, 'weeks').add(3, 'days').toDate()}
                                validate={[
                                    isRequired(intl.formatMessage({ id: 'validation.required' })),
                                    isValidDate(intl.formatMessage({ id: 'validation.validDate' })),

                                    erI22SvangerskapsukeEllerSenere(
                                        intl.formatMessage({
                                            id: 'validation.duMåVæreIUke22',
                                        }),
                                    ),
                                ]}
                                customErrorFormatter={formatError}
                            />
                        </VStack>
                    </GreenPanel>

                    {erFødselsdato !== undefined && dayjs(erFødselsdato).isAfter(DATO_3_ÅR_SIDEN) && (
                        <Infoboks
                            header={
                                erAlenesøker ? (
                                    <FormattedMessage id="barnet.født.infoboksTittelDeg" />
                                ) : (
                                    <FormattedMessage id="barnet.født.infoboksTittel" />
                                )
                            }
                            icon={<TasklistStartIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" />}
                        >
                            <BodyLong>
                                <FormattedMessage id="barnet.født.infoboks.manKanSøkeTilbakeITid" />
                            </BodyLong>

                            <BodyLong>
                                <FormattedMessage id="barnet.født.infoboksTekstDel2" />
                            </BodyLong>
                            {!erAlenesøker && (
                                <BodyLong>
                                    <FormattedMessage id="barnet.født.infoboksTekstFar" />
                                </BodyLong>
                            )}
                        </Infoboks>
                    )}
                    {erFødselsdato !== undefined && dayjs(erFødselsdato).isBefore(DATO_3_ÅR_SIDEN) && (
                        <Infoboks
                            header={
                                erAlenesøker ? (
                                    <FormattedMessage id="barnet.født.infoboksTittelDeg.eldreEnnTreÅr" />
                                ) : (
                                    <FormattedMessage id="barnet.født.infoboksTittel.eldreEnnTreÅr" />
                                )
                            }
                            icon={<TasklistStartIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" />}
                        >
                            <BodyLong>
                                <FormattedMessage id="barnet.født.infoboksTekst.eldreEnnTreÅr" />
                            </BodyLong>

                            <BodyLong>
                                <FormattedMessage id="barnet.født.infoboks.manKanSøkeTilbakeITid" />
                            </BodyLong>
                        </Infoboks>
                    )}
                </VStack>
            )}

            {erBarnetFødt === false && (
                <VStack gap="5">
                    <GreenPanel isDarkGreen={erOmBarnetIkkeOppgittFraFør}>
                        <Datepicker
                            label={<FormattedMessage id="barnet.termin" />}
                            name="termindato"
                            minDate={dayjs().subtract(3, 'week').toDate()}
                            maxDate={dayjs().add(18, 'weeks').add(3, 'days').toDate()}
                            autofocusWhenEmpty
                            validate={[
                                isRequired(intl.formatMessage({ id: 'validation.required' })),
                                isValidDate(intl.formatMessage({ id: 'validation.validDate' })),
                                isLessThanThreeWeeksAgo(
                                    intl.formatMessage({
                                        id: 'validation.kanIkkeVære3UkerFraIdag',
                                    }),
                                ),
                                erI22SvangerskapsukeEllerSenere(
                                    intl.formatMessage({
                                        id: 'validation.duMåVæreIUke22',
                                    }),
                                ),
                            ]}
                            customErrorFormatter={formatError}
                        />
                    </GreenPanel>
                    {dayjs(termindato).isAfter(DATO_3_MND_FRAM) && (
                        <>
                            {!erFar && (
                                <Infoboks
                                    header={
                                        erMor ? (
                                            <FormattedMessage
                                                id="barnet.foreldrepengerInfoDeg"
                                                values={{ dato: dayjs(datoTreMndFraTermin).format('DD.MM.YY') }}
                                            />
                                        ) : (
                                            <FormattedMessage
                                                id="barnet.foreldrepengerInfo"
                                                values={{ dato: dayjs(datoTreMndFraTermin).format('DD.MM.YY') }}
                                            />
                                        )
                                    }
                                    icon={
                                        <TasklistStartIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" />
                                    }
                                >
                                    <BodyLong>
                                        {erMor ? (
                                            <FormattedMessage id="barnet.foreldrepengerInfoTekstDeg" />
                                        ) : (
                                            <FormattedMessage id="barnet.foreldrepengerInfoTekst" />
                                        )}
                                    </BodyLong>

                                    <BodyLong>
                                        {erMor ? (
                                            <FormattedMessage id="barnet.foreldrepengerInfoTekstMor" />
                                        ) : (
                                            <FormattedMessage id="barnet.foreldrepengerInfoTekstMor" />
                                        )}
                                    </BodyLong>

                                    <BodyLong>
                                        {!erAlenesøker && <FormattedMessage id="barnet.foreldrepengerInfoTekstFar" />}
                                    </BodyLong>
                                </Infoboks>
                            )}
                        </>
                    )}
                    {termindato !== undefined && dayjs(termindato).isBefore(DATO_3_MND_FRAM) && (
                        <>
                            <Infoboks
                                header={
                                    erAlenesøker ? (
                                        <FormattedMessage id="barnet.underTreMndTilTerminDeg" />
                                    ) : (
                                        <FormattedMessage id="barnet.underTreMndTilTerminInfo" />
                                    )
                                }
                                icon={<TasklistStartIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" />}
                            >
                                <BodyLong>
                                    {erAlenesøker ? (
                                        <FormattedMessage id="barnet.underTreMndTilTerminDeg" />
                                    ) : (
                                        <FormattedMessage
                                            id="barnet.underTreMndTilTerminMor"
                                            values={{ navn: getNavnPåSøker(hvemPlanlegger, intl) }}
                                        />
                                    )}
                                </BodyLong>

                                <BodyLong>
                                    {erMor && <FormattedMessage id="barnet.foreldrepengerInfoTekstMor" />}
                                    {(!erAlenesøker || erFar) && (
                                        <FormattedMessage id="barnet.foreldrepengerInfoTekstFar" />
                                    )}
                                </BodyLong>
                            </Infoboks>
                        </>
                    )}
                </VStack>
            )}
        </VStack>
    );
};
export default Fødsel;
