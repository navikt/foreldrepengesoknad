import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { HStack, Heading, VStack } from '@navikt/ds-react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { UttaksdagenString } from '@navikt/fp-utils';
import { isBeforeOrSame, isRequired, isValidDate, isWeekday } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { FormValues } from './LeggTilEllerEndrePeriodeListPanel';

export const TidsperiodeSpørsmål = () => {
    const intl = useIntl();

    const { familiehendelsedato } = useUttaksplanData();

    const { watch, control } = useFormContext<FormValues>();

    const { tom, fom } = watch();

    const maxDate = dayjs(familiehendelsedato).add(3, 'years').format(ISO_DATE_FORMAT);

    return (
        <VStack gap="space-16">
            <Heading size="medium">
                <FormattedMessage id="uttaksplan.tidsperiodeSpørsmål.heading" />
            </Heading>
            <HStack gap="space-16">
                <RhfDatepicker
                    name="fom"
                    control={control}
                    showMonthAndYearDropdowns
                    minDate={UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerTidligere(
                        60,
                    )}
                    maxDate={maxDate}
                    label={intl.formatMessage({ id: 'TidsperiodeSpørsmål.fom' })}
                    disableWeekends={true}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.påkrevd' })),
                        isValidDate(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.gyldigDato' })),
                        isBeforeOrSame(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.førTilDato' }), tom),
                        isWeekday(intl.formatMessage({ id: 'endreTidsPeriodeModal.fom.måVæreUkedag' })),
                    ]}
                />
                <RhfDatepicker
                    name="tom"
                    control={control}
                    validate={[
                        isRequired(intl.formatMessage({ id: 'endreTidsPeriodeModal.tom.påkrevd' })),
                        isValidDate(intl.formatMessage({ id: 'endreTidsPeriodeModal.tom.gyldigDato' })),
                        isWeekday(intl.formatMessage({ id: 'endreTidsPeriodeModal.tom.måVæreUkedag' })),
                    ]}
                    label={intl.formatMessage({ id: 'TidsperiodeSpørsmål.tom' })}
                    disableWeekends={true}
                    minDate={fom}
                    maxDate={maxDate}
                />
            </HStack>
        </VStack>
    );
};
