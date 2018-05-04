import * as React from 'react';
import { connect } from 'react-redux';
import { DispatchProps } from '../../redux/types';
import { setSpråk } from '../../redux/actions/common/commonActionCreators';
import { AppState } from '../../redux/reducers';
import { Språkkode } from '../../intl/types';
import Språkvelger from '../../components/spr\u00E5kvelger/Spr\u00E5kvelger';
import DocumentTitle from 'react-document-title';

export interface OwnProps {
    /** Tittel som settes som vindustittel */
    dokumenttittel?: string;
    /** Om språlvelger skal vises eller ikke */
    visSpråkvelger?: boolean;
    /** Id som settes på container */
    id?: string;
}

interface StateProps {
    språkkode: Språkkode;
}

type Props = OwnProps & StateProps & DispatchProps;

class Applikasjonsside extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { id, visSpråkvelger, dokumenttittel, språkkode, children, dispatch } = this.props;
        return (
            <div className="side" id={id}>
                {dokumenttittel && <DocumentTitle title={dokumenttittel} />}
                {visSpråkvelger && (
                    <div className="side__språkvelger">
                        <Språkvelger
                            kode={språkkode}
                            setSpråkkode={(kode: Språkkode) => dispatch(setSpråk(kode))}
                        />
                    </div>
                )}
                <div className="side__innhold">{children}</div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    språkkode: state.common.språkkode
});

export default connect(mapStateToProps)(Applikasjonsside);
