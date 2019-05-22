import * as React from 'react';
import { onToggleItemProp } from '../../toggle-list/ToggleList';
import { injectIntl, InjectedIntlProps, FormattedMessage, InjectedIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import LinkButton from '../../link-button/LinkButton';
import { PeriodeHull, Periode, isAvslåttPeriode } from '../../../types/uttaksplan/periodetyper';
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
    periode: PeriodeHull;
    navnPåForeldre: NavnPåForeldre;
    nesteUttaksperiode?: Periode;
    onLeggTilPeriode?: (tidsperiode: Tidsperiode) => void;
    onLeggTilOpphold?: (tidsperiode: Tidsperiode) => void;
}

const getTittelOgBeskrivelseForHull = (
    periode: PeriodeHull,
    dager: number,
    navnPåForeldre: NavnPåForeldre,
    intl: InjectedIntl
): { tittel: string; beskrivelse: string } => {
    if (isAvslåttPeriode(periode)) {
        return {
            tittel: getMessage(intl, 'periodeliste.ikkeInvilgetPeriode.tittel', {
                type: getMessage(intl, `periodetype.${periode.avslåttPeriodeType}`)
            }),
            beskrivelse: getMessage(intl, 'periodeliste.ikkeInvilgetPeriode.beskrivelse', {
                varighet: getVarighetString(dager, intl),
                konto: getStønadskontoNavn(intl, periode.stønadskonto, navnPåForeldre)
            })
        };
    }
    return {
        tittel: getMessage(intl, 'periodeliste.hull.tittel'),
        beskrivelse: getMessage(intl, 'periodeliste.hull.beskrivelse', { dager })
    };
};

const PeriodelisteHullItem: React.StatelessComponent<Props & InjectedIntlProps> = ({
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

    if (onLeggTilOpphold) {
        knapper.unshift(
            <LinkButton key="opphold" onClick={() => onLeggTilOpphold(periode.tidsperiode)}>
                {getMessage(intl, 'uttaksplan.hull.leggTil.opphold')}
            </LinkButton>
        );
    }

    const { tittel, beskrivelse } = getTittelOgBeskrivelseForHull(periode, antallDager, navnPåForeldre, intl);

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
                    {isAvslåttPeriode(periode) ? (
                        <Block>
                            <FormattedMessage
                                id={`periodeliste.ikkeInvilgetPeriode.expanded.beskrivelse.${
                                    periode.avslåttPeriodeType
                                }`}
                            />
                        </Block>
                    ) : (
                        <>
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
                        </>
                    )}

                    <Knapperad align="left">{knapper}</Knapperad>
                </div>
            )}
        />
    );
};

export default injectIntl(PeriodelisteHullItem);
