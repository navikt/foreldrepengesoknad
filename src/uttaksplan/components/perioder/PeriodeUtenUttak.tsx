import { ActionLink, Block, intlUtils } from '@navikt/fp-common';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Periode, Periodetype } from 'uttaksplan/types/Periode';

interface Props {
    periode: Periode;
    handleUpdatePeriode: (periode: Periode) => void;
}

const PeriodeUtenUttak: FunctionComponent<Props> = ({ periode, handleUpdatePeriode }) => {
    const intl = useIntl();

    const onLeggTilNyPeriode = () => {
        const { id, tidsperiode } = periode;

        handleUpdatePeriode({ id, type: Periodetype.Uttak, tidsperiode } as Periode);
    };

    return (
        <div>
            <Block padBottom="l">
                <Normaltekst>
                    <FormattedMessage id="uttaksplan.periodeUtenUttak.info.del1" />
                </Normaltekst>
            </Block>
            <Block padBottom="l">
                <Normaltekst>
                    <FormattedMessage id="uttaksplan.periodeUtenUttak.info.del2" />
                </Normaltekst>
            </Block>
            <ActionLink onClick={onLeggTilNyPeriode}>{intlUtils(intl, 'uttaksplan.leggInnNyPeriode')}</ActionLink>
        </div>
    );
};

export default PeriodeUtenUttak;
