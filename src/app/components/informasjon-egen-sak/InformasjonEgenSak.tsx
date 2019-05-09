import * as React from 'react';
import { SakForEndring } from '../../types/søknad/SakForEndring';
import InfoBlock from 'common/components/info-block/InfoBlock';
import { getVarighetString } from 'common/util/intlUtils';
import { TilgjengeligStønadskonto } from '../../types/uttaksplan/periodetyper';
import { getAntallUker } from '../../util/uttaksplan/stønadskontoer';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import AntallUkerKalenderIkon from '../antallUkerKalenderIkon/AntallUkerKalenderIkon';
import InnholdMedIllustrasjon from 'common/components/innhold-med-illustrasjon/InnholdMedIllustrasjon';

interface OwnProps {
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    sak: SakForEndring;
}

type Props = InjectedIntlProps & OwnProps;

const InformasjonEgenSak: React.StatelessComponent<Props> = ({ sak, tilgjengeligeStønadskontoer, intl }) => {
    const uker = getAntallUker(tilgjengeligeStønadskontoer);
    return (
        <InfoBlock padding="m">
            <InnholdMedIllustrasjon
                tittel="Opprinnelig sak"
                illustrasjoner={[<AntallUkerKalenderIkon key="1" uker={uker} />]}>
                <strong>{getVarighetString(uker * 5, intl)}</strong> med{' '}
                <strong>{sak.grunnlag.dekningsgrad} prosent utbetaling</strong>.
            </InnholdMedIllustrasjon>
        </InfoBlock>
    );
};

export default injectIntl(InformasjonEgenSak);
