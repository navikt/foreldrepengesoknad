import * as React from 'react';
import * as classnames from 'classnames';
import { connect } from 'react-redux';
import { DispatchProps } from 'common/redux/types';
import { setSpråk } from '../../redux/actions/common/commonActionCreators';
import { AppState } from '../../redux/reducers';
import { Språkkode } from 'common/intl/types';
import Språkvelger from 'common/components/språkvelger/Språkvelger';
import BEMHelper from 'common/util/bem';

export interface OwnProps {
    /** Om språkvelger skal vises eller ikke */
    visSpråkvelger?: boolean;
    margin?: boolean;
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
        const {
            visSpråkvelger,
            språkkode,
            children,
            margin = true,
            dispatch
        } = this.props;

        const BEM = BEMHelper('content');
        const cls = classnames(BEM.className, {
            [`${BEM.modifier('withoutMargin')}`]: margin === false
        });

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
                <div className={cls}>{children}</div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    språkkode: state.common.språkkode
});

export default connect(mapStateToProps)(Sidemal);
