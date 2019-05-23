import * as React from 'react';
import { onToggleItemProp } from '../../toggle-list/ToggleList';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { Periode, GruppertInfoPeriode } from '../../../types/uttaksplan/periodetyper';
import { Tidsperiode, NavnPåForeldre } from 'common/types';
import { Tidsperioden } from '../../../util/uttaksplan/Tidsperioden';
import PeriodelisteInfo from './PeriodelisteInfo';
import { getVarighetString } from 'common/util/intlUtils';
import { getPeriodeForelderNavn, getForelderNavn } from 'app/util/uttaksplan';
import { getNavnGenitivEierform } from 'app/util/tekstUtils';
import EnkelPeriodeliste from 'app/components/enkelPeriodeliste/EnkelPeriodeliste';
import UttaksplanIkon, { UttaksplanIkonKeys } from 'app/components/uttaksplan-ikon/UttaksplanIkon';
import Block from 'common/components/block/Block';

export interface Props {
    itemId: string;
    isExpanded: boolean;
    onToggle: onToggleItemProp;
    periode: GruppertInfoPeriode;
    navnPåForeldre: NavnPåForeldre;
    nesteUttaksperiode?: Periode;
    onLeggTilPeriode?: (tidsperiode: Tidsperiode) => void;
    onLeggTilOpphold?: (tidsperiode: Tidsperiode) => void;
}

const PeriodelisteGruppertInfoPart: React.StatelessComponent<Props & InjectedIntlProps> = ({
    itemId,
    isExpanded,
    onToggle,
    periode,
    navnPåForeldre,
    intl
}) => {
    const antallDager = Tidsperioden(periode.tidsperiode).getAntallUttaksdager();

    const tittel = getMessage(intl, 'periodeliste.gruppertInfo.tittel', {
        navn: getNavnGenitivEierform(getPeriodeForelderNavn(periode, navnPåForeldre), intl.locale),
        antallPerioder: periode.perioder.length
    });

    return (
        <PeriodelisteInfo
            id={itemId}
            tittel={tittel}
            isExpanded={isExpanded}
            onToggle={onToggle}
            beskrivelse={getVarighetString(antallDager, intl)}
            tidsperiode={periode.tidsperiode}
            ikon={<UttaksplanIkon ikon={UttaksplanIkonKeys.advarsel} title={'sadf'} />}
            farge="transparent"
            periodeFargestrek={'infoBlue'}
            renderContent={() => (
                <div>
                    <Block margin="xs">
                        <strong>{getForelderNavn(periode.forelder, navnPåForeldre)}</strong> har registrert{' '}
                        {periode.perioder.length} periode{periode.perioder.length > 1 ? 'r' : ''}:
                    </Block>
                    <EnkelPeriodeliste
                        perioder={periode.perioder}
                        navnPåForeldre={navnPåForeldre}
                        visTidsperiode={true}
                        visStatus={true}
                    />
                </div>
            )}
        />
    );
};

export default injectIntl(PeriodelisteGruppertInfoPart);
