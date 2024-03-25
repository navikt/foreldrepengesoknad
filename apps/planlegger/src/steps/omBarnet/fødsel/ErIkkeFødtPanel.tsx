import { TasklistStartIcon } from '@navikt/aksel-icons';
import GreenPanel from 'components/boxes/GreenPanel';
import Infobox from 'components/boxes/Infobox';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, getNavnPåSøker, isAlene } from 'types/HvemPlanlegger';
import { Situasjon } from 'types/Søkersituasjon';
import { formatError } from 'utils/customErrorFormatter';

import { BodyLong, VStack } from '@navikt/ds-react';

import { Datepicker } from '@navikt/fp-form-hooks';
import {
    erI22SvangerskapsukeEllerSenere,
    isLessThanThreeWeeksAgo,
    isRequired,
    isValidDate,
} from '@navikt/fp-validation';

const DATO_3_MND_FRAM = dayjs().startOf('days').add(3, 'months').add(1, 'day');

type Props = {
    hvemPlanlegger: HvemPlanlegger;
    erOmBarnetIkkeOppgittFraFør: boolean;
    antallBarn?: string;
};

const Fødsel: React.FunctionComponent<Props> = ({ hvemPlanlegger, erOmBarnetIkkeOppgittFraFør }) => {
    const intl = useIntl();

    const formMethods = useFormContext<OmBarnet>();
    const termindato = formMethods.watch('termindato');

    const datoTreMndFraTermin = termindato !== undefined ? dayjs(termindato).subtract(3, 'month').toDate() : undefined;

    const erAlenesøker = isAlene(hvemPlanlegger);

    return (
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
            {termindato !== undefined && dayjs(termindato).isAfter(DATO_3_MND_FRAM) && (
                <>
                    {hvemPlanlegger.type !== Situasjon.FAR && (
                        <Infobox
                            header={
                                hvemPlanlegger.type === Situasjon.MOR ? (
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
                            icon={<TasklistStartIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" />}
                        >
                            <BodyLong>
                                {hvemPlanlegger.type === Situasjon.MOR ? (
                                    <FormattedMessage id="barnet.foreldrepengerInfoTekstDeg" />
                                ) : (
                                    <FormattedMessage id="barnet.foreldrepengerInfoTekst" />
                                )}
                            </BodyLong>

                            <BodyLong>
                                {hvemPlanlegger.type === Situasjon.MOR ? (
                                    <FormattedMessage id="barnet.foreldrepengerInfoTekstMor" />
                                ) : (
                                    <FormattedMessage id="barnet.foreldrepengerInfoTekstMor" />
                                )}
                            </BodyLong>

                            <BodyLong>
                                {!erAlenesøker && <FormattedMessage id="barnet.foreldrepengerInfoTekstFar" />}
                            </BodyLong>
                        </Infobox>
                    )}
                </>
            )}
            {termindato !== undefined && dayjs(termindato).isBefore(DATO_3_MND_FRAM) && (
                <>
                    <Infobox
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
                            {hvemPlanlegger.type === Situasjon.MOR && (
                                <FormattedMessage id="barnet.foreldrepengerInfoTekstMor" />
                            )}
                            {(!erAlenesøker || hvemPlanlegger.type === Situasjon.FAR) && (
                                <FormattedMessage id="barnet.foreldrepengerInfoTekstFar" />
                            )}
                        </BodyLong>
                    </Infobox>
                </>
            )}
        </VStack>
    );
};
export default Fødsel;
