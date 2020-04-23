import * as React from 'react';
import { onToggleItemProp } from '../../../../elementer/toggleList/ToggleList';
import { injectIntl, FormattedMessage, IntlShape } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { AvslåttPeriode } from '../../../../../types/uttaksplan/periodetyper';
import { Tidsperiode, NavnPåForeldre } from 'common/types';
import { Tidsperioden } from '../../../../../util/uttaksplan/Tidsperioden';
import Knapperad from 'common/components/knapperad/Knapperad';
import PeriodelisteInfo from './PeriodelisteInfo';
import Block from 'common/components/block/Block';
import { getVarighetString } from 'common/util/intlUtils';
import { getStønadskontoNavn } from 'app/util/uttaksplan';
import LinkButton from 'app/components/elementer/linkButton/LinkButton';
import UttaksplanAdvarselIkon from 'app/components/ikoner/uttaksplanIkon/ikoner/AdvarselIkon';

export interface Props {
    itemId: string;
    isExpanded: boolean;
    onToggle: onToggleItemProp;
    periode: AvslåttPeriode;
    navnPåForeldre: NavnPåForeldre;
    onReplaceHullWithPeriode?: (tidsperiode: Tidsperiode) => void;
    onReplaceHullWithOpphold?: (tidsperiode: Tidsperiode) => void;
    intl: IntlShape;
}

const PeriodelisteAvslåttPeriode: React.StatelessComponent<Props> = ({
    itemId,
    isExpanded,
    onToggle,
    periode,
    onReplaceHullWithPeriode,
    onReplaceHullWithOpphold,
    navnPåForeldre,
    intl,
}) => {
    const antallDager = Tidsperioden(periode.tidsperiode).getAntallUttaksdager();
    const knapper: React.ReactNode[] = [];

    if (onReplaceHullWithPeriode) {
        knapper.unshift(
            <LinkButton key="periode" onClick={() => onReplaceHullWithPeriode(periode.tidsperiode)}>
                {getMessage(intl, 'uttaksplan.hull.leggTil.uttak')}
            </LinkButton>
        );
    }

    if (onReplaceHullWithOpphold) {
        knapper.unshift(
            <LinkButton key="opphold" onClick={() => onReplaceHullWithOpphold(periode.tidsperiode)}>
                {getMessage(intl, 'uttaksplan.hull.leggTil.opphold')}
            </LinkButton>
        );
    }

    const tittel = getMessage(intl, 'periodeliste.ikkeInnvilgetPeriode.tittel', {
        type: getMessage(intl, `periodetype.${periode.avslåttPeriodeType}`),
    });

    const beskrivelse = getMessage(intl, 'periodeliste.ikkeInnvilgetPeriode.beskrivelse', {
        varighet: getVarighetString(antallDager, intl),
        konto: getStønadskontoNavn(intl, periode.stønadskonto, navnPåForeldre),
    });

    return (
        <PeriodelisteInfo
            id={itemId}
            tittel={tittel}
            isExpanded={isExpanded}
            onToggle={onToggle}
            beskrivelse={beskrivelse}
            ikon={<UttaksplanAdvarselIkon />}
            annenForelderSamtidigUttakPeriode={undefined}
            renderContent={() => (
                <div>
                    <Block>
                        <FormattedMessage
                            id={`periodeliste.ikkeInnvilgetPeriode.expanded.beskrivelse.${periode.avslåttPeriodeType}`}
                        />
                    </Block>
                    <Knapperad align="left">{knapper}</Knapperad>
                </div>
            )}
        />
    );
};

export default injectIntl(PeriodelisteAvslåttPeriode);
