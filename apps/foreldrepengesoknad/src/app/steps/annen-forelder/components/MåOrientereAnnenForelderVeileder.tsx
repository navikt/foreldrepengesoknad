import { FormattedMessage } from 'react-intl';
import { Alert } from '@navikt/ds-react';

import './annenForelderVeileder.less';

interface Props {
    visible: boolean;
    annenForelderNavn: string;
}

const MåOrientereAnnenForelderVeileder: React.FunctionComponent<Props> = ({ visible, annenForelderNavn }) => {
    if (!visible) {
        return null;
    }

    return (
        <div className="annenForelderVeileder">
            <Alert variant="warning">
                <FormattedMessage
                    id="annenForelder.erAnnenForelderInformert.veileder"
                    values={{ navn: annenForelderNavn }}
                />
            </Alert>
        </div>
    );
};

export default MåOrientereAnnenForelderVeileder;
