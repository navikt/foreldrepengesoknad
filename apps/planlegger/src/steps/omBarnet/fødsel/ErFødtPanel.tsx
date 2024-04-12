import { TasklistStartIcon } from '@navikt/aksel-icons';
import GreenPanel from 'components/boxes/GreenPanel';
import Infobox from 'components/boxes/Infobox';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon, getFornavnPåAnnenPart, isAlene } from 'types/HvemPlanlegger';
import { formatError } from 'utils/customErrorFormatter';

import { BodyLong, VStack } from '@navikt/ds-react';

import { Datepicker } from '@navikt/fp-form-hooks';
import {
    erI22SvangerskapsukeEllerSenere,
    isAfterOrSameAsSixMonthsAgo,
    isBeforeTodayOrToday,
    isRequired,
    isValidDate,
} from '@navikt/fp-validation';

const DATO_3_ÅR_SIDEN = dayjs().startOf('days').subtract(3, 'years').add(1, 'day');

type Props = {
    hvemPlanlegger: HvemPlanlegger;
    erOmBarnetIkkeOppgittFraFør: boolean;
    antallBarn?: string;
};

const ErFødtPanel: React.FunctionComponent<Props> = ({ hvemPlanlegger, erOmBarnetIkkeOppgittFraFør, antallBarn }) => {
    const intl = useIntl();

    const formMethods = useFormContext<OmBarnet>();
    const erFødselsdato = formMethods.watch('fødselsdato');

    const erAlenesøker = isAlene(hvemPlanlegger);
    const erFar = hvemPlanlegger.type === Situasjon.MOR_OG_FAR;
    return (
        <VStack gap="5">
            <GreenPanel isDarkGreen={erOmBarnetIkkeOppgittFraFør}>
                <VStack gap="10">
                    <Datepicker
                        label={<FormattedMessage id="ErFødtPanel.Fødselsdato" values={{ antallBarn }} />}
                        name="fødselsdato"
                        minDate={dayjs().subtract(6, 'month').toDate()}
                        maxDate={dayjs().toDate()}
                        autofocusWhenEmpty
                        useStrategyAbsolute
                        validate={[
                            isRequired(intl.formatMessage({ id: 'ValidationMessage.Required' })),
                            isValidDate(intl.formatMessage({ id: 'ValidationMessage.ValidDate' })),
                            isBeforeTodayOrToday(
                                intl.formatMessage({
                                    id: 'ValidationMessage.InFuture',
                                }),
                            ),
                            isAfterOrSameAsSixMonthsAgo(
                                intl.formatMessage({
                                    id: 'ValidationMessage.OlderThan6months',
                                }),
                            ),
                        ]}
                        customErrorFormatter={formatError}
                    />
                    <Datepicker
                        label={<FormattedMessage id="ErFødtPanel.NårVarTermin" />}
                        name="termindato"
                        minDate={dayjs().subtract(3, 'week').toDate()}
                        maxDate={dayjs().add(18, 'weeks').add(3, 'days').toDate()}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'ValidationMessage.Required' })),
                            isValidDate(intl.formatMessage({ id: 'ValidationMessage.ValidDate' })),

                            erI22SvangerskapsukeEllerSenere(
                                intl.formatMessage({
                                    id: 'ValidationMessage.DuMåVæreIUke22',
                                }),
                            ),
                        ]}
                        customErrorFormatter={formatError}
                        useStrategyAbsolute
                    />
                </VStack>
            </GreenPanel>
            {erFødselsdato !== undefined && dayjs(erFødselsdato).isAfter(DATO_3_ÅR_SIDEN) && (
                <Infobox
                    header={<FormattedMessage id="ErFødtPanel.Født.InfoboksTittel" values={{ erAlenesøker }} />}
                    icon={<TasklistStartIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" />}
                >
                    <BodyLong>
                        <FormattedMessage id="ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid" />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage id="ErFødtPanel.Født.InfoboksTekstDel2" />
                    </BodyLong>
                    {!erAlenesøker && (
                        <BodyLong>
                            <FormattedMessage
                                id="ErFødtPanel.Født.InfoboksTekst.toFørsteUkerDekket"
                                values={{ erFar, hvem: getFornavnPåAnnenPart(hvemPlanlegger, intl) }}
                            />
                        </BodyLong>
                    )}
                </Infobox>
            )}
            {erFødselsdato !== undefined && dayjs(erFødselsdato).isBefore(DATO_3_ÅR_SIDEN) && (
                <Infobox
                    header={
                        <FormattedMessage
                            id="ErFødtPanel.Født.InfoboksTittel.EldreEnnTreÅr"
                            values={{ erAlenesøker }}
                        />
                    }
                    icon={<TasklistStartIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" />}
                >
                    <BodyLong>
                        <FormattedMessage id="ErFødtPanel.Født.InfoboksTekst.EldreEnnTreÅr" />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage id="ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid" values={{ erFar }} />
                    </BodyLong>
                </Infobox>
            )}
        </VStack>
    );
};
export default ErFødtPanel;
