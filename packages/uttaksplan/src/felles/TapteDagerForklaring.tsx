import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { useUttaksplanData } from '../context/UttaksplanDataContext';

interface Props {
    /** Startdato for tapte-dager-perioden (eller første valgte dag i kalenderen). */
    fom: string;
}

/**
 * Forklarer hvorfor brukeren mister dager i en «dager du kan miste»-periode.
 * Viser ulik tekst avhengig av rettighetstype.
 */
export const TapteDagerForklaring = ({ fom }: Props) => {
    const {
        foreldreInfo: { søker, rettighetType },
        familiesituasjon,
        familiehendelsedato,
        valgtStønadskvote,
    } = useUttaksplanData();

    const bareFarMedmorHarRett = søker === 'FAR_MEDMOR' && rettighetType === 'BARE_SØKER_RETT';

    if (bareFarMedmorHarRett) {
        return (
            <BodyShort>
                <FormattedMessage id="uttaksplan.tapteDager.forklaring.bareFarMedmorRett" />
            </BodyShort>
        );
    }

    const erFødsel = familiesituasjon === 'fødsel';
    const beggeHarRett = rettighetType === 'BEGGE_RETT';
    const erPrematurFødsel = (valgtStønadskvote.tillegg?.prematur ?? 0) > 0;
    const innenSeksUkerEtterFødsel = dayjs(fom).isBefore(dayjs(familiehendelsedato).add(6, 'weeks'));

    if (erFødsel && beggeHarRett && !erPrematurFødsel && innenSeksUkerEtterFødsel) {
        return (
            <BodyShort>
                <FormattedMessage id="uttaksplan.tapteDager.forklaring.beggeRettFørsteSeksUker" />
            </BodyShort>
        );
    }

    return null;
};
