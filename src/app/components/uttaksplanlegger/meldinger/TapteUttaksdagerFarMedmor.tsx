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
    info: InformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor;
    onLeggTilOpphold: (tidsperiode: Tidsperiode) => void;
}

const TapteUttaksdagerFarMedmor: React.StatelessComponent<Props> = ({ info, onLeggTilOpphold }) => {
    const tidsperiodenOpphold = {
        fom: Uttaksdagen(info.sisteUttaksdagInnenforSeksUker).neste(),
        tom: Uttaksdagen(info.førsteRegistrerteUttaksdag).forrige()
    };
    return (
        <AlertStripe type="info" solid={true}>
            <Block margin="xxs">
                <FormattedMessage
                    id="uttaksplan.infoVedTapteUttaksdager"
                    values={{
                        dager: info.antallUttaksdagerTapt,
                        fom: formaterDatoUtenDag(tidsperiodenOpphold.fom),
                        tom: formaterDatoUtenDag(tidsperiodenOpphold.tom)
                    }}
                />
            </Block>
            <LinkButton onClick={() => onLeggTilOpphold(tidsperiodenOpphold)}>
                <FormattedMessage id="uttaksplan.infoVedTapteUttaksdager.leggTilUtsettelse" />
            </LinkButton>
        </AlertStripe>
    );
};
export default TapteUttaksdagerFarMedmor;
