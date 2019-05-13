import * as React from 'react';
import { SakForEndring } from '../../types/søknad/SakForEndring';
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
    sakForEndring: SakForEndring;
    sak: Sak;
    søkerinfo: Søkerinfo;
}

type Props = InjectedIntlProps & OwnProps;

const getSituasjon = (søkerinfo: Søkerinfo, sakForEndring: SakForEndring, sak: Sak): Situasjon | undefined => {
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
        } = sakForEndring;

        if (kjønnSøker === Kjønn.KVINNE) {
            return morErAleneOmOmsorg ? Situasjon.aleneomsorg : Situasjon.bareMor;
        } else {
            return farMedmorErAleneOmOmsorg ? Situasjon.aleneomsorg : Situasjon.bareFar;
        }
    }
};

const InformasjonEgenSak: React.StatelessComponent<Props> = ({
    sakForEndring,
    tilgjengeligeStønadskontoer,
    sak,
    søkerinfo,
    intl
}) => {
    const uker = getAntallUker(tilgjengeligeStønadskontoer);
    const situasjon = getSituasjon(søkerinfo, sakForEndring, sak);
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
                <strong>{sakForEndring.grunnlag.dekningsgrad} prosent utbetaling</strong>.
            </InnholdMedIllustrasjon>
        </InfoBlock>
    );
};

export default injectIntl(InformasjonEgenSak);
