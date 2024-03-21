import GreenPanel from 'components/GreenPanel';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';

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
};

const Adopsjon: React.FunctionComponent<Props> = ({ erAlenesøker, erOmBarnetIkkeOppgittFraFør }) => {
    const intl = useIntl();
    const formMethods = useFormContext<OmBarnet>();

    const antallBarn = formMethods.watch('antallBarn');
    const flereBarn = antallBarn === '3' || antallBarn === '2';

    return (
        <GreenPanel isDarkGreen={erOmBarnetIkkeOppgittFraFør}>
            <VStack gap="10">
                <Datepicker
                    label={
                        erAlenesøker ? (
                            <>
                                {flereBarn ? (
                                    <FormattedMessage id="barnet.adopsjon.overtakelsesdatoDegFlere" />
                                ) : (
                                    <FormattedMessage id="barnet.adopsjon.overtakelsesdatoDeg" />
                                )}
                            </>
                        ) : (
                            <>
                                {flereBarn ? (
                                    <FormattedMessage id="barnet.adopsjon.overtakelsesdatoFlere" />
                                ) : (
                                    <FormattedMessage id="barnet.adopsjon.overtakelsesdato" />
                                )}
                            </>
                        )
                    }
                    name="overtakelsesdato"
                    minDate={dayjs().subtract(6, 'month').toDate()}
                    maxDate={dayjs().toDate()}
                    autofocusWhenEmpty
                    validate={[
                        isRequired(intl.formatMessage({ id: 'validation.required' })),
                        isValidDate(intl.formatMessage({ id: 'validation.validDate' })),
                        isBeforeTodayOrToday(
                            intl.formatMessage({
                                id: 'validation.IdagEllerTidligere',
                            }),
                        ),
                        isAfterOrSameAsSixMonthsAgo(
                            intl.formatMessage({
                                id: 'validation.olderThan6months',
                            }),
                        ),
                    ]}
                />
                <Datepicker
                    label={
                        flereBarn ? (
                            <FormattedMessage id="barnet.fødselsdatoFlere" />
                        ) : (
                            <FormattedMessage id="barnet.fødselsdato" />
                        )
                    }
                    name="fødselsdato"
                    minDate={dayjs().subtract(3, 'week').toDate()}
                    maxDate={dayjs().add(18, 'weeks').add(3, 'days').toDate()}
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
                />
            </VStack>
        </GreenPanel>
    );
};

export default Adopsjon;
