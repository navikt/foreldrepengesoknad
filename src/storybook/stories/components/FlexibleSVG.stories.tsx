import React from 'react';
import KvinneIkon from 'app/assets/KvinneIkon';
import FlexibleSVG from '../../../app/components/flexible-svg/FlexibleSVG';

export default {
    title: 'components/FlexibleSVG',
    component: FlexibleSVG,
};

export const Default = () => <FlexibleSVG className="forelderIkon" iconRef={KvinneIkon} width={500} height={500} />;
