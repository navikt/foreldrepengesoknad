import { FunctionComponent } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import {
    Forelder,
    NavnPåForeldre,
    UtsettelseAnnenPartInfoPeriode,
    UtsettelseÅrsakType,
    UttakAnnenPartEØSInfoPeriode,
    UttakAnnenPartInfoPeriode,
    isUttakAnnenPart,
    isUttaksperiodeAnnenpartEøs,
} from '@navikt/fp-common';

import { formaterDatoKompakt } from '../../utils/dateUtils';
import { getForelderNavn, getOppholdskontoNavn } from '../../utils/periodeUtils';

interface Props {
    periode: UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode | UttakAnnenPartEØSInfoPeriode;
    navnPåForeldre: NavnPåForeldre;
}

const getUtsettelseTekst = (intl: IntlShape, årsak: UtsettelseÅrsakType, foreldernavn: string, erMor: boolean) => {
    return erMor
        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart
          intl.formatMessage({ id: `uttaksplan.utsettelseårsaktype.foreldernavn.far.${årsak}` }, { foreldernavn })
        : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart
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
            {isUttaksperiodeAnnenpartEøs(periode) && (
                <FormattedMessage
                    id="uttaksplan.periodeinfo.uttak.eøs.annenforelder"
                    //values={{ trekkdager: getVarighetString(periode.trekkdager, intl).toString() }}
                ></FormattedMessage>
            )}
            {!isUttaksperiodeAnnenpartEøs(periode) &&
                (isUttakAnnenPart(periode) || isUttaksperiodeAnnenpartEøs(periode)
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
                      ))}
        </BodyShort>
    );
};
// eslint-disable-next-line import/no-default-export
export default PeriodeInfo;
