import { FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { CommonActionTypes } from 'app/redux/types/CommonAction';
import { Språkkode } from 'common/types';
import { State } from 'app/redux/store';
import Action from 'app/redux/types/Action';
import Søknadstittel from 'app/components/søknadstittel/Søknadstittel';
import LanguageToggle from 'common/components/language-toggle/LanguageToggle';
import { useDocumentTitle } from '@navikt/fp-common';

interface OwnProps {
    visSpråkvelger?: boolean;
    visTittel?: boolean;
    children: ReactElement | ReactElement[];
}

interface StateProps {
    språkkode: Språkkode;
}

interface DispatchProps {
    setSpråk: (språkkode: Språkkode) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const Applikasjonsside: FunctionComponent<Props> = ({ visSpråkvelger, visTittel, språkkode, setSpråk, children }) => {
    useDocumentTitle('Svangerskapspengesøknad');

    return (
        <>
            {visSpråkvelger && (
                <LanguageToggle
                    language={språkkode}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore Fiks
                    toggleLanguage={(languageCode: Språkkode) => setSpråk(languageCode)}
                />
            )}
            {visTittel && (
                <Søknadstittel>
                    <FormattedMessage id="app.banner" />
                </Søknadstittel>
            )}
            {children}
        </>
    );
};

const mapStateToProps = (state: State): StateProps => ({
    språkkode: state.common.språkkode,
});

const mapDispatchToProps = (dispatch: (action: Action) => void): DispatchProps => ({
    setSpråk: (språkkode: Språkkode) => dispatch({ type: CommonActionTypes.SET_SPRÅK, payload: { språkkode } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Applikasjonsside);
