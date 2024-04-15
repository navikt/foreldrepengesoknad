import GreenPanel from 'components/boxes/GreenPanel';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { Datepicker } from '@navikt/fp-form-hooks';
import { isAfterOrSameAsSixMonthsAgo, isBeforeTodayOrToday, isRequired, isValidDate } from '@navikt/fp-validation';
import { isLessThan15yearsAgo } from '@navikt/fp-validation/src/form/dateFormValidation';

type Props = {
    erAlenesøker: boolean;
    erOmBarnetIkkeOppgittFraFør: boolean;
    antallBarn?: string;
};

const Adopsjon: React.FunctionComponent<Props> = ({ erAlenesøker, erOmBarnetIkkeOppgittFraFør, antallBarn }) => {
    const intl = useIntl();

    const flereBarn = antallBarn === '3' || antallBarn === '2';

    return (
        <GreenPanel isDarkGreen={erOmBarnetIkkeOppgittFraFør}>
            <VStack gap="10">
                <Datepicker
                    label={<FormattedMessage id="Adopsjon.Overtakelsesdato" values={{ erAlenesøker, flereBarn }} />}
                    name="overtakelsesdato"
                    minDate={dayjs().subtract(6, 'month').toDate()}
                    autofocusWhenEmpty
                    validate={[
                        isRequired(intl.formatMessage({ id: 'ValidationMessage.Required' })),
                        isValidDate(intl.formatMessage({ id: 'ValidationMessage.ValidDate' })),
                        isAfterOrSameAsSixMonthsAgo(
                            intl.formatMessage({
                                id: 'ValidationMessage.OlderThan6months',
                            }),
                        ),
                    ]}
                />
                <Datepicker
                    label={<FormattedMessage id="Adopsjon.Fødselsdato" values={{ flereBarn }} />}
                    name="fødselsdato"
                    minDate={dayjs().subtract(15, 'years').toDate()}
                    maxDate={dayjs().toDate()}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'ValidationMessage.Required' })),
                        isValidDate(intl.formatMessage({ id: 'ValidationMessage.ValidDate' })),
                        isBeforeTodayOrToday(
                            intl.formatMessage({
                                id: 'ValidationMessage.IdagEllerTidligere',
                            }),
                        ),
                        isLessThan15yearsAgo(
                            intl.formatMessage({
                                id: 'ValidationMessage.KanIkkeVære3UkerFraIdag',
                            }),
                        ),
                    ]}
                />
            </VStack>
        </GreenPanel>
    );
};

export default Adopsjon;
