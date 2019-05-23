import * as React from 'react';
import { onToggleItemProp } from '../../toggle-list/ToggleList';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { Periode, GruppertInfoPeriode } from '../../../types/uttaksplan/periodetyper';
import { Tidsperiode, NavnPåForeldre } from 'common/types';
import { Tidsperioden } from '../../../util/uttaksplan/Tidsperioden';
import PeriodelisteInfo from './PeriodelisteInfo';
import { getVarighetString } from 'common/util/intlUtils';
import { getPeriodeTittel, getPeriodeForelderNavn } from 'app/util/uttaksplan';
import InfoIkon from 'common/components/ikoner/InfoIkon';
import LayoutRow from 'common/components/layoutRow/LayoutRow';
import { getNavnGenitivEierform } from 'app/util/tekstUtils';

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
            ikon={<InfoIkon />}
            farge="transparent"
            renderContent={() => (
                <div>
                    <ol style={{ padding: 'none' }}>
                        {periode.perioder.map((p) => (
                            <li key={p.id}>
                                <LayoutRow
                                    left={getPeriodeTittel(intl, p, navnPåForeldre)}
                                    right={[Tidsperioden(p.tidsperiode).formaterStringKort(intl)]}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        />
    );
};

export default injectIntl(PeriodelisteGruppertInfoPart);
