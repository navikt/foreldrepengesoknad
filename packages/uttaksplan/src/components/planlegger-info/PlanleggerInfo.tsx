import {
    Forelder,
    ForeldreparSituasjon,
    InfoBlock,
    InnholdMedIllustrasjon,
    SituasjonSirkel,
    UkerSirkel,
    intlUtils,
} from '@navikt/fp-common';
import { FunctionComponent } from 'react';
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
