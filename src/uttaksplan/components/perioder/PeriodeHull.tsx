import { ActionLink, bemUtils, Block, intlUtils } from '@navikt/fp-common';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Periode, Periodetype } from 'uttaksplan/types/Periode';

import './periodeHull.less';

interface Props {
    periode: Periode;
    handleUpdatePeriode: (periode: Periode) => void;
}

const PeriodeHull: FunctionComponent<Props> = ({ periode, handleUpdatePeriode }) => {
    const intl = useIntl();
    const bem = bemUtils('periodeHull');

    const onLeggInnNyPeriode = () => {
        const { id, tidsperiode } = periode;

        handleUpdatePeriode({ id, type: Periodetype.Uttak, tidsperiode } as Periode);
    };

    const leggInnNyUtsettelse = () => {
        const { id, tidsperiode } = periode;

        handleUpdatePeriode({ id, type: Periodetype.Utsettelse, tidsperiode } as Periode);
    };

    return (
        <div className={bem.block}>
            <Block padBottom="l">
                <Normaltekst>Her har vi en eller annen forklarende tekst</Normaltekst>
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
