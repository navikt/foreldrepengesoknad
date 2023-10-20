import * as countries from 'i18n-iso-countries';
import { BodyLong, Label, VStack } from '@navikt/ds-react';
import { UtenlandsoppholdPeriode } from 'types/Utenlandsopphold';
import { formatDate } from '@navikt/fp-utils';
import { isBeforeToday, isToday } from '@navikt/fp-validation';
import { useIntl, IntlShape, FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';

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
    //TODO Bytt ut div under med Box når aksel-dep blir oppdatert
    return (
        <>
            {utenlandsoppholdListe.sort(sortOpphold).map((opphold) => (
                <div
                    key={`${opphold.landkode}${opphold.fom}`}
                    style={{ backgroundColor: 'var(--a-blue-100)', padding: '16px', borderRadius: '2px' }}
                >
                    <VStack gap="1">
                        <Label>
                            <FormattedMessage
                                id={isBeforeToday(opphold.fom) ? 'LandOppsummering.HarBodd' : 'LandOppsummering.SkalBo'}
                                values={{ country: countries.getName(opphold.landkode, 'nb') }}
                            />
                        </Label>
                        <BodyLong>
                            {formaterDato(opphold.fom, intl)} - {formaterDato(opphold.tom, intl)}
                        </BodyLong>
                    </VStack>
                </div>
            ))}
        </>
    );
};

export default LandOppsummering;
