import * as React from 'react';
import { onToggleItemProp } from '../../toggle-list/ToggleList';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { Periode, GruppertInfoPeriode } from '../../../types/uttaksplan/periodetyper';
import { Tidsperiode, NavnPåForeldre } from 'common/types';
import { Tidsperioden } from '../../../util/uttaksplan/Tidsperioden';
import AdvarselIkon from '../../uttaksplan-ikon/ikoner/AdvarselIkon';
import PeriodelisteInfo from './PeriodelisteInfo';
import Block from 'common/components/block/Block';
import { getVarighetString } from 'common/util/intlUtils';
import { getPeriodeForelderNavn } from 'app/util/uttaksplan';

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
        type: getMessage(intl, `periodetype.${periode.type}`)
    });

    return (
        <PeriodelisteInfo
            id={itemId}
            tittel={tittel}
            isExpanded={isExpanded}
            onToggle={onToggle}
            beskrivelse={getVarighetString(antallDager, intl)}
            ikon={<AdvarselIkon />}
            renderContent={() => (
                <div>
                    <Block>
                        {getPeriodeForelderNavn(periode, navnPåForeldre)}
                        <FormattedMessage id={`periodeliste.gruppertInfo.expanded.beskrivelse.${periode.type}`} />
                    </Block>
                </div>
            )}
        />
    );
};

export default injectIntl(PeriodelisteGruppertInfoPart);
