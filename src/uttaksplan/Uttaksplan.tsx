import React, { FunctionComponent } from 'react';
import { Block } from '@navikt/fp-common';
import Planlegger from './components/planlegger/Planlegger';
import PlanleggerInfo from './components/planlegger-info/PlanleggerInfo';
import { ForeldreparSituasjon } from 'app/types/ForeldreparSituasjonTypes';
import { Forelder } from 'app/types/Forelder';
import { Periode } from './types/Periode';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';

interface Props {
    situasjon: ForeldreparSituasjon;
    forelderVedAleneomsorg: Forelder | undefined;
    erDeltUttak: boolean;
    uttaksplan: Periode[];
    familiehendelsesdato: string;
    handleOnPlanChange: (plan: Periode[]) => void;
    stønadskontoer: TilgjengeligStønadskonto[];
}

const Uttaksplan: FunctionComponent<Props> = ({
    situasjon,
    forelderVedAleneomsorg,
    erDeltUttak,
    uttaksplan,
    familiehendelsesdato,
    stønadskontoer,
    handleOnPlanChange,
}) => {
    const handleOnPeriodeChange = (periode: Periode) => {
        const updatedPlan = uttaksplan.map((p) => {
            if (p.id === periode.id) {
                return periode;
            }

            return p;
        });

        handleOnPlanChange(updatedPlan);
    };

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
                <Planlegger
                    uttaksplan={uttaksplan}
                    familiehendelsesdato={familiehendelsesdato}
                    handleOnPeriodeChange={handleOnPeriodeChange}
                    stønadskontoer={stønadskontoer}
                />
            </Block>
        </>
    );
};

export default Uttaksplan;
