import * as React from 'react';
import VeilederinfoContainer from 'uttaksplan/connectedComponents/VeilederinfoContainer';
import { Infotekster } from 'uttaksplan/redux/reducers/viewReducer';
import { FormattedMessage } from 'react-intl';

const DekningsgradInfo: React.StatelessComponent<{}> = (props) => (
    <VeilederinfoContainer id={Infotekster.sats} type="info" visVeileder={false} stil="kunTekst">
        <FormattedMessage id="uttaksplan.skjema.veiledning.sats" />
    </VeilederinfoContainer>
);

export default DekningsgradInfo;
