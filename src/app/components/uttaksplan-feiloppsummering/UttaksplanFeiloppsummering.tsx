import * as React from 'react';
import { ValidertPeriode, UttaksplanValideringState } from '../../redux/reducers/uttaksplanValideringReducer';
import Feiloppsummering from 'common/lib/validation/errors/Feiloppsummering';
import { SummaryError } from 'common/lib/validation/types';

export interface Props {
    uttaksplanValidering: UttaksplanValideringState;
    erSynlig?: boolean;
}

type UttaksplanValideringFeil = SummaryError<ValidertPeriode>;

const UttaksplanFeiloppsummering: React.StatelessComponent<Props> = ({ uttaksplanValidering, erSynlig }) => {
    const { periodevalidering } = uttaksplanValidering;
    const validertePerioder: ValidertPeriode[] = Object.keys(periodevalidering)
        .map((key) => periodevalidering[key])
        .filter((p) => p.valideringsfeil.length > 0 || p.overlappendePerioder.length > 0);

    const feil: UttaksplanValideringFeil[] = validertePerioder.map((validertPeriode): UttaksplanValideringFeil => {
        const feilKey: string =
            validertPeriode.valideringsfeil.length > 0
                ? validertPeriode.valideringsfeil[0].feilKey
                : 'overlappendePerioder';
        return {
            name: validertPeriode.periodeId,
            payload: validertPeriode,
            text: feilKey
        };
    });

    return (
        <Feiloppsummering
            show={erSynlig === true && uttaksplanValidering.erGyldig === false}
            title="Det er en feil her ja"
            onErrorClick={(error: UttaksplanValideringFeil) => console.log(error)}
            errors={feil}
        />
    );
};

export default UttaksplanFeiloppsummering;
