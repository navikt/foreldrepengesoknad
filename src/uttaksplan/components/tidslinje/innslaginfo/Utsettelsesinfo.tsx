import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { Utsettelsesperiode, UtsettelseArsakType } from '../../../types';
import { getForelderNavn, getArsakTekstKey } from '../tidslinjeUtils';
import InnslagLayout from '../elementer/InnslagLayout';
import { PeriodeinnslagProps } from '../Periodeinnslag';
import { getUttaksdagerSomErFridager } from '../../../utils/uttaksdagerUtils';

const Utsettelsesinfo: React.StatelessComponent<
    PeriodeinnslagProps & InjectedIntlProps
> = (props) => {
    const { innslag, onRedigerUtsettelse, intl } = props;
    const periode: Utsettelsesperiode = innslag.periode as Utsettelsesperiode;
    const navn = getForelderNavn(
        periode.forelder,
        props.navnForelder1,
        props.navnForelder2
    );

    const arsak = intl.formatMessage({ id: getArsakTekstKey(periode.arsak) });
    const feriedager =
        periode.arsak === UtsettelseArsakType.Ferie
            ? getUttaksdagerSomErFridager(periode.tidsperiode)
            : [];
    let ekstrainfo;
    if (feriedager.length > 0) {
        ekstrainfo = {
            tekst: intl.formatMessage(
                { id: 'uttaksplan.tidslinje.ferie.fridager' },
                {
                    antallDager: feriedager.length
                }
            )
        };
    }
    return (
        <InnslagLayout
            tidsperiode={innslag.periode.tidsperiode}
            trekkFraFeriedager={feriedager.length > 0}
            ekstrainfo={ekstrainfo}
            onRediger={
                onRedigerUtsettelse
                    ? () => onRedigerUtsettelse(periode)
                    : undefined
            }>
            <FormattedMessage
                id="uttaksplan.tidslinje.utsettelse"
                values={{
                    navn,
                    arsak
                }}
            />
        </InnslagLayout>
    );
};

export default injectIntl(Utsettelsesinfo);
