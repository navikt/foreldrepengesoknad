import * as React from 'react';
import { onToggleItemProp } from '../../../../elementer/toggleList/ToggleList';
import { injectIntl, FormattedMessage, IntlShape } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { PeriodeUtenUttak } from '../../../../../types/uttaksplan/periodetyper';
import { Tidsperiode } from 'common/types';
import { Tidsperioden } from '../../../../../util/uttaksplan/Tidsperioden';
import Knapperad from 'common/components/knapperad/Knapperad';
import PeriodelisteInfo from './PeriodelisteInfo';
import Block from 'common/components/block/Block';
import LinkButton from 'app/components/elementer/linkButton/LinkButton';
import { UttaksplanColor } from 'app/types/uttaksplan/colors';

export interface Props {
    itemId: string;
    isExpanded: boolean;
    onToggle: onToggleItemProp;
    periode: PeriodeUtenUttak;
    onReplaceHullWithPeriode?: (tidsperiode: Tidsperiode) => void;
    intl: IntlShape;
}

const getTittelOgBeskrivelseForHull = (dager: number, intl: IntlShape): { tittel: string; beskrivelse: string } => {
    return {
        tittel: getMessage(intl, 'periodeliste.periodeUtenUttak.tittel'),
        beskrivelse: getMessage(intl, 'periodeliste.periodeUtenUttak.beskrivelse', { dager }),
    };
};

const PeriodelistePeriodeUtenUttak: React.FunctionComponent<Props> = ({
    itemId,
    isExpanded,
    onToggle,
    periode,
    onReplaceHullWithPeriode,
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

    const { tittel, beskrivelse } = getTittelOgBeskrivelseForHull(antallDager, intl);

    return (
        <PeriodelisteInfo
            id={itemId}
            tittel={tittel}
            isExpanded={isExpanded}
            onToggle={onToggle}
            beskrivelse={beskrivelse}
            ikon={null}
            annenForelderSamtidigUttakPeriode={undefined}
            tidsperiode={periode.tidsperiode}
            periodeFargestrek={UttaksplanColor.white}
            renderContent={() => (
                <div>
                    <Block margin="xs">
                        <FormattedMessage id="periodeliste.periodeUtenUttak.info.del1" />
                    </Block>

                    <Block margin="xs">
                        <FormattedMessage id="periodeliste.periodeUtenUttak.info.del2" />
                    </Block>

                    <Knapperad align="left">{knapper}</Knapperad>
                </div>
            )}
        />
    );
};

export default injectIntl(PeriodelistePeriodeUtenUttak);
