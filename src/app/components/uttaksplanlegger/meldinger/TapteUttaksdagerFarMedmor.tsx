import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';
import { formaterDatoUtenDag } from 'common/util/datoUtils';
import { InformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor } from '../../../regler/uttaksplan/getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor';
import LinkButton from '../../link-button/LinkButton';
import { Tidsperiode } from 'nav-datovelger';
import { Uttaksdagen } from '../../../util/uttaksplan/Uttaksdagen';
import Block from 'common/components/block/Block';

export interface Props {
    familiehendelsesdato: Date;
    info: InformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor;
    onLeggTilOpphold: (tidsperiode: Tidsperiode) => void;
}

const TapteUttaksdagerFarMedmor: React.StatelessComponent<Props> = ({
    familiehendelsesdato,
    info,
    onLeggTilOpphold
}) => (
    <AlertStripe type="info" solid={true}>
        <Block margin="xxs">
            <FormattedMessage
                id="uttaksplan.infoVedTapteUttaksdager"
                values={{
                    dager: info.antallUttaksdagerTapt,
                    seksUkerDato: formaterDatoUtenDag(info.sisteUttaksdagInnenSeksUker),
                    førsteRegistrerteDato: formaterDatoUtenDag(info.førsteUttaksdag)
                }}
            />
        </Block>
        <LinkButton
            onClick={() =>
                onLeggTilOpphold({ fom: familiehendelsesdato, tom: Uttaksdagen(info.førsteUttaksdag).forrige() })
            }>
            <FormattedMessage id="uttaksplan.infoVedTapteUttaksdager.leggTilUtsettelse" />
        </LinkButton>
    </AlertStripe>
);

export default TapteUttaksdagerFarMedmor;
