import * as React from 'react';
import { onToggleItemProp } from '../../toggle-list/ToggleList';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import LinkButton from '../../link-button/LinkButton';
import { PeriodeHull, Periode } from '../../../types/uttaksplan/periodetyper';
import { Tidsperiode } from 'common/types';
import { Tidsperioden } from '../../../util/uttaksplan/Tidsperioden';
import Knapperad from 'common/components/knapperad/Knapperad';
import AdvarselIkon from '../../uttaksplan-ikon/ikoner/AdvarselIkon';
import PeriodelisteInfo from './PeriodelisteInfo';
import Block from 'common/components/block/Block';

export interface Props {
    itemId: string;
    isExpanded: boolean;
    onToggle: onToggleItemProp;
    periode: PeriodeHull;
    nesteUttaksperiode?: Periode;
    onLeggTilPeriode?: (tidsperiode: Tidsperiode) => void;
    onLeggTilOpphold?: (tidsperiode: Tidsperiode) => void;
}

const PeriodelisteHullItem: React.StatelessComponent<Props & InjectedIntlProps> = ({
    itemId,
    isExpanded,
    onToggle,
    periode,
    onLeggTilPeriode,
    onLeggTilOpphold,
    intl
}) => {
    const antallDager = Tidsperioden(periode.tidsperiode).getAntallUttaksdager();
    const antallHelligdager = Tidsperioden(periode.tidsperiode).getAntallFridager();
    const antallUttaksdager = Tidsperioden(periode.tidsperiode).getAntallUttaksdager();
    const kunHelligdager = antallHelligdager === antallUttaksdager;
    const kunUttaksdager = antallHelligdager === 0;

    const knapper: React.ReactNode[] = [];
    if (onLeggTilPeriode) {
        knapper.unshift(
            <LinkButton key="periode" onClick={() => onLeggTilPeriode(periode.tidsperiode)}>
                {getMessage(intl, 'uttaksplan.hull.leggTil.uttak')}
            </LinkButton>
        );
    }

    if (onLeggTilOpphold && kunUttaksdager === true) {
        knapper.unshift(
            <LinkButton key="opphold" onClick={() => onLeggTilOpphold(periode.tidsperiode)}>
                {getMessage(intl, 'uttaksplan.hull.leggTil.opphold')}
            </LinkButton>
        );
    }

    const tittel = getMessage(intl, 'periodeliste.hull.tittel');
    const beskrivelse = getMessage(intl, 'periodeliste.hull.beskrivelse', { dager: antallDager });

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
                    <Block margin="xs" visible={kunHelligdager}>
                        <FormattedMessage id="periodeliste.hull.info.helligdager" />
                    </Block>
                    <Block margin="xs" visible={kunUttaksdager}>
                        <FormattedMessage
                            id="periodeliste.hull.info.uttaksdager"
                            values={{
                                dager: antallDager
                            }}
                        />
                    </Block>
                    <Block margin="xs" visible={kunUttaksdager === false && kunHelligdager === false}>
                        <FormattedMessage
                            id="periodeliste.hull.info.helligdagerOgUttaksdager"
                            values={{
                                dager: antallDager,
                                antallHelligdager
                            }}
                        />
                    </Block>
                    <Knapperad align="left">{knapper}</Knapperad>
                </div>
            )}
        />
    );
};

export default injectIntl(PeriodelisteHullItem);
