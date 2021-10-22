import React from 'react';
import { Block } from '@navikt/fp-common';
import Planlegger from './components/planlegger/Planlegger';
import PlanleggerInfo from './components/planlegger-info/PlanleggerInfo';

const Uttaksplan = () => {
    return (
        <>
            <Block padBottom="l">
                <PlanleggerInfo />
            </Block>
            <Block padBottom="l">
                <Planlegger />
            </Block>
        </>
    );
};

export default Uttaksplan;
