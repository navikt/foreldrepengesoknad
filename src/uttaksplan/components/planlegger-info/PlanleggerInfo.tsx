import { InfoBlock, intlUtils } from '@navikt/fp-common';
import SituasjonSirkel from 'app/components/info-eksisterende-sak/illustrasjoner/situasjon-sirkel/SituasjonSirkel';
import UkerSirkel from 'app/components/info-eksisterende-sak/illustrasjoner/uker-sirkel/UkerSirkel';
import InnholdMedIllustrasjon from 'app/components/innhold-med-illustrasjon/InnholdMedIllustrasjon';
import { Forelder } from 'app/types/Forelder';
import { ForeldreparSituasjon } from 'app/types/ForeldreparSituasjonTypes';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import './planleggerInfo.less';

interface Props {
    foreldreSituasjon: ForeldreparSituasjon;
    forelderVedAleneomsorg: Forelder | undefined;
    erDeltUttak: boolean;
}

const PlanleggerInfo: FunctionComponent<Props> = ({ foreldreSituasjon, forelderVedAleneomsorg, erDeltUttak }) => {
    const intl = useIntl();
    const tittelKey = erDeltUttak ? 'eksisterendeSak.tittel.deltUttak' : 'eksisterendeSak.tittel.aleneomsorg';

    return (
        <InfoBlock>
            <InnholdMedIllustrasjon
                tittel={intlUtils(intl, tittelKey)}
                illustrasjoner={[
                    <SituasjonSirkel
                        key="situasjon"
                        situasjon={foreldreSituasjon}
                        valgtForelder={forelderVedAleneomsorg}
                    />,
                    <UkerSirkel key="uker" uker={49} />,
                ]}
            >
                test
            </InnholdMedIllustrasjon>
        </InfoBlock>
    );
};

export default PlanleggerInfo;
