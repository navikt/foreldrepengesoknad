import * as React from 'react';
import { Oppholdsperiode } from '../../../types/uttaksplan/periodetyper';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';

interface AnnenForeldersUttakFormProps {
    onChange: (opphold: Partial<Oppholdsperiode>) => void;
}

interface StateProps {
    antallBarn: number;
}

type Props = AnnenForeldersUttakFormProps & StateProps;

class AnnenForeldersUttakForm extends React.Component<Props> {
    render() {
        return null;
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    antallBarn: state.søknad.barn.antallBarn
});
export default connect(mapStateToProps)(AnnenForeldersUttakForm);
