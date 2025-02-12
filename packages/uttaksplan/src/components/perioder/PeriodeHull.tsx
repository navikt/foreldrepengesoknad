import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { Periode, Periodetype } from '@navikt/fp-common';
import { Tidsperioden } from '@navikt/fp-utils';

import ActionLink from '../../common/action-link/ActionLink';
import Block from '../../common/block/Block';
import { førsteOktober2021ReglerGjelder } from '../../utils/dateUtils';
import { getUttaksdagerSomErFridager } from '../../utils/getUttaksdagerSomErFridager';
import planBemUtils from '../../utils/planBemUtils';
import './periodeHull.less';

interface Props {
    periode: Periode;
    navnAnnenForelder: string;
    erDeltUttak: boolean;
    familiehendelsesdato: Date;
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg: boolean;
    handleUpdatePeriode: (periode: Periode, familiehendelsedato: Date) => void;
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
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
    const bem = planBemUtils('periodeHull');

    const antallDager = Tidsperioden(periode.tidsperiode).getAntallUttaksdager();
    const antallHelligdager = getUttaksdagerSomErFridager(periode.tidsperiode).length;
    const antallUttaksdager = Tidsperioden(periode.tidsperiode).getAntallUttaksdager();
    const kunHelligdager = antallHelligdager === antallUttaksdager;
    const kunUttaksdager = antallHelligdager === 0;

    const onLeggInnNyPeriode = () => {
        const { id, tidsperiode } = periode;

        handleUpdatePeriode({ id, type: Periodetype.Uttak, tidsperiode } as Periode, familiehendelsesdato);
    };

    const leggInnNyUtsettelse = () => {
        const { id, tidsperiode } = periode;

        handleUpdatePeriode({ id, type: Periodetype.Utsettelse, tidsperiode } as Periode, familiehendelsesdato);
    };

    const nyeRegler = førsteOktober2021ReglerGjelder(familiehendelsesdato);

    return (
        <div className={bem.block}>
            <Block padBottom="l" visible={kunHelligdager}>
                <BodyShort>
                    <FormattedMessage id="uttaksplan.hull.helligdager" />
                </BodyShort>
            </Block>
            <Block padBottom="l" visible={kunUttaksdager || (kunUttaksdager === false && kunHelligdager === false)}>
                <BodyShort>
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
                </BodyShort>
            </Block>
            <div className={bem.element('lenker')}>
                <ActionLink onClick={onLeggInnNyPeriode}>
                    {intl.formatMessage({ id: 'uttaksplan.leggInnNyPeriode' })}
                </ActionLink>
                <ActionLink onClick={leggInnNyUtsettelse}>
                    {intl.formatMessage({ id: 'uttaksplan.leggInnNyUtsettelse' })}
                </ActionLink>
            </div>
        </div>
    );
};
// eslint-disable-next-line import/no-default-export
export default PeriodeHull;
