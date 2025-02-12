import { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import {
    Forelder,
    NavnPåForeldre,
    UtsettelseAnnenPartInfoPeriode,
    UtsettelseÅrsakType,
    UttakAnnenPartInfoPeriode,
    isUttakAnnenPart,
} from '@navikt/fp-common';

import { formaterDatoKompakt } from '../../utils/dateUtils';
import { getForelderNavn, getOppholdskontoNavn } from '../../utils/periodeUtils';

export interface Props {
    periode: UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode;
    navnPåForeldre: NavnPåForeldre;
}

const getUtsettelseTekst = (intl: IntlShape, årsak: UtsettelseÅrsakType, foreldernavn: string, erMor: boolean) => {
    return erMor
        ? // @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart
          intl.formatMessage({ id: `uttaksplan.utsettelseårsaktype.foreldernavn.far.${årsak}` }, { foreldernavn })
        : // @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart
          intl.formatMessage({ id: `uttaksplan.utsettelseårsaktype.foreldernavn.mor.${årsak}` }, { foreldernavn });
};

// eslint-disable-next-line @typescript-eslint/no-restricted-types
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
// eslint-disable-next-line import/no-default-export
export default PeriodeInfo;
