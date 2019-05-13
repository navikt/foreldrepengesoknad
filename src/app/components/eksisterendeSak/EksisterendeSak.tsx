import * as React from 'react';
import { EksisterendeSak } from '../../types/EksisterendeSak';
import InfoBlock from 'common/components/info-block/InfoBlock';
import { getVarighetString } from 'common/util/intlUtils';
import { TilgjengeligStønadskonto } from '../../types/uttaksplan/periodetyper';
import { getAntallUker } from '../../util/uttaksplan/stønadskontoer';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import InnholdMedIllustrasjon from 'common/components/innhold-med-illustrasjon/InnholdMedIllustrasjon';
import SituasjonSirkel from '../endringsillustrasjoner/situasjonSirkel/SituasjonSirkel';
import UkerSirkel from '../endringsillustrasjoner/ukerSirkel/UkerSirkel';
import { Situasjon } from '../foreldrepar/foreldreparTypes';
import Sak from 'app/types/søknad/Sak';
import { Søkerinfo } from 'app/types/søkerinfo';
import { Kjønn } from 'app/types/common';

interface OwnProps {
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    eksisterendeSak: EksisterendeSak;
    sak: Sak;
    søkerinfo: Søkerinfo;
}

type Props = InjectedIntlProps & OwnProps;

const getSituasjon = (søkerinfo: Søkerinfo, eksisterendeSak: EksisterendeSak, sak: Sak): Situasjon | undefined => {
    const kjønnSøker: Kjønn = søkerinfo.person.kjønn;
    const kjønnAnnenForelder: Kjønn | undefined = sak.annenPart
        ? sak.annenPart.kjønn || Kjønn.MANN /** todo */
        : undefined;
    if (kjønnSøker && kjønnAnnenForelder) {
        if (kjønnSøker !== kjønnAnnenForelder) {
            return Situasjon.farOgMor;
        }
        return kjønnSøker === Kjønn.MANN ? Situasjon.farOgFar : Situasjon.morOgMedmor;
    } else {
        const {
            grunnlag: { farMedmorErAleneOmOmsorg, morErAleneOmOmsorg }
        } = eksisterendeSak;

        if (kjønnSøker === Kjønn.KVINNE) {
            return morErAleneOmOmsorg ? Situasjon.aleneomsorg : Situasjon.bareMor;
        } else {
            return farMedmorErAleneOmOmsorg ? Situasjon.aleneomsorg : Situasjon.bareFar;
        }
    }
};

const EksisterendeSak: React.StatelessComponent<Props> = ({
    eksisterendeSak,
    tilgjengeligeStønadskontoer,
    sak,
    søkerinfo,
    intl
}) => {
    const uker = getAntallUker(tilgjengeligeStønadskontoer);
    const situasjon = getSituasjon(søkerinfo, eksisterendeSak, sak);
    if (situasjon === undefined) {
        return null;
    }
    return (
        <InfoBlock padding="m">
            <InnholdMedIllustrasjon
                tittel="Opprinnelig sak"
                illustrasjoner={[
                    <SituasjonSirkel key="situasjon" situasjon={situasjon} />,
                    <UkerSirkel key="uker" uker={uker} />
                ]}>
                <strong>{getVarighetString(uker * 5, intl)}</strong> med{' '}
                <strong>{eksisterendeSak.grunnlag.dekningsgrad} prosent utbetaling</strong>.
            </InnholdMedIllustrasjon>
        </InfoBlock>
    );
};

export default injectIntl(EksisterendeSak);
