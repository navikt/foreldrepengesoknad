import * as React from 'react';
import { connect } from 'react-redux';
import { StegID } from '../../../util/routing/stegConfig';
import { default as Steg, StegProps } from '../../../components/steg/Steg';
import { AppState } from '../../../redux/reducers';
import Søknad from '../../../types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';
import Person from '../../../types/Person';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { HistoryProps } from '../../../types/common';
import { Periode } from '../../../types/uttaksplan/periodetyper';
import isAvailable from '../util/isAvailable';
import { lagMockUttaksplan } from '../../../util/uttaksplan/forslag/mockUttaksplan';
import søknadActions from '../../../redux/actions/s\u00F8knad/s\u00F8knadActionCreators';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import Uttaksplanlegger from '../../../components/uttaksplanlegger/Uttaksplanlegger';

interface StateProps {
    stegProps: StegProps;
    søknad: Søknad;
    person: Person;
    perioder: Periode[];
}

type Props = StateProps & DispatchProps & SøkerinfoProps & HistoryProps;

class UttaksplanSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.søknad.temp.uttaksplanSkjema.forslagLaget) {
            const mockPerioder = lagMockUttaksplan(this.props.søknad);
            this.props.dispatch(søknadActions.uttaksplanSetPerioder(mockPerioder));
        }
    }

    render() {
        const { søknad, søkerinfo, dispatch } = this.props;
        const navn = {
            navnForelder1: søkerinfo.person.fornavn,
            navnForelder2: søknad.annenForelder ? søknad.annenForelder.navn : undefined
        };

        return (
            <Steg {...this.props.stegProps}>
                <Veilederinfo maxWidth="30">Her velger du hvordan du ønsker å legge opp ditt uttak.</Veilederinfo>
                <Uttaksplanlegger
                    uttaksplan={søknad.uttaksplan}
                    onAdd={(periode) => dispatch(søknadActions.uttaksplanAddPeriode(periode))}
                    {...navn}
                />
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: HistoryProps & SøkerinfoProps): StateProps => {
    const { søknad } = state;
    const { søkerinfo, history } = props;

    const stegProps: StegProps = {
        id: StegID.UTTAKSPLAN,
        renderFortsettKnapp: true,
        history,
        isAvailable: isAvailable(StegID.UTTAKSPLAN, søknad, søkerinfo)
    };

    return {
        søknad,
        person: props.søkerinfo.person,
        stegProps,
        perioder: søknad.uttaksplan
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(UttaksplanSteg);
