import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { getForelderNavn } from '../tidslinjeUtils';
import InnslagLayout from '../elementer/InnslagLayout';
import { PeriodeinnslagProps } from '../Periodeinnslag';
import { TidslinjeinnslagType } from '../types';
import { getForsteUttaksdagFørDato } from '../../../utils/uttaksdagerUtils';

interface OwnProps {
    /** Default false. Om en skal vise fordeling av kvoter */
    visDetaljer?: boolean;
}

type Props = OwnProps & PeriodeinnslagProps;

const Periodeinfo: React.StatelessComponent<Props & InjectedIntlProps> = ({
    innslag,
    nesteInnslag,
    navnForelder1,
    navnForelder2,
    intl
}) => {
    const navn = getForelderNavn(
        innslag.periode.forelder,
        navnForelder1,
        navnForelder2
    );
    const tidsperiode = { ...innslag.periode.tidsperiode };
    if (nesteInnslag) {
        if (
            nesteInnslag.type === TidslinjeinnslagType.hendelse &&
            nesteInnslag.hendelse === 'permisjonsslutt'
        ) {
            tidsperiode.sluttdato = nesteInnslag.dato;
        } else {
            tidsperiode.sluttdato = getForsteUttaksdagFørDato(
                nesteInnslag.type === TidslinjeinnslagType.hendelse
                    ? nesteInnslag.dato
                    : nesteInnslag.periode.tidsperiode.startdato
            );
        }
    }

    return (
        <InnslagLayout
            tidsperiode={tidsperiode}
            ekstrainfo={innslag.ekstrainfo}>
            {intl.formatMessage(
                { id: 'uttaksplan.tidslinje.innslag.foreldrepenger' },
                { navn }
            )}
        </InnslagLayout>
    );
};

export default injectIntl(Periodeinfo);
