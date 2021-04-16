import * as React from 'react';
import ChildSVG from 'app/components/uttaksplanlegger/components/childSvg/ChildSVG';
import PersonMedSnakkeboble from 'common/components/personMedSnakkeboble/PersonMedSnakkeboble';
import { FormattedMessage } from 'react-intl';

const TomUttaksplanInfo: React.FunctionComponent = () => (
    <PersonMedSnakkeboble
        dialog={{
            text: <FormattedMessage id="uttaksplan.tomPlan" />,
        }}
        stil="kompakt"
        fyltBakgrunn={false}
        personRenderer={() => <ChildSVG />}
    />
);

export default TomUttaksplanInfo;
