import * as React from 'react';
import { SakForEndring } from '../../types/søknad/SakForEndring';
import InfoBlock from 'common/components/info-block/InfoBlock';
import BEMHelper from 'common/util/bem';
import { Undertittel } from 'nav-frontend-typografi';
import { getVarighetString } from 'common/util/intlUtils';
import { TilgjengeligStønadskonto } from '../../types/uttaksplan/periodetyper';
import { getAntallUker } from '../../util/uttaksplan/stønadskontoer';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Block from 'common/components/block/Block';
import { Søknadsinfo } from '../../selectors/types';
import AntallUkerKalenderIkon from '../antallUkerKalenderIkon/AntallUkerKalenderIkon';
import InnholdMedIllustrasjon from 'common/components/innhold-med-illustrasjon/InnholdMedIllustrasjon';
import UttaksplanEgenSak from './UttaksplanEgenSak';

interface OwnProps {
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    sak: SakForEndring;
    søknadsinfo: Søknadsinfo;
}

type Props = InjectedIntlProps & OwnProps;

const bem = BEMHelper('infoSakAnnenForelder');

const InformasjonEgenSak: React.StatelessComponent<Props> = ({
    sak,
    tilgjengeligeStønadskontoer,
    søknadsinfo,
    intl
}) => {
    const uker = getAntallUker(tilgjengeligeStønadskontoer);
    return (
        <InfoBlock padding="m">
            <div className={bem.className}>
                <Block margin="s">
                    <InnholdMedIllustrasjon
                        tittel="Opprinnelig sak"
                        illustrasjoner={[<AntallUkerKalenderIkon key="1" uker={uker} />]}>
                        <strong>{getVarighetString(uker * 5, intl)}</strong> med{' '}
                        <strong>{sak.grunnlag.dekningsgrad} prosent utbetaling</strong>.
                    </InnholdMedIllustrasjon>
                </Block>
                {sak.uttaksplan &&
                    sak.uttaksplan.length > 0 && (
                        <Block margin="xs">
                            <Undertittel>Planen</Undertittel>
                            <UttaksplanEgenSak uttaksplan={sak.uttaksplan} søknadsinfo={søknadsinfo} />
                        </Block>
                    )}
            </div>
        </InfoBlock>
    );
};

export default injectIntl(InformasjonEgenSak);
