import { Alert, Link } from '@navikt/ds-react';
import { bemUtils, intlUtils } from '@navikt/fp-common';
import { Periode } from 'app/types/Periode';
import { Foreldrepengesak } from 'app/types/Foreldrepengesak';
import { getNavnPåForeldre } from 'app/utils/personUtils';

import { useIntl } from 'react-intl';
import { RettighetType } from 'app/types/RettighetType';
import PeriodeListe from '../periode-liste/PeriodeListe';
import { Next } from '@navikt/ds-icons';
import { Link as RouterLink } from 'react-router-dom';
import OversiktRoutes from 'app/routes/routes';
import './periodeOversikt.css';
interface Props {
    fremtidigePerioder?: Periode[];
    navnAnnenForelder: string;
    navnPåSøker: string;
    nåværendePerioder?: Periode[];
    overlappendePerioderAnnenPart: Periode[] | undefined;
    sak: Foreldrepengesak;
    tidligerePerioder?: Periode[];
    visHelePlanen: boolean;
}

const PeriodeOversikt: React.FunctionComponent<Props> = ({
    tidligerePerioder = [],
    nåværendePerioder = [],
    fremtidigePerioder = [],
    navnPåSøker,
    navnAnnenForelder,
    sak,
    visHelePlanen,
    overlappendePerioderAnnenPart: annenPartsOverlappendePerioder,
}) => {
    const intl = useIntl();
    const erFarEllerMedmor = !sak.sakTilhørerMor;
    const erAleneOmOmsorg = sak.rettighetType === RettighetType.ALENEOMSORG;
    const navnPåForeldre = getNavnPåForeldre(sak, navnPåSøker, navnAnnenForelder);
    const bem = bemUtils('periodeOversikt');
    return (
        <div className={bem.block}>
            {[...nåværendePerioder, ...fremtidigePerioder].length === 0 && !visHelePlanen && (
                <Alert className={bem.element('alert')} variant="info">
                    {intlUtils(intl, 'periodeOversikt.ingenPerioder.visKunNåværendeOgNeste')}
                </Alert>
            )}

            {[...tidligerePerioder, ...nåværendePerioder, ...fremtidigePerioder].length === 0 && visHelePlanen && (
                <Alert className={bem.element('alert')} variant="info">
                    {intlUtils(intl, 'periodeOversikt.ingenPerioder.visHelePlanen')}
                </Alert>
            )}

            {tidligerePerioder.length > 0 && visHelePlanen && (
                <PeriodeListe
                    tittel={'Tidligere perioder'}
                    periodeListe={tidligerePerioder}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={erFarEllerMedmor}
                    erAleneOmOmsorg={erAleneOmOmsorg}
                    overlappendePerioderAnnenPart={annenPartsOverlappendePerioder}
                />
            )}
            {nåværendePerioder.length > 0 && (
                <PeriodeListe
                    tittel={'Nåværende periode'}
                    periodeListe={nåværendePerioder}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={erFarEllerMedmor}
                    erAleneOmOmsorg={erAleneOmOmsorg}
                    overlappendePerioderAnnenPart={annenPartsOverlappendePerioder}
                />
            )}
            {fremtidigePerioder.length > 0 && (
                <PeriodeListe
                    tittel={visHelePlanen ? 'Fremtidige perioder' : 'Neste periode'}
                    periodeListe={visHelePlanen ? fremtidigePerioder : [fremtidigePerioder[0]]}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={erFarEllerMedmor}
                    erAleneOmOmsorg={erAleneOmOmsorg}
                    overlappendePerioderAnnenPart={annenPartsOverlappendePerioder}
                />
            )}
            {!visHelePlanen && (
                <Link className={bem.element('seHelePlanen')} as={RouterLink} to={OversiktRoutes.DIN_PLAN}>
                    Se hele planen <Next aria-hidden={true} />
                </Link>
            )}
        </div>
    );
};
export default PeriodeOversikt;
