import { Heading } from '@navikt/ds-react';
import React from 'react';
import bemHelper from '../../utils/bemUtils';
import Banner from '../banner/Banner';

import './stepBanner.less';

interface StepBannerProps {
    text: string;
    level?: '1' | '2' | '3';
}

const bem = bemHelper('stepBanner');
const StepBanner: React.FunctionComponent<StepBannerProps> = ({ text, level = '2' }) => (
    <Banner size="small" className={bem.block}>
        <Heading size="small" level={level}>
            {text}
        </Heading>
    </Banner>
);

export default StepBanner;
