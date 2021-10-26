import React, { FunctionComponent } from 'react';
import { Block } from '@navikt/fp-common';
import Planlegger from './components/planlegger/Planlegger';
import PlanleggerInfo from './components/planlegger-info/PlanleggerInfo';
import { ForeldreparSituasjon } from 'app/types/ForeldreparSituasjonTypes';
import { Forelder } from 'app/types/Forelder';

interface Props {
    situasjon: ForeldreparSituasjon;
    forelderVedAleneomsorg: Forelder | undefined;
    erDeltUttak: boolean;
}

const Uttaksplan: FunctionComponent<Props> = ({ situasjon, forelderVedAleneomsorg, erDeltUttak }) => {
    return (
        <>
            <Block padBottom="l">
                <PlanleggerInfo
                    situasjon={situasjon}
                    forelderVedAleneomsorg={forelderVedAleneomsorg}
                    erDeltUttak={erDeltUttak}
                />
            </Block>
            <Block padBottom="l">
                <Planlegger />
            </Block>
        </>
    );
};

export default Uttaksplan;
