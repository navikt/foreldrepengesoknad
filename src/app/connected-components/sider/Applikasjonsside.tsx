import * as React from 'react';
import { connect } from 'react-redux';
import { DispatchProps } from '../../redux/types';
import { setSpråk } from '../../redux/actions/common/commonActionCreators';
import { AppState } from '../../redux/reducers';
import { Språkkode } from '../../intl/types';
import Språkvelger from '../../components/spr\u00E5kvelger/Spr\u00E5kvelger';

export interface OwnProps {
    /** Om språkvelger skal vises eller ikke */
    visSpråkvelger?: boolean;
}

interface StateProps {
    språkkode: Språkkode;
}

type Props = OwnProps & StateProps & DispatchProps;

class Sidemal extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { visSpråkvelger, språkkode, children, dispatch } = this.props;
        return (
            <React.Fragment>
                {visSpråkvelger && (
                    <Språkvelger
                        kode={språkkode}
                        setSpråkkode={(kode: Språkkode) =>
                            dispatch(setSpråk(kode))
                        }
                    />
                )}
                <div className="content">{children}</div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    språkkode: state.common.språkkode
});

export default connect(mapStateToProps)(Sidemal);
