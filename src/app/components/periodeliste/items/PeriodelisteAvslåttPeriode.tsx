import * as React from 'react';
import { onToggleItemProp } from '../../toggle-list/ToggleList';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import LinkButton from '../../link-button/LinkButton';
import { AvslåttPeriode } from '../../../types/uttaksplan/periodetyper';
import { Tidsperiode, NavnPåForeldre } from 'common/types';
import { Tidsperioden } from '../../../util/uttaksplan/Tidsperioden';
import Knapperad from 'common/components/knapperad/Knapperad';
import AdvarselIkon from '../../uttaksplan-ikon/ikoner/AdvarselIkon';
import PeriodelisteInfo from './PeriodelisteInfo';
import Block from 'common/components/block/Block';
import { getVarighetString } from 'common/util/intlUtils';
import { getStønadskontoNavn } from 'app/util/uttaksplan';

export interface Props {
    itemId: string;
    isExpanded: boolean;
    onToggle: onToggleItemProp;
    periode: AvslåttPeriode;
    navnPåForeldre: NavnPåForeldre;
    onLeggTilPeriode?: (tidsperiode: Tidsperiode) => void;
    onLeggTilOpphold?: (tidsperiode: Tidsperiode) => void;
}

const PeriodelisteAvslåttPeriode: React.StatelessComponent<Props & InjectedIntlProps> = ({
    itemId,
    isExpanded,
    onToggle,
    periode,
    onLeggTilPeriode,
    onLeggTilOpphold,
    navnPåForeldre,
    intl
}) => {
    const antallDager = Tidsperioden(periode.tidsperiode).getAntallUttaksdager();
    const knapper: React.ReactNode[] = [];

    if (onLeggTilPeriode) {
        knapper.unshift(
            <LinkButton key="periode" onClick={() => onLeggTilPeriode(periode.tidsperiode)}>
                {getMessage(intl, 'uttaksplan.hull.leggTil.uttak')}
            </LinkButton>
        );
    }

    if (onLeggTilOpphold) {
        knapper.unshift(
            <LinkButton key="opphold" onClick={() => onLeggTilOpphold(periode.tidsperiode)}>
                {getMessage(intl, 'uttaksplan.hull.leggTil.opphold')}
            </LinkButton>
        );
    }

    const tittel = getMessage(intl, 'periodeliste.ikkeInvilgetPeriode.tittel', {
        type: getMessage(intl, `periodetype.${periode.avslåttPeriodeType}`)
    });

    const beskrivelse = getMessage(intl, 'periodeliste.ikkeInvilgetPeriode.beskrivelse', {
        varighet: getVarighetString(antallDager, intl),
        konto: getStønadskontoNavn(intl, periode.stønadskonto, navnPåForeldre)
    });

    return (
        <PeriodelisteInfo
            id={itemId}
            tittel={tittel}
            isExpanded={isExpanded}
            onToggle={onToggle}
            beskrivelse={beskrivelse}
            ikon={<AdvarselIkon />}
            renderContent={() => (
                <div>
                    <Block>
                        <FormattedMessage
                            id={`periodeliste.ikkeInvilgetPeriode.expanded.beskrivelse.${periode.avslåttPeriodeType}`}
                        />
                    </Block>
                    <Knapperad align="left">{knapper}</Knapperad>
                </div>
            )}
        />
    );
};

export default injectIntl(PeriodelisteAvslåttPeriode);
