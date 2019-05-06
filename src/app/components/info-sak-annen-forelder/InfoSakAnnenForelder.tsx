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
import { formaterDato } from 'common/util/datoUtils';
import { Søknadsinfo } from '../../selectors/types';
import { getNavnGenitivEierform } from '../../util/tekstUtils';
import AntallUkerKalenderIkon from '../antallUkerKalenderIkon/AntallUkerKalenderIkon';
import InnholdMedIllustrasjon from 'common/components/innhold-med-illustrasjon/InnholdMedIllustrasjon';

interface OwnProps {
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    sak: SakForEndring;
    søknadsinfo: Søknadsinfo;
}

type Props = InjectedIntlProps & OwnProps;

const bem = BEMHelper('infoSakAnnenForelder');

const InfoSakAnnenForelder: React.StatelessComponent<Props> = ({
    sak,
    tilgjengeligeStønadskontoer,
    søknadsinfo,
    intl
}) => {
    const uker = getAntallUker(tilgjengeligeStønadskontoer);
    const sistePeriode = sak.perioder[sak.perioder.length - 1];
    return (
        <InfoBlock padding="m">
            <div className={bem.className}>
                <Block margin="s">
                    <InnholdMedIllustrasjon
                        tittel="Deres foreldrepengeperiode"
                        illustrasjoner={[<AntallUkerKalenderIkon key="1" uker={uker} />]}>
                        Dere skal ha <strong>{getVarighetString(uker * 5, intl)}</strong> med{' '}
                        <strong>{sak.grunnlag.dekningsgrad} prosent utbetaling</strong>.
                    </InnholdMedIllustrasjon>
                </Block>
                <Block margin="xs">
                    <Undertittel>
                        {getNavnGenitivEierform(søknadsinfo.navn.annenForelder.fornavn, intl.locale)} plan
                    </Undertittel>
                </Block>
                Hennes siste dag er <strong>{formaterDato(sistePeriode.tidsperiode.tom)}</strong>.
            </div>
        </InfoBlock>
    );
};

export default injectIntl(InfoSakAnnenForelder);
