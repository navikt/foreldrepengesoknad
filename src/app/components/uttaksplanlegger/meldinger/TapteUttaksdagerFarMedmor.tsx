import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { formaterDatoUtenDag } from 'common/util/datoUtils';
import { InformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor } from '../../../regler/uttaksplan/getInformasjonOmTaptUttakVedUttakEtterSeksUkerFarMedmor';
import LinkButton from '../../link-button/LinkButton';
import { Tidsperiode } from 'nav-datovelger';
import { Uttaksdagen } from '../../../util/uttaksplan/Uttaksdagen';
import PeriodelisteInfoItem from '../../periodeliste/PeriodelisteInfoItem';
import AdvarselIkonÅpen from '../../uttaksplan-ikon/ikoner/AdvarselIkon\u00C5pen';

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
        <PeriodelisteInfoItem
            ariaLabel={
                <FormattedMessage id="uttaksplan.infoVedTapteUttaksdager.ariaLabelTittelForTapteForeldrepenger" />
            }
            infoText={
                <FormattedMessage
                    id="uttaksplan.infoVedTapteUttaksdager"
                    values={{
                        dager: info.antallUttaksdagerTapt,
                        fom: formaterDatoUtenDag(tidsperiodenOpphold.fom),
                        tom: formaterDatoUtenDag(tidsperiodenOpphold.tom)
                    }}
                />
            }
            icon={<AdvarselIkonÅpen />}
            buttons={[
                <LinkButton key="leggTilUtsettelse" onClick={() => onLeggTilOpphold(tidsperiodenOpphold)}>
                    <FormattedMessage id="uttaksplan.infoVedTapteUttaksdager.leggTilUtsettelse" />
                </LinkButton>
            ]}
        />
    );
};
export default TapteUttaksdagerFarMedmor;
