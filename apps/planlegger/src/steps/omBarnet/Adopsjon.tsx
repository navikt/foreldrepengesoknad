import GreenPanel from 'components/boxes/GreenPanel';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { Datepicker } from '@navikt/fp-form-hooks';
import {
    erI22SvangerskapsukeEllerSenere,
    isAfterOrSameAsSixMonthsAgo,
    isBeforeTodayOrToday,
    isLessThanThreeWeeksAgo,
    isRequired,
    isValidDate,
} from '@navikt/fp-validation';

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
                    maxDate={dayjs().toDate()}
                    autofocusWhenEmpty
                    validate={[
                        isRequired(intl.formatMessage({ id: 'ValidationMessage.Required' })),
                        isValidDate(intl.formatMessage({ id: 'ValidationMessage.ValidDate' })),
                        isBeforeTodayOrToday(
                            intl.formatMessage({
                                id: 'ValidationMessage.IdagEllerTidligere',
                            }),
                        ),
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
                    minDate={dayjs().subtract(3, 'week').toDate()}
                    maxDate={dayjs().add(18, 'weeks').add(3, 'days').toDate()}
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
                />
            </VStack>
        </GreenPanel>
    );
};

export default Adopsjon;
