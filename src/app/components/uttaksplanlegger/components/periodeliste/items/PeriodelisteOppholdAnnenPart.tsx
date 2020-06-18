import * as React from 'react';
import { onToggleItemProp } from '../../../../elementer/toggleList/ToggleList';
import { injectIntl, IntlShape } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import {
    UttakAnnenPartInfoPeriode,
    UtsettelseAnnenPartInfoPeriode,
    isUttakAnnenPart,
} from '../../../../../types/uttaksplan/periodetyper';
import { NavnPåForeldre, Forelder, Tidsperiode } from 'common/types';
import { Tidsperioden } from '../../../../../util/uttaksplan/Tidsperioden';
import PeriodelisteInfo from './PeriodelisteInfo';
import { getVarighetString } from 'common/util/intlUtils';
import { getPeriodeIkon } from '../elements/PeriodeHeader';
import { getOppholdskontoNavn, getForelderNavn, getPeriodeForelderNavn, getUtsettelseTekst } from 'app/util/uttaksplan';
import { formaterDatoKompakt } from 'common/util/datoUtils';
import { getNavnGenitivEierform } from 'app/util/tekstUtils';
import { UttaksplanColor } from 'app/types/uttaksplan/colors';
import { getFloatFromString } from 'common/util/numberUtils';

export interface Props {
    itemId: string;
    isExpanded: boolean;
    onToggle: onToggleItemProp;
    periode: UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode;
    navnPåForeldre: NavnPåForeldre;
    tidsperiode: Tidsperiode;
    intl: IntlShape;
}

const PeriodelisteOppholdAnnenPart: React.StatelessComponent<Props> = ({
    itemId,
    isExpanded,
    onToggle,
    periode,
    navnPåForeldre,
    tidsperiode,
    intl,
}) => {
    const antallDager = Tidsperioden(periode.tidsperiode).getAntallUttaksdager();
    const navn = getNavnGenitivEierform(getPeriodeForelderNavn(periode, navnPåForeldre), intl.locale);

    let tittel = getMessage(intl, 'periodeliste.oppholdAnnenPart.tittel', {
        navn,
    });

    if (isUttakAnnenPart(periode) && periode.samtidigUttakProsent !== undefined) {
        tittel = getMessage(intl, 'periodeliste.oppholdAnnenPart.tittel.gradertEllerSamtidigUttak', {
            navn,
            prosent: periode.samtidigUttakProsent,
        });
    }

    if (isUttakAnnenPart(periode) && periode.stillingsprosent !== undefined) {
        const prosent = 100 - getFloatFromString(periode.stillingsprosent)!;
        tittel = getMessage(intl, 'periodeliste.oppholdAnnenPart.tittel.gradertEllerSamtidigUttak', {
            navn,
            prosent: prosent.toString(),
        });
    }

    return (
        <PeriodelisteInfo
            id={itemId}
            tittel={tittel}
            isExpanded={isExpanded}
            onToggle={onToggle}
            beskrivelse={getVarighetString(antallDager, intl)}
            ikon={getPeriodeIkon(periode, navnPåForeldre)}
            farge={UttaksplanColor.transparent}
            border={true}
            tidsperiode={tidsperiode}
            annenForelderSamtidigUttakPeriode={undefined}
            renderContent={() => (
                <div>
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
                              periode.forelder === Forelder.mor
                          )
                        : getUtsettelseTekst(
                              intl,
                              periode.årsak,
                              getForelderNavn(periode.forelder, navnPåForeldre),
                              periode.forelder === Forelder.mor
                          )}
                </div>
            )}
        />
    );
};

export default injectIntl(PeriodelisteOppholdAnnenPart);
