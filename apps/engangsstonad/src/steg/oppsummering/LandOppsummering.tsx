import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';
import * as countries from 'i18n-iso-countries';
import { BodyLong, BodyShort, VStack } from '@navikt/ds-react';
import { useCustomIntl, I18nFn } from '@navikt/fp-ui';
import { formatDate, isBeforeToday, isToday } from '@navikt/fp-utils';
import { UtenlandsoppholdPeriode } from '@navikt/fp-types';

const formaterDato = (dato: string, i18n: I18nFn) => {
    if (isToday(dato)) {
        return i18n('LandOppsummering.IDag');
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
    const { i18n } = useCustomIntl();
    //TODO Bytt ut div under med Box når aksel-dep blir oppdatert
    return (
        <>
            {utenlandsoppholdListe.sort(sortOpphold).map((opphold) => (
                <div
                    key={`${opphold.landkode}${opphold.fom}`}
                    style={{ backgroundColor: 'var(--a-blue-100)', padding: '16px', borderRadius: '2px' }}
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
                            {formaterDato(opphold.fom, i18n)} - {formaterDato(opphold.tom, i18n)}
                        </BodyLong>
                    </VStack>
                </div>
            ))}
        </>
    );
};

export default LandOppsummering;
