import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import * as countries from 'i18n-iso-countries';
import { BodyLong, BodyShort, Box, VStack } from '@navikt/ds-react';
import { formatDate, isBeforeToday, isToday } from '@navikt/fp-utils';
import { UtenlandsoppholdPeriode } from '@navikt/fp-types';

const formaterDato = (dato: string, intl: IntlShape) => {
    if (isToday(dato)) {
        return intl.formatMessage({ id: 'LandOppsummering.IDag' });
    }
    return formatDate(dato);
};

const sortOpphold = (o1: UtenlandsoppholdPeriode, o2: UtenlandsoppholdPeriode) => {
    return dayjs(o1.fom).isAfter(o2.fom, 'day') ? 1 : 0;
};

interface Props {
    utenlandsoppholdListe: UtenlandsoppholdPeriode[];
}

const LandOppsummering: React.FunctionComponent<Props> = ({ utenlandsoppholdListe }) => {
    const intl = useIntl();
    return (
        <>
            {utenlandsoppholdListe.sort(sortOpphold).map((opphold) => (
                <Box
                    key={`${opphold.landkode}${opphold.fom}`}
                    padding="4"
                    background="surface-alt-3-subtle"
                    borderRadius="medium"
                >
                    <VStack gap="1">
                        <BodyShort style={{ fontWeight: 'bold' }}>
                            {isBeforeToday(opphold.fom) && (
                                <FormattedMessage
                                    id="LandOppsummering.HarBodd"
                                    values={{ country: countries.getName(opphold.landkode, 'nb') }}
                                />
                            )}
                            {!isBeforeToday(opphold.fom) && (
                                <FormattedMessage
                                    id="LandOppsummering.SkalBo"
                                    values={{ country: countries.getName(opphold.landkode, 'nb') }}
                                />
                            )}
                        </BodyShort>
                        <BodyLong>
                            {formaterDato(opphold.fom, intl)} - {formaterDato(opphold.tom, intl)}
                        </BodyLong>
                    </VStack>
                </Box>
            ))}
        </>
    );
};

export default LandOppsummering;
