import * as React from 'react';
import * as classnames from 'classnames';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { DispatchProps } from 'common/redux/types';
import { setSpråk } from '../../redux/actions/common/commonActionCreators';
import { AppState } from '../../redux/reducers';
import { Språkkode } from 'common/intl/types';
import BEMHelper from 'common/util/bem';
import getMessage from 'common/util/i18nUtils';
import Søknadstittel from 'common/components/søknadstittel/Søknadstittel';
import UtløptSesjonModal from 'app/components/utløpt-sesjon-modal/UtløptSesjonModal';
import LanguageToggle from 'common/components/language-toggle/LanguageToggle';

export interface OwnProps {
    visSøknadstittel?: boolean;
    visSpråkvelger?: boolean;
    margin?: boolean;
}

interface StateProps {
    språkkode: Språkkode;
    erEndringssøknad: boolean;
    sessionHasExpired: boolean;
}

type Props = OwnProps & StateProps & DispatchProps & InjectedIntlProps;
class Sidemal extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const {
            visSpråkvelger,
            visSøknadstittel,
            språkkode,
            children,
            erEndringssøknad,
            sessionHasExpired,
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
                    <LanguageToggle
                        language={språkkode}
                        toggleLanguage={(languageCode: Språkkode) => dispatch(setSpråk(languageCode))}
                    />
                )}
                {visSøknadstittel && (
                    <Søknadstittel>
                        {getMessage(this.props.intl, `søknad.pageheading.${erEndringssøknad ? 'endring' : 'ny'}`)}
                    </Søknadstittel>
                )}
                <div className={cls}>{children}</div>
                <UtløptSesjonModal erÅpen={sessionHasExpired} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    språkkode: state.common.språkkode,
    erEndringssøknad: state.søknad.erEndringssøknad,
    sessionHasExpired: state.api.sessionHasExpired
});

export default connect(mapStateToProps)(injectIntl(Sidemal));
