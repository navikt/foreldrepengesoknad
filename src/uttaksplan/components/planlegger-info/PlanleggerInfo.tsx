import { InfoBlock, intlUtils } from '@navikt/fp-common';
import SituasjonSirkel from 'app/components/info-eksisterende-sak/illustrasjoner/situasjon-sirkel/SituasjonSirkel';
import UkerSirkel from 'app/components/info-eksisterende-sak/illustrasjoner/uker-sirkel/UkerSirkel';
import InnholdMedIllustrasjon from 'app/components/innhold-med-illustrasjon/InnholdMedIllustrasjon';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { Forelder } from 'app/types/Forelder';
import { getForeldreparSituasjon } from 'app/utils/foreldreparSituasjonUtils';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import useSøknad from 'app/utils/hooks/useSøknad';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { getFarMedmorErAleneOmOmsorg, getKjønnFromFnr, getMorErAleneOmOmsorg } from 'app/utils/personUtils';
import React from 'react';
import { useIntl } from 'react-intl';

import './planleggerInfo.less';

const PlanleggerInfo = () => {
    const intl = useIntl();
    const søkerinfo = useSøkerinfo();
    const søknad = useSøknad();

    const { person } = søkerinfo;
    const { annenForelder, søker } = søknad;

    const annenForelderKjønn = getKjønnFromFnr(annenForelder);
    const erDeltUttak = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.harRettPåForeldrepenger : false;
    const erFarEllerMedmor = isFarEllerMedmor(søknad.søkersituasjon.rolle);
    const erAleneOmOmsorg = søker.erAleneOmOmsorg;
    const morErAleneOmOmsorg = getMorErAleneOmOmsorg(!erFarEllerMedmor, erAleneOmOmsorg, annenForelder);
    const farMedmorErAleneOmOmsorg = getFarMedmorErAleneOmOmsorg(erFarEllerMedmor, erAleneOmOmsorg, annenForelder);
    const forelderVedAleneomsorg = erDeltUttak ? undefined : erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;

    const situasjon = getForeldreparSituasjon(
        person.kjønn,
        annenForelderKjønn,
        erDeltUttak,
        morErAleneOmOmsorg,
        farMedmorErAleneOmOmsorg
    );

    return (
        <InfoBlock>
            <InnholdMedIllustrasjon
                tittel={intlUtils(intl, `eksisterendeSak.tittel.deltUttak`)}
                illustrasjoner={[
                    <SituasjonSirkel key="situasjon" situasjon={situasjon} valgtForelder={forelderVedAleneomsorg} />,
                    <UkerSirkel key="uker" uker={49} />,
                ]}
            >
                test
            </InnholdMedIllustrasjon>
        </InfoBlock>
    );
};

export default PlanleggerInfo;
