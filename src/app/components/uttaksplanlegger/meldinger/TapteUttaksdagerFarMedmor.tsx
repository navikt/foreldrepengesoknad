import * as React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { formaterDatoUtenDag } from 'common/util/datoUtils';
import { InformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor } from '../../../regler/uttaksplan/getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor';
import LinkButton from '../../link-button/LinkButton';
import { Tidsperiode } from 'nav-datovelger';
import { Uttaksdagen } from '../../../util/uttaksplan/Uttaksdagen';
import Knapperad from 'common/components/knapperad/Knapperad';
import Block from 'common/components/block/Block';

interface Props {
    info: InformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor;
    onLeggTilOpphold: (tidsperiode: Tidsperiode) => void;
}

const TapteUttaksdagerFarMedmor: React.StatelessComponent<Props> = ({ info, onLeggTilOpphold }) => {
    const tidsperiodenOpphold = {
        fom: Uttaksdagen(info.sisteUttaksdagInnenforSeksUker).neste(),
        tom: Uttaksdagen(info.førsteRegistrerteUttaksdag).forrige()
    };
    return (
        <div>
            <Block margin="xs">
                <FormattedHTMLMessage
                    id="uttaksplan.infoVedTapteUttaksdager"
                    values={{
                        dager: info.antallUttaksdagerTapt,
                        fom: formaterDatoUtenDag(tidsperiodenOpphold.fom),
                        tom: formaterDatoUtenDag(tidsperiodenOpphold.tom)
                    }}
                />
            </Block>
            <Knapperad align="left">
                <LinkButton key="leggTilUtsettelse" onClick={() => onLeggTilOpphold(tidsperiodenOpphold)}>
                    <FormattedMessage id="uttaksplan.infoVedTapteUttaksdager.leggTilUtsettelse" />
                </LinkButton>
            </Knapperad>
        </div>
    );
};
export default TapteUttaksdagerFarMedmor;
