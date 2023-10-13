import * as countries from 'i18n-iso-countries';
import { formatDate } from '@navikt/fp-common';
import { BodyLong } from '@navikt/ds-react';
import { Periode } from 'types/Utenlandsopphold';

interface Props {
    utenlandsoppholdListe: Periode[];
}

const LandOppsummering: React.FunctionComponent<Props> = ({ utenlandsoppholdListe }) => (
    <ul className="landOppsummering">
        {utenlandsoppholdListe.map((opphold) => (
            <div key={`${opphold.landkode}${opphold.fom}`} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <BodyLong>{countries.getName(opphold.landkode, 'nb')}</BodyLong>
                <BodyLong>
                    {formatDate(opphold.fom)} - {formatDate(opphold.tom)}
                </BodyLong>
            </div>
        ))}
    </ul>
);

export default LandOppsummering;
