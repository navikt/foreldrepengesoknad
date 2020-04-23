import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { formaterDatoUtenDag } from 'common/util/datoUtils';
import { InformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor } from '../../../regler/uttaksplan/getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor';
import { Uttaksdagen } from '../../../util/uttaksplan/Uttaksdagen';
import Knapperad from 'common/components/knapperad/Knapperad';
import Block from 'common/components/block/Block';
import { Tidsperiode } from 'common/types';
import LinkButton from 'app/components/elementer/linkButton/LinkButton';

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
                <FormattedMessage
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
