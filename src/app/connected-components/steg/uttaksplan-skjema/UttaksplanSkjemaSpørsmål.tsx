import { DispatchProps } from 'common/redux/types';
import * as React from 'react';
import { AppState } from '../../../redux/reducers';
import Block from 'common/components/block/Block';
import { connect } from 'react-redux';
import søknadActionCreators from '../../../redux/actions/søknad/søknadActionCreators';
import { UttaksplanSkjemadata } from './uttaksplanSkjemadata';

export interface UttaksplanSkjemaspørsmålProps {
    visible?: boolean;
    harUnderspørsmål?: boolean;
}
interface OwnProps extends UttaksplanSkjemaspørsmålProps {
    render: (data: Partial<UttaksplanSkjemadata>, onChange: (skjemadata: Partial<UttaksplanSkjemadata>) => void) => {};
}

interface StateProps {
    skjemadata: Partial<UttaksplanSkjemadata>;
}

type Props = StateProps & OwnProps & DispatchProps;

const UttaksplanSkjemaSpørsmål: React.StatelessComponent<Props> = ({
    visible = true,
    harUnderspørsmål,
    skjemadata,
    render,
    dispatch
}) => (
    <Block visible={visible} hasChildBlocks={harUnderspørsmål}>
        {visible && render(skjemadata, (data) => dispatch(søknadActionCreators.uttaksplanUpdateSkjemdata(data)))}
    </Block>
);

const mapStateToProps = (state: AppState): StateProps => ({
    skjemadata: state.søknad.ekstrainfo.uttaksplanSkjema
});

export default connect(mapStateToProps)(UttaksplanSkjemaSpørsmål);
