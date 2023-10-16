import { BodyShort } from '@navikt/ds-react';
import { Forelder, NavnPåForeldre, intlUtils, UtsettelseÅrsakType } from '@navikt/fp-common';
import { formaterDatoKompakt } from 'app/utils/dateUtils';
import { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { isUttakAnnenPart, UtsettelseAnnenPartInfoPeriode, UttakAnnenPartInfoPeriode } from 'types/Periode';
import { getForelderNavn, getOppholdskontoNavn } from 'utils/periodeUtils';

export interface Props {
    periode: UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode;
    navnPåForeldre: NavnPåForeldre;
}

const getUtsettelseTekst = (intl: IntlShape, årsak: UtsettelseÅrsakType, foreldernavn: string, erMor: boolean) => {
    return erMor
        ? intlUtils(intl, `uttaksplan.utsettelseårsaktype.foreldernavn.far.${årsak}`, { foreldernavn })
        : intlUtils(intl, `uttaksplan.utsettelseårsaktype.foreldernavn.mor.${årsak}`, { foreldernavn });
};

const PeriodeInfo: FunctionComponent<Props> = ({ periode, navnPåForeldre }) => {
    const intl = useIntl();

    return (
        <BodyShort>
            <strong>
                <span>{formaterDatoKompakt(periode.tidsperiode.fom)}</span>
                <span>&mdash;</span>
                <span>{formaterDatoKompakt(periode.tidsperiode.tom)}:</span>
            </strong>{' '}
            {isUttakAnnenPart(periode)
                ? getOppholdskontoNavn(
                      intl,
                      periode.årsak,
                      getForelderNavn(periode.forelder, navnPåForeldre),
                      periode.forelder === Forelder.mor,
                  )
                : getUtsettelseTekst(
                      intl,
                      periode.årsak,
                      getForelderNavn(periode.forelder, navnPåForeldre),
                      periode.forelder === Forelder.mor,
                  )}
        </BodyShort>
    );
};

export default PeriodeInfo;
