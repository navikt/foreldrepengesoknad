import * as React from 'react';
import { EksisterendeSak } from '../../types/EksisterendeSak';
import InfoBlock from 'common/components/info-block/InfoBlock';
import { getVarighetString } from 'common/util/intlUtils';
import { TilgjengeligStønadskonto } from '../../types/uttaksplan/periodetyper';
import { getAntallUker } from '../../util/uttaksplan/stønadskontoer';
import { injectIntl, InjectedIntlProps, InjectedIntl, FormattedHTMLMessage } from 'react-intl';
import InnholdMedIllustrasjon from 'common/components/innhold-med-illustrasjon/InnholdMedIllustrasjon';
import SituasjonSirkel from '../endringsillustrasjoner/situasjonSirkel/SituasjonSirkel';
import UkerSirkel from '../endringsillustrasjoner/ukerSirkel/UkerSirkel';
import { Situasjon } from '../foreldrepar/foreldreparTypes';
import { Kjønn } from 'app/types/common';
import { Søknadsinfo, NavnISøknaden } from 'app/selectors/types';
import getMessage from 'common/util/i18nUtils';
import { Forelder } from 'common/types';

interface OwnProps {
    søknadsinfo: Søknadsinfo;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
}

type Props = InjectedIntlProps & OwnProps;

const getSituasjon = (info: Søknadsinfo): Situasjon | undefined => {
    const { søker, annenForelder, mor, farMedmor } = info;
    const kjønnSøker = søker.kjønn;
    const kjønnAnnenForelder = annenForelder.kjønn;
    if (info.søknaden.erDeltUttak) {
        if (kjønnSøker !== kjønnAnnenForelder) {
            return Situasjon.farOgMor;
        }
        return kjønnSøker === Kjønn.MANN ? Situasjon.farOgFar : Situasjon.morOgMedmor;
    } else {
        if (kjønnSøker === Kjønn.KVINNE) {
            return mor.erAleneOmOmsorg ? Situasjon.aleneomsorg : Situasjon.bareMor;
        } else {
            return farMedmor.erAleneOmOmsorg ? Situasjon.aleneomsorg : Situasjon.bareFar;
        }
    }
};

const getHvem = (intl: InjectedIntl, erDeltUttak: boolean, navn?: NavnISøknaden): string => {
    if (erDeltUttak && navn && navn.annenForelder) {
        return getMessage(intl, 'eksisterendeSak.tekst.benevning.deltOmsorg', { navn: navn.annenForelder.fornavn });
    }
    return getMessage(intl, 'eksisterendeSak.tekst.benevning.aleneomsorg');
};

const EksisterendeSak: React.StatelessComponent<Props> = ({ søknadsinfo, tilgjengeligeStønadskontoer, intl }) => {
    const uker = getAntallUker(tilgjengeligeStønadskontoer);
    const situasjon = getSituasjon(søknadsinfo);
    if (situasjon === undefined) {
        return null;
    }
    const {
        søknaden: { erDeltUttak, dekningsgrad },
        navn
    } = søknadsinfo;

    const forelderVedAleneomsorg = erDeltUttak
        ? undefined
        : søknadsinfo.søker.erMor
            ? Forelder.MOR
            : Forelder.FARMEDMOR;

    return (
        <InfoBlock padding="m">
            <InnholdMedIllustrasjon
                tittel={getMessage(intl, `eksisterendeSak.tittel.${erDeltUttak ? 'deltUttak' : 'aleneomsorg'}`)}
                illustrasjoner={[
                    <SituasjonSirkel key="situasjon" situasjon={situasjon} valgtForelder={forelderVedAleneomsorg} />,
                    <UkerSirkel key="uker" uker={uker} />
                ]}>
                <FormattedHTMLMessage
                    id="eksisterendeSak.tekst.html"
                    values={{
                        uker: getVarighetString(uker * 5, intl),
                        dekningsgrad,
                        navn: getHvem(intl, erDeltUttak, navn)
                    }}
                />
            </InnholdMedIllustrasjon>
        </InfoBlock>
    );
};

export default injectIntl(EksisterendeSak);
