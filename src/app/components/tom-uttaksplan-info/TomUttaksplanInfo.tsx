import * as React from 'react';
import ChildSVG from 'common/components/child-svg/ChildSVG';
import PersonMedSnakkeboble from 'common/components/person-med-snakkeboble/PersonMedSnakkeboble';
import { FormattedMessage } from 'react-intl';

export interface Props {}

const TomUttaksplanInfo: React.StatelessComponent<Props> = (props) => (
    <PersonMedSnakkeboble
        dialog={{
            text: <FormattedMessage id="uttaksplan.tomPlan" />
        }}
        stil="kompakt"
        fyltBakgrunn={false}
        personRenderer={() => <ChildSVG />}
    />
);

export default TomUttaksplanInfo;
