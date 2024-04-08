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

const ErIkkeFødtPanel: React.FunctionComponent<Props> = ({ hvemPlanlegger, erOmBarnetIkkeOppgittFraFør }) => {
    const intl = useIntl();

    const formMethods = useFormContext<OmBarnet>();
    const termindato = formMethods.watch('termindato');

    const datoTreMndFraTermin = termindato !== undefined ? dayjs(termindato).subtract(3, 'month').toDate() : undefined;

    const erAlenesøker = isAlene(hvemPlanlegger);

    return (
        <VStack gap="5">
            <GreenPanel isDarkGreen={erOmBarnetIkkeOppgittFraFør}>
                <Datepicker
                    label={<FormattedMessage id="ErIkkeFødtPanel.Termin" />}
                    name="termindato"
                    minDate={dayjs().subtract(3, 'week').toDate()}
                    maxDate={dayjs().add(18, 'weeks').add(3, 'days').toDate()}
                    autofocusWhenEmpty
                    validate={[
                        isRequired(intl.formatMessage({ id: 'ValidationMessage.Required' })),
                        isValidDate(intl.formatMessage({ id: 'ValidationMessage.ValidDate' })),
                        isLessThanThreeWeeksAgo(
                            intl.formatMessage({
                                id: 'ValidationMessage.KanIkkeVære3UkerFraIdag',
                            }),
                        ),
                        erI22SvangerskapsukeEllerSenere(
                            intl.formatMessage({
                                id: 'ValidationMessage.DuMåVæreIUke22',
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
                                <FormattedMessage
                                    id="ErIkkeFødtPanel.ForeldrepengerInfo"
                                    values={{
                                        erMor: hvemPlanlegger.type === Situasjon.MOR,
                                        dato: dayjs(datoTreMndFraTermin).format('DD.MM.YY'),
                                    }}
                                />
                            }
                            icon={<TasklistStartIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" />}
                        >
                            <BodyLong>
                                <FormattedMessage
                                    id="ErIkkeFødtPanel.ForeldrepengerInfoTekst"
                                    values={{
                                        erMor: hvemPlanlegger.type === Situasjon.MOR,
                                    }}
                                />
                            </BodyLong>
                            <BodyLong>
                                {hvemPlanlegger.type === Situasjon.MOR ? (
                                    <FormattedMessage id="ErIkkeFødtPanel.ForeldrepengerInfoTekstMor" />
                                ) : (
                                    <FormattedMessage id="ErIkkeFødtPanel.ForeldrepengerInfoTekstFar" />
                                )}
                            </BodyLong>

                            <BodyLong>
                                {!erAlenesøker && <FormattedMessage id="ErIkkeFødtPanel.ForeldrepengerInfoTekstFar" />}
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
                                <FormattedMessage id="ErIkkeFødtPanel.UnderTreMndTilTermin" values={{ erAlenesøker }} />
                            ) : (
                                <FormattedMessage id="ErIkkeFødtPanel.UnderTreMndTilTerminInfo" />
                            )
                        }
                        icon={<TasklistStartIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" />}
                    >
                        <BodyLong>
                            <FormattedMessage
                                id="ErIkkeFødtPanel.UnderTreMndTilTermin"
                                values={{ erAlenesøker, navn: getNavnPåSøker(hvemPlanlegger, intl) }}
                            />
                        </BodyLong>
                        <BodyLong>
                            {hvemPlanlegger.type === Situasjon.MOR && (
                                <FormattedMessage id="ErIkkeFødtPanel.ForeldrepengerInfoTekstMor" />
                            )}
                            {(!erAlenesøker || hvemPlanlegger.type === Situasjon.FAR) && (
                                <FormattedMessage id="ErIkkeFødtPanel.ForeldrepengerInfoTekstFar" />
                            )}
                        </BodyLong>
                    </Infobox>
                </>
            )}
        </VStack>
    );
};
export default ErIkkeFødtPanel;
