import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { Forelder, ForeldreparSituasjon } from '@navikt/fp-common';

import InfoBlock from '../../common/info-block/InfoBlock';
import InnholdMedIllustrasjon from '../../common/innhold-med-illustrasjon/InnholdMedIllustrasjon';
import SituasjonSirkel from '../../common/situasjon-sirkel/SituasjonSirkel';
import UkerSirkel from '../../common/uker-sirkel/UkerSirkel';
import './planleggerInfo.less';

interface Props {
    foreldreSituasjon: ForeldreparSituasjon;
    forelderVedAleneomsorg: Forelder | undefined;
    erDeltUttak: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const PlanleggerInfo: FunctionComponent<Props> = ({ foreldreSituasjon, forelderVedAleneomsorg, erDeltUttak }) => {
    const intl = useIntl();

    return (
        <InfoBlock>
            <InnholdMedIllustrasjon
                tittel={
                    erDeltUttak
                        ? intl.formatMessage({ id: 'eksisterendeSak.tittel.deltUttak' })
                        : intl.formatMessage({ id: 'eksisterendeSak.tittel.aleneomsorg' })
                }
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
// eslint-disable-next-line import/no-default-export
export default PlanleggerInfo;
