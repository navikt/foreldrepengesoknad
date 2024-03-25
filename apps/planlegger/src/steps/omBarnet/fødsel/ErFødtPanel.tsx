import { TasklistStartIcon } from '@navikt/aksel-icons';
import GreenPanel from 'components/boxes/GreenPanel';
import Infobox from 'components/boxes/Infobox';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, isAlene } from 'types/HvemPlanlegger';
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

    return (
        <VStack gap="5">
            <GreenPanel isDarkGreen={erOmBarnetIkkeOppgittFraFør}>
                <VStack gap="10">
                    <Datepicker
                        label={
                            antallBarn === '1' ? (
                                <FormattedMessage id="barnet.fødselsdato" />
                            ) : (
                                <FormattedMessage id="barnet.fødselsdatoFlere" />
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
                <Infobox
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
                </Infobox>
            )}
            {erFødselsdato !== undefined && dayjs(erFødselsdato).isBefore(DATO_3_ÅR_SIDEN) && (
                <Infobox
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
                </Infobox>
            )}
        </VStack>
    );
};
export default ErFødtPanel;
