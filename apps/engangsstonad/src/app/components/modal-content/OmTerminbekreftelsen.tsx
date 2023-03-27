import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Heading, BodyShort } from '@navikt/ds-react';

import './modalContent.less';

const OmTerminbekreftelsen: React.FunctionComponent = () => (
    <div className="modalContent">
        <Heading size="small" className="modalContent__header">
            <FormattedMessage id="terminbekreftelsen.sectionheading" />
        </Heading>
        <BodyShort className="modalContent__paragraph">
            <FormattedMessage id="terminbekreftelsen.text.terminbekreftelsen" />
        </BodyShort>
    </div>
);

export default OmTerminbekreftelsen;
