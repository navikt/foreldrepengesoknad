import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { UttaksplanAppState } from 'uttaksplan/redux/types';
import { periodene } from 'uttaksplan/utils/dataUtils';
import { StønadskontoUttak } from 'uttaksplan/types';

export interface StateProps {
    fordeling: StønadskontoUttak;
}

export type Props = StateProps & InjectedIntlProps;

class FordelingUttaksplan extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { fordeling } = this.props;
        return (
            <div>
                {Array.from(fordeling.entries()).map((f) => (
                    <div key={f[0]}>
                        {f[0]}: {f[1]}
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state: UttaksplanAppState): StateProps => {
    const { perioder } = state.uttaksplan.periode;
    const fordeling = periodene(perioder).getAntallUttaksdagerPerKonto();
    return {
        fordeling
    };
};

export default connect(mapStateToProps)(injectIntl(FordelingUttaksplan));
