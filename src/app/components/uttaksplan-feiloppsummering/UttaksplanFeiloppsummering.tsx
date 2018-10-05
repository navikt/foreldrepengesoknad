import * as React from 'react';
import { ValidertPeriode, UttaksplanValideringState } from '../../redux/reducers/uttaksplanValideringReducer';
import Feiloppsummering from 'common/lib/validation/errors/Feiloppsummering';
import { SummaryError } from 'common/lib/validation/types';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

interface OwnProps {
    uttaksplanValidering: UttaksplanValideringState;
    erSynlig?: boolean;
}

type UttaksplanValideringFeil = SummaryError<ValidertPeriode>;

export type Props = OwnProps & InjectedIntlProps;

class UttaksplanFeiloppsummering extends React.Component<Props, {}> {
    render() {
        const { uttaksplanValidering, erSynlig, intl } = this.props;
        if (erSynlig === false) {
            return null;
        }
        const { periodevalidering } = uttaksplanValidering;
        const validertePerioder: ValidertPeriode[] = Object.keys(periodevalidering)
            .map((key) => periodevalidering[key])
            .filter((p) => p.valideringsfeil.length > 0 || p.overlappendePerioder.length > 0);

        const feil: UttaksplanValideringFeil[] = validertePerioder.map((validertPeriode): UttaksplanValideringFeil => {
            const feilKey: string =
                validertPeriode.valideringsfeil.length > 0
                    ? getMessage(intl, validertPeriode.valideringsfeil[0].feilKey)
                    : getMessage(intl, 'uttaksplan.validering.periodeoverlapp');
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
    }
}
export default injectIntl(UttaksplanFeiloppsummering);
