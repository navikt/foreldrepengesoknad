import * as React from 'react';
import { onToggleItemProp } from '../../../../elementer/toggleList/ToggleList';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { UttakAnnenPartInfoPeriode } from '../../../../../types/uttaksplan/periodetyper';
import { NavnPåForeldre } from 'common/types';
import { Tidsperioden } from '../../../../../util/uttaksplan/Tidsperioden';
import PeriodelisteInfo from './PeriodelisteInfo';
import Block from 'common/components/block/Block';
import { getVarighetString } from 'common/util/intlUtils';
import UttaksplanAdvarselIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/AdvarselIkon';

export interface Props {
    itemId: string;
    isExpanded: boolean;
    onToggle: onToggleItemProp;
    periode: UttakAnnenPartInfoPeriode;
    navnPåForeldre: NavnPåForeldre;
}

const PeriodelisteOppholdAnnenPart: React.StatelessComponent<Props & InjectedIntlProps> = ({
    itemId,
    isExpanded,
    onToggle,
    periode,
    navnPåForeldre,
    intl
}) => {
    const antallDager = Tidsperioden(periode.tidsperiode).getAntallUttaksdager();

    const tittel = getMessage(intl, 'periodeliste.oppholdAnnenPart.tittel', {
        type: getMessage(intl, `periodetype.${periode.type}`)
    });

    return (
        <PeriodelisteInfo
            id={itemId}
            tittel={tittel}
            isExpanded={isExpanded}
            onToggle={onToggle}
            beskrivelse={getVarighetString(antallDager, intl)}
            ikon={<UttaksplanAdvarselIkon />}
            renderContent={() => (
                <div>
                    <Block>
                        <FormattedMessage id={`periodeliste.oppholdAnnenPart.expanded.beskrivelse.${periode.type}`} />
                    </Block>
                </div>
            )}
        />
    );
};

export default injectIntl(PeriodelisteOppholdAnnenPart);
