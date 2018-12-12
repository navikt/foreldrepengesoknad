import * as React from 'react';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';
import AdvarselIkonÅpen from '../uttaksplan-ikon/ikoner/AdvarselIkonÅpen';
import { Normaltekst } from 'nav-frontend-typografi';
import { PeriodeHullÅrsak, PeriodeHull, Periode } from '../../types/uttaksplan/periodetyper';
import { Tidsperioden } from '../../util/uttaksplan/Tidsperioden';
import LinkButton from '../link-button/LinkButton';
import getMessage from 'common/util/i18nUtils';
import { Tidsperiode } from 'nav-datovelger';
import { getPeriodeTittel } from '../../util/uttaksplan';
import { NavnPåForeldre } from 'common/types';
import PeriodelisteInfoItem from './PeriodelisteInfoItem';

export interface Props {
    periode: PeriodeHull;
    nesteUttaksperiode?: Periode;
    navnPåForeldre: NavnPåForeldre;
    onLeggTilPeriode?: (tidsperiode: Tidsperiode) => void;
    onLeggTilOpphold?: (tidsperiode: Tidsperiode) => void;
    onFjernPeriode?: (periode: PeriodeHull) => void;
}

const PeriodelisteHull: React.StatelessComponent<Props & InjectedIntlProps> = ({
    periode,
    nesteUttaksperiode,
    navnPåForeldre,
    onLeggTilPeriode,
    onLeggTilOpphold,
    onFjernPeriode,
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

    return (
        <PeriodelisteInfoItem
            ariaLabel={getMessage(intl, 'periodeliste.hullMellomPerioder.aria-label')}
            infoText={
                <Normaltekst tag="span">
                    {periode.årsak === PeriodeHullÅrsak.Fridag ? (
                        <FormattedMessage
                            id="periodeliste.hullMellomPerioder.fridag"
                            values={{
                                dager: getVarighetString(antallDager, intl),
                                tidsperiode: Tidsperioden(periode.tidsperiode).formaterString(intl)
                            }}
                        />
                    ) : (
                        <FormattedMessage
                            id="periodeliste.hullMellomPerioder"
                            values={{ dager: getVarighetString(antallDager, intl) }}
                        />
                    )}
                </Normaltekst>
            }
            icon={<AdvarselIkonÅpen />}
            buttons={knapper}
        />
    );
};
export default injectIntl(PeriodelisteHull);
