import * as React from 'react';
import { ValidertPeriode, UttaksplanValideringState } from '../../redux/reducers/uttaksplanValideringReducer';
import Feiloppsummering from 'common/lib/validation/errors/Feiloppsummering';
import { SummaryError } from 'common/lib/validation/types';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { Periode } from '../../types/uttaksplan/periodetyper';
import { Periodene } from '../../util/uttaksplan/Periodene';
import { getPeriodelisteItemId } from '../periodeliste/Periodeliste';

interface OwnProps {
    uttaksplan: Periode[];
    uttaksplanValidering: UttaksplanValideringState;
    erSynlig?: boolean;
    onErrorClick: (periodeId: string) => void;
}

type UttaksplanValideringFeil = SummaryError<ValidertPeriode>;

export type Props = OwnProps & InjectedIntlProps;

class UttaksplanFeiloppsummering extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleOnErrorClick = this.handleOnErrorClick.bind(this);
    }
    handleOnErrorClick(error: UttaksplanValideringFeil) {
        const { onErrorClick } = this.props;
        if (error.payload && error.payload.periodeId) {
            onErrorClick(error.payload.periodeId);
        }
    }
    render() {
        const { uttaksplanValidering, erSynlig, uttaksplan, intl } = this.props;
        if (erSynlig === false) {
            return null;
        }
        const { periodevalidering } = uttaksplanValidering;
        const validertePerioder: ValidertPeriode[] = Object.keys(periodevalidering)
            .map((key) => periodevalidering[key])
            .filter((p) => p.valideringsfeil.length > 0 || p.overlappendePerioder.length > 0);

        const feil: UttaksplanValideringFeil[] = validertePerioder.map((validertPeriode): UttaksplanValideringFeil => {
            const periode = Periodene(uttaksplan).getPeriode(validertPeriode.periodeId);
            if (periode === undefined) {
                return {
                    name: validertPeriode.periodeId,
                    payload: validertPeriode,
                    text: getMessage(intl, 'uttaksplan.validering.feilUkjentPeriode')
                };
            }
            const feilmelding: string =
                validertPeriode.valideringsfeil.length > 0
                    ? getMessage(intl, `uttaksplan.validering.feil.${validertPeriode.valideringsfeil[0].feilKey}`)
                    : getMessage(intl, 'uttaksplan.validering.feil.periodeoverlapp');
            return {
                name: getPeriodelisteItemId(validertPeriode.periodeId),
                payload: validertPeriode,
                text: feilmelding
            };
        });

        return (
            <Feiloppsummering
                show={erSynlig === true && uttaksplanValidering.erGyldig === false}
                title={getMessage(intl, 'uttaksplan.validering.feiloppsummering.tittel')}
                errors={feil}
            />
        );
    }
}
export default injectIntl(UttaksplanFeiloppsummering);
