import * as React from 'react';
import { TilgjengeligStønadskonto } from '../../../types/uttaksplan/periodetyper';
import { getAntallUker } from '../../../util/uttaksplan/stønadskontoer';
import { injectIntl, InjectedIntlProps, InjectedIntl, FormattedHTMLMessage } from 'react-intl';
import SituasjonSirkel from './illustrasjoner/situasjonSirkel/SituasjonSirkel';
import UkerSirkel from './illustrasjoner/ukerSirkel/UkerSirkel';
import { Kjønn } from '../../../types/common';
import { Søknadsinfo, NavnISøknaden } from 'app/selectors/types';
import getMessage from 'common/util/i18nUtils';
import { Forelder } from 'common/types';
import InfoBlock from 'common/components/infoBlock/InfoBlock';
import InnholdMedIllustrasjon from 'app/components/elementer/innholdMedIllustrasjon/InnholdMedIllustrasjon';
import { getVarighetString } from 'common/util/intlUtils';
import { ForeldreparSituasjon } from 'shared/types';

interface OwnProps {
    søknadsinfo: Søknadsinfo;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
}

type Props = InjectedIntlProps & OwnProps;

const getSituasjon = (info: Søknadsinfo): ForeldreparSituasjon | undefined => {
    const { søker, annenForelder, mor, farMedmor } = info;
    const kjønnSøker = søker.kjønn;
    const kjønnAnnenForelder = annenForelder.kjønn;
    if (info.søknaden.erDeltUttak) {
        if (kjønnSøker !== kjønnAnnenForelder) {
            return ForeldreparSituasjon.farOgMor;
        }
        return kjønnSøker === Kjønn.MANN ? ForeldreparSituasjon.farOgFar : ForeldreparSituasjon.morOgMedmor;
    } else {
        if (kjønnSøker === Kjønn.KVINNE) {
            return mor.erAleneOmOmsorg ? ForeldreparSituasjon.aleneomsorg : ForeldreparSituasjon.bareMor;
        } else {
            return farMedmor.erAleneOmOmsorg ? ForeldreparSituasjon.aleneomsorg : ForeldreparSituasjon.bareFar;
        }
    }
};

const getHvem = (intl: InjectedIntl, erDeltUttak: boolean, navn?: NavnISøknaden): string => {
    if (erDeltUttak && navn && navn.annenForelder) {
        return getMessage(intl, 'eksisterendeSak.tekst.benevning.deltOmsorg', { navn: navn.annenForelder.fornavn });
    }
    return getMessage(intl, 'eksisterendeSak.tekst.benevning.aleneomsorg');
};

const InfoEksisterendeSak: React.StatelessComponent<Props> = ({ søknadsinfo, tilgjengeligeStønadskontoer, intl }) => {
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
            ? Forelder.mor
            : Forelder.farMedmor;

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

export default injectIntl(InfoEksisterendeSak);
