import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';

import './modalContent.less';

const OmTerminbekreftelsen: React.FunctionComponent = () => (
    <div className="modalContent">
        <Undertittel className="modalContent__header">
            <FormattedMessage id="terminbekreftelsen.sectionheading" />
        </Undertittel>
        <Normaltekst className="modalContent__paragraph">
            <FormattedMessage id="terminbekreftelsen.text.terminbekreftelsen" />
        </Normaltekst>
    </div>
);

export default OmTerminbekreftelsen;
