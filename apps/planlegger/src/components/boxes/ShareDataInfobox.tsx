import { BookmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import Infoboks from './Infobox';

const ShareDataInfobox: React.FunctionComponent = () => (
    <Infoboks
        header={<FormattedMessage id="OmPlanleggerenSteg.TaVarePåHeader" />}
        isGray
        icon={<BookmarkIcon aria-hidden height={24} width={24} />}
    >
        <BodyShort>
            <FormattedMessage id="OmPlanleggerenSteg.TaVarePå" />
        </BodyShort>
    </Infoboks>
);

export default ShareDataInfobox;
