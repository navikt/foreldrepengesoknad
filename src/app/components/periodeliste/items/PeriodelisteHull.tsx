import * as React from 'react';
import { onToggleItemProp } from '../../toggle-list/ToggleList';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import LinkButton from '../../link-button/LinkButton';
import { PeriodeHull, Periode, Periodetype, PeriodeHullÅrsak } from '../../../types/uttaksplan/periodetyper';
import { NavnPåForeldre, Tidsperiode } from 'common/types';
import { Tidsperioden } from '../../../util/uttaksplan/Tidsperioden';
import { Periodene } from '../../../util/uttaksplan/Periodene';
import { getPeriodeTittel } from '../../../util/uttaksplan';
import { getVarighetString } from 'common/util/intlUtils';
import Knapperad from 'common/components/knapperad/Knapperad';
import AdvarselIkon from '../../uttaksplan-ikon/ikoner/AdvarselIkon';
import PeriodelisteInfo from './PeriodelisteInfo';
import Block from 'common/components/block/Block';

export interface Props {
    itemId: string;
    isExpanded: boolean;
    onToggle: onToggleItemProp;
    periode: PeriodeHull;
    uttaksplan: Periode[];
    nesteUttaksperiode?: Periode;
    navnPåForeldre: NavnPåForeldre;
    onLeggTilPeriode?: (tidsperiode: Tidsperiode) => void;
    onLeggTilOpphold?: (tidsperiode: Tidsperiode) => void;
    onFjernPeriode?: (periode: PeriodeHull) => void;
}

const PeriodelisteHullItem: React.StatelessComponent<Props & InjectedIntlProps> = ({
    itemId,
    isExpanded,
    onToggle,
    periode,
    uttaksplan,
    navnPåForeldre,
    onLeggTilPeriode,
    onLeggTilOpphold,
    onFjernPeriode,
    intl
}) => {
    const antallDager = Tidsperioden(periode.tidsperiode).getAntallUttaksdager();
    const knapper: React.ReactNode[] = [];

    const nesteUttaksperiode = Periodene(uttaksplan)
        .finnAllePåfølgendePerioder(periode)
        .filter((p) => p.type === Periodetype.Uttak || p.type === Periodetype.Overføring)
        .shift();

    if (onLeggTilPeriode) {
        knapper.unshift(
            <LinkButton key="periode" onClick={() => onLeggTilPeriode(periode.tidsperiode)}>
                {getMessage(intl, 'uttaksplan.hull.leggTil.uttak')}
            </LinkButton>
        );
    }

    if (onLeggTilOpphold && periode.årsak !== PeriodeHullÅrsak.Fridag) {
        knapper.unshift(
            <LinkButton key="opphold" onClick={() => onLeggTilOpphold(periode.tidsperiode)}>
                {getMessage(intl, 'uttaksplan.hull.leggTil.opphold')}
            </LinkButton>
        );
    }

    if (onFjernPeriode && nesteUttaksperiode) {
        knapper.unshift(
            <LinkButton key="opphold" onClick={() => onFjernPeriode(periode)}>
                {getMessage(intl, 'uttaksplan.hull.fjern', {
                    nesteUttaksperiode: getPeriodeTittel(intl, nesteUttaksperiode, navnPåForeldre)
                })}
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
                    <Block margin="xs" visible={periode.årsak === PeriodeHullÅrsak.Fridag}>
                        <FormattedMessage
                            id="periodeliste.hull.fridag"
                            values={{
                                dager: getVarighetString(antallDager, intl),
                                tidsperiode: Tidsperioden(periode.tidsperiode).formaterStringKort(intl)
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
