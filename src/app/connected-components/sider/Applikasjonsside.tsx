import * as React from 'react';
import * as classnames from 'classnames';
import { connect } from 'react-redux';
import { DispatchProps } from 'common/redux/types';
import { setSpråk } from '../../redux/actions/common/commonActionCreators';
import { AppState } from '../../redux/reducers';
import { Språkkode } from 'common/intl/types';
import Språkvelger from 'common/components/språkvelger/Språkvelger';

export interface OwnProps {
    /** Om språkvelger skal vises eller ikke */
    visSpråkvelger?: boolean;
    withoutMargin?: boolean;
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
            withoutMargin,
            dispatch
        } = this.props;
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
                <div
                    className={classnames('content', {
                        content__withoutMargin: withoutMargin
                    })}>
                    {children}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    språkkode: state.common.språkkode
});

export default connect(mapStateToProps)(Sidemal);
