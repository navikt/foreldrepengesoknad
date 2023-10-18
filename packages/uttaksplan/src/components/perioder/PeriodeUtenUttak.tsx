import { BodyShort } from '@navikt/ds-react';
import { ActionLink, Block, Periode, Periodetype, intlUtils } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
    periode: Periode;
    handleUpdatePeriode: (periode: Periode, familiehendelsesdato: Date) => void;
    familiehendelsesdato: Date;
}

const PeriodeUtenUttak: FunctionComponent<Props> = ({ periode, handleUpdatePeriode, familiehendelsesdato }) => {
    const intl = useIntl();

    const onLeggTilNyPeriode = () => {
        const { id, tidsperiode } = periode;

        handleUpdatePeriode({ id, type: Periodetype.Uttak, tidsperiode } as Periode, familiehendelsesdato);
    };

    return (
        <div>
            <Block padBottom="l">
                <BodyShort>
                    <FormattedMessage id="uttaksplan.periodeUtenUttak.info.del1" />
                </BodyShort>
            </Block>
            <Block padBottom="l">
                <BodyShort>
                    <FormattedMessage id="uttaksplan.periodeUtenUttak.info.del2" />
                </BodyShort>
            </Block>
            <ActionLink onClick={onLeggTilNyPeriode}>{intlUtils(intl, 'uttaksplan.leggInnNyPeriode')}</ActionLink>
        </div>
    );
};

export default PeriodeUtenUttak;
