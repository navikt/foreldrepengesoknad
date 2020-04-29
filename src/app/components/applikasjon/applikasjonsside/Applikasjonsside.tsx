import * as React from 'react';
import * as classnames from 'classnames';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage, IntlShape } from 'react-intl';

import { DispatchProps } from 'common/redux/types';
import { setSpråk } from '../../../redux/actions/common/commonActionCreators';
import { AppState } from '../../../redux/reducers';
import { Språkkode } from 'common/intl/types';
import BEMHelper from 'common/util/bem';
import getMessage from 'common/util/i18nUtils';
import Søknadstittel from 'app/components/applikasjon/søknadstittel/Søknadstittel';
import UtløptSesjonModal from 'app/components/dialoger/utløptSesjonModal/UtløptSesjonModal';
import LanguageToggle from 'common/components/languageToggle/LanguageToggle';
import AlertStripe from 'nav-frontend-alertstriper';
import { isFeatureEnabled, Feature } from 'app/Feature';

export interface OwnProps {
    visSøknadstittel?: boolean;
    visSpråkvelger?: boolean;
    visAlertstripe?: boolean;
    margin?: boolean;
    intl: IntlShape;
}

interface StateProps {
    språkkode: Språkkode;
    erEndringssøknad: boolean;
    sessionHasExpired: boolean;
    innloggetSomAnnenBruker: boolean;
}

type Props = OwnProps & StateProps & DispatchProps;
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
            innloggetSomAnnenBruker,
            margin = true,
            visAlertstripe = true,
            dispatch
        } = this.props;

        const BEM = BEMHelper('content');
        const cls = classnames(BEM.block, {
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

                {isFeatureEnabled(Feature.visAlertstripe) &&
                    visAlertstripe && (
                        <div
                            className={classnames(BEM.element('alertstripe'), {
                                [BEM.modifier('purple-background')]: visSpråkvelger
                            })}
                        >
                            <AlertStripe type="info">
                                <FormattedMessage id="feature.alertstripe.tekst" />
                            </AlertStripe>
                        </div>
                    )}

                <div className={cls}>{children}</div>
                <UtløptSesjonModal erÅpen={sessionHasExpired} />
                {innloggetSomAnnenBruker && <UtløptSesjonModal erÅpen={true} />}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    språkkode: state.common.språkkode,
    erEndringssøknad: state.søknad.erEndringssøknad,
    sessionHasExpired: state.api.sessionHasExpired,
    innloggetSomAnnenBruker: state.api.innloggetSomAnnenForelder
});

export default connect(mapStateToProps)(injectIntl(Sidemal));
