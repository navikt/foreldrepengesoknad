import { ActionLink, bemUtils, Block, intlUtils } from '@navikt/fp-common';
import { Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { førsteOktober2021ReglerGjelder } from 'app/utils/dateUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Periode, Periodetype } from 'uttaksplan/types/Periode';

import './periodeHull.less';

interface Props {
    periode: Periode;
    navnAnnenForelder: string;
    erDeltUttak: boolean;
    familiehendelsesdato: Date;
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg: boolean;
    handleUpdatePeriode: (periode: Periode) => void;
}

const PeriodeHull: FunctionComponent<Props> = ({
    periode,
    navnAnnenForelder,
    erDeltUttak,
    familiehendelsesdato,
    erFarEllerMedmor,
    erAleneOmOmsorg,
    handleUpdatePeriode,
}) => {
    const intl = useIntl();
    const bem = bemUtils('periodeHull');

    const antallDager = Tidsperioden(periode.tidsperiode).getAntallUttaksdager();
    const antallHelligdager = Tidsperioden(periode.tidsperiode).getAntallFridager();
    const antallUttaksdager = Tidsperioden(periode.tidsperiode).getAntallUttaksdager();
    const kunHelligdager = antallHelligdager === antallUttaksdager;
    const kunUttaksdager = antallHelligdager === 0;

    const onLeggInnNyPeriode = () => {
        const { id, tidsperiode } = periode;

        handleUpdatePeriode({ id, type: Periodetype.Uttak, tidsperiode } as Periode);
    };

    const leggInnNyUtsettelse = () => {
        const { id, tidsperiode } = periode;

        handleUpdatePeriode({ id, type: Periodetype.Utsettelse, tidsperiode } as Periode);
    };

    const nyeRegler = førsteOktober2021ReglerGjelder(familiehendelsesdato);

    return (
        <div className={bem.block}>
            <Block padBottom="l" visible={kunHelligdager}>
                <Normaltekst>
                    <FormattedMessage id="uttaksplan.hull.helligdager" />
                </Normaltekst>
            </Block>
            <Block padBottom="l" visible={kunUttaksdager || (kunUttaksdager === false && kunHelligdager === false)}>
                <Normaltekst>
                    {erDeltUttak ? (
                        <FormattedMessage
                            id="uttaksplan.hull.uttaksdager.deltUttak"
                            values={{
                                navn: navnAnnenForelder,
                                dager: antallDager,
                            }}
                        />
                    ) : (
                        <FormattedMessage
                            id={
                                nyeRegler && erFarEllerMedmor && !erAleneOmOmsorg
                                    ? 'uttaksplan.hull.uttaksdager.ikkeDeltUttak.nyeRegler'
                                    : 'uttaksplan.hull.uttaksdager.ikkeDeltUttak'
                            }
                            values={{
                                dager: antallDager,
                            }}
                        />
                    )}
                </Normaltekst>
            </Block>
            <div className={bem.element('lenker')}>
                <ActionLink onClick={onLeggInnNyPeriode}>{intlUtils(intl, 'uttaksplan.leggInnNyPeriode')}</ActionLink>
                <ActionLink onClick={leggInnNyUtsettelse}>
                    {intlUtils(intl, 'uttaksplan.leggInnNyUtsettelse')}
                </ActionLink>
            </div>
        </div>
    );
};

export default PeriodeHull;
