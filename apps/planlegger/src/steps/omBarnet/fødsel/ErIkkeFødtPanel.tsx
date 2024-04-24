import { TasklistStartIcon } from '@navikt/aksel-icons';
import GreenPanel from 'components/boxes/GreenPanel';
import Infobox from 'components/boxes/Infobox';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import {
    erAlenesøker as erAlene,
    erFarDelAvSøknaden,
    erMorDelAvSøknaden,
    getFornavnPåSøker,
} from 'utils/HvemPlanleggerUtils';
import { formatError } from 'utils/customErrorFormatter';

import { BodyLong, VStack } from '@navikt/ds-react';

import { Datepicker } from '@navikt/fp-form-hooks';
import { isLessThanThreeWeeksAgo, isRequired, isValidDate } from '@navikt/fp-validation';

const DATO_3_MND_FRAM = dayjs().startOf('days').add(3, 'months').add(1, 'day');
const TODAY = dayjs().startOf('days');
const finnAnnenPartTekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string | undefined => {
    if (hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR) {
        return intl.formatMessage({ id: 'OversiktSteg.Medmor' });
    }
    if (erFarDelAvSøknaden(hvemPlanlegger)) {
        return intl.formatMessage({ id: 'OversiktSteg.Far' });
    }
    return undefined;
};
type Props = {
    hvemPlanlegger: HvemPlanlegger;
    erOmBarnetIkkeOppgittFraFør: boolean;
    antallBarn?: string;
    scrollToBottom: () => void;
};

const ErIkkeFødtPanel: React.FunctionComponent<Props> = ({
    hvemPlanlegger,
    erOmBarnetIkkeOppgittFraFør,
    scrollToBottom,
}) => {
    const intl = useIntl();

    const formMethods = useFormContext<OmBarnet>();
    const termindato = formMethods.watch('termindato');

    const datoSvangerskapsuke22 =
        termindato !== undefined ? dayjs(termindato).subtract(18, 'weeks').subtract(2, 'days').toDate() : undefined;

    const erAlenesøker = erAlene(hvemPlanlegger);
    const erFar = erFarDelAvSøknaden(hvemPlanlegger);

    return (
        <VStack gap="5">
            <GreenPanel isDarkGreen={erOmBarnetIkkeOppgittFraFør} shouldFadeIn>
                <Datepicker
                    label={<FormattedMessage id="ErIkkeFødtPanel.Termin" />}
                    name="termindato"
                    minDate={dayjs().subtract(3, 'week').toDate()}
                    maxDate={dayjs().add(1, 'year').toDate()}
                    autofocusWhenEmpty
                    useStrategyAbsolute
                    validate={[
                        isRequired(intl.formatMessage({ id: 'Termindato.Required' })),
                        isValidDate(intl.formatMessage({ id: 'ValidationMessage.ValidDate' })),
                        isLessThanThreeWeeksAgo(
                            intl.formatMessage({
                                id: 'ValidationMessage.KanIkkeVære3UkerFraIdag',
                            }),
                        ),
                    ]}
                    customErrorFormatter={formatError}
                    onChange={scrollToBottom}
                />
            </GreenPanel>
            {termindato !== undefined && dayjs(termindato).isAfter(DATO_3_MND_FRAM) && (
                <>
                    <Infobox
                        header={
                            <FormattedMessage
                                id="ErIkkeFødtPanel.ForeldrepengerInfo"
                                values={{
                                    erAlenesøker,
                                    dato: dayjs(datoSvangerskapsuke22).format('DD.MM.YY'),
                                }}
                            />
                        }
                        icon={
                            <TasklistStartIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" aria-hidden />
                        }
                        shouldFadeIn
                    >
                        <BodyLong>
                            <FormattedMessage
                                id="ErIkkeFødtPanel.ForeldrepengerInfoTekst.kanSøke"
                                values={{
                                    erAlenesøker,
                                }}
                            />
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage
                                id="ErIkkeFødtPanel.ForeldrepengerInfoTekst.NAVanbefaler"
                                values={{
                                    erMorDelAvSøknaden: erMorDelAvSøknaden(hvemPlanlegger),
                                }}
                            />
                        </BodyLong>
                        {erFarDelAvSøknaden(hvemPlanlegger) && (
                            <BodyLong>
                                <FormattedMessage
                                    id="ErIkkeFødtPanel.ForeldrepengerInfoTekst.toFørsteUkerDekket"
                                    values={{
                                        erFar,
                                        hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
                                    }}
                                />
                            </BodyLong>
                        )}
                    </Infobox>
                </>
            )}
            {termindato !== undefined && dayjs(termindato).isBefore(DATO_3_MND_FRAM) && (
                <>
                    <Infobox
                        header={
                            <>
                                {dayjs(termindato).isSameOrAfter(TODAY) ? (
                                    <FormattedMessage
                                        id="ErIkkeFødtPanel.UnderTreMndTilTerminInfo"
                                        values={{ erAlenesøker }}
                                    />
                                ) : (
                                    <FormattedMessage id="ErIkkeFødtPanel.TerminErForbi" values={{ erAlenesøker }} />
                                )}
                            </>
                        }
                        icon={
                            <TasklistStartIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" aria-hidden />
                        }
                        shouldFadeIn
                    >
                        <BodyLong>
                            {hvemPlanlegger.type === Situasjon.MOR && (
                                <FormattedMessage id="ErIkkeFødtPanel.UnderTreMndTilTermin" values={{ erAlenesøker }} />
                            )}
                        </BodyLong>
                        {!erAlenesøker && hvemPlanlegger.type !== Situasjon.FAR_OG_FAR && (
                            <BodyLong>
                                <FormattedMessage
                                    id="ErIkkeFødtPanel.UnderTreMndTilTermin"
                                    values={{ erAlenesøker, navn: getFornavnPåSøker(hvemPlanlegger, intl) }}
                                />
                            </BodyLong>
                        )}
                        {(!erAlenesøker || hvemPlanlegger.type === Situasjon.FAR) && (
                            <BodyLong>
                                <FormattedMessage
                                    id="ErIkkeFødtPanel.ForeldrepengerInfoTekst.toFørsteUkerDekket"
                                    values={{
                                        erAlenesøker,
                                        erFar,
                                        hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
                                    }}
                                />
                            </BodyLong>
                        )}
                    </Infobox>
                </>
            )}
        </VStack>
    );
};
export default ErIkkeFødtPanel;
