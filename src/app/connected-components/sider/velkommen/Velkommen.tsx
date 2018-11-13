import * as React from 'react';
import DocumentTitle from 'react-document-title';
import { InjectedIntlProps, injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { connect } from 'react-redux';

import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';

import getMessage from 'common/util/i18nUtils';
import VeilederMedSnakkeboble from 'common/components/veileder-med-snakkeboble/VeilederMedSnakkeboble';

import Applikasjonsside from '../Applikasjonsside';
import DinePlikterModal from '../../../components/dine-plikter-modal/DinePlikterModal';
import DinePersonopplysningerModal from '../../../components/dine-personopplysninger-modal/DinePersonopplysningerModal';

import { AppState } from '../../../redux/reducers';
import { DispatchProps } from 'common/redux/types';
import Person from '../../../types/Person';
import { HistoryProps } from '../../../types/common';

import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';

import './velkommen.less';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import Knapperad from 'common/components/knapperad/Knapperad';
import { apiActionCreators } from '../../../redux/actions';
import FeatureBlock from '../../../components/featureBlock/FeatureBlock';
import { Feature } from '../../../Feature';
import ApplicationInfo from '../../../components/applicationInfo/ApplicationInfo';

interface StateProps {
    person?: Person;
    harGodkjentVilkår: boolean;
}

interface OwnProps {
    isDinePlikterModalOpen: boolean;
    isDinePersonopplysningerModalOpen: boolean;
}

type Props = StateProps & DispatchProps & InjectedIntlProps & HistoryProps & DispatchProps & SøkerinfoProps;

class Velkommen extends React.Component<Props, OwnProps> {
    componentWillMount() {
        this.setState({
            isDinePlikterModalOpen: false,
            isDinePersonopplysningerModalOpen: false
        });
    }

    getBekreftCheckboksPanelLabelHeader() {
        return (
            <FormattedMessage
                id="velkommen.samtykkeIntro"
                values={{
                    link: (
                        <a
                            className="lenke"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                this.setState({
                                    isDinePlikterModalOpen: true
                                });
                            }}>
                            <FormattedHTMLMessage id="velkommen.dinePlikter" />
                        </a>
                    )
                }}
            />
        );
    }

    startFørstegangssøknad() {
        const { history, dispatch } = this.props;
        dispatch(søknadActions.updateSøknad({ erEndringssøknad: false }));
        dispatch(apiActionCreators.storeAppState());
        history.push('soknad/inngang');
    }

    startEndringssøknad() {
        const { history, dispatch } = this.props;
        dispatch(søknadActions.updateSøknad({ erEndringssøknad: true }));
        dispatch(apiActionCreators.storeAppState());
        history.push('soknad/inngang');
    }

    render() {
        const { person, harGodkjentVilkår, dispatch, intl } = this.props;

        if (person === undefined) {
            return null;
        }

        return (
            <Applikasjonsside visSpråkvelger={false} margin={false}>
                <DocumentTitle title={getMessage(intl, 'dokument.tittel.velkommen')} />
                <VeilederMedSnakkeboble
                    dialog={{
                        title: getMessage(intl, 'velkommen.bobletittel', {
                            name: person.fornavn
                        }),
                        text: getMessage(intl, 'velkommen.bobletekst')
                    }}
                />
                <div className="velkommen">
                    <Innholdstittel className="velkommen__tittel blokk-m">
                        {getMessage(intl, 'velkommen.tittel')}
                    </Innholdstittel>
                    <BekreftCheckboksPanel
                        className="blokk-m"
                        checked={harGodkjentVilkår}
                        label={getMessage(intl, 'velkommen.samtykke')}
                        onChange={() => {
                            dispatch(
                                søknadActions.updateSøknad({
                                    harGodkjentVilkår: !harGodkjentVilkår
                                })
                            );
                        }}>
                        <Normaltekst>{this.getBekreftCheckboksPanelLabelHeader()}</Normaltekst>
                    </BekreftCheckboksPanel>
                    <Knapperad>
                        <Hovedknapp
                            className="velkommen__startSøknadKnapp blokk-m"
                            disabled={!harGodkjentVilkår}
                            onClick={() => this.startFørstegangssøknad()}>
                            {getMessage(intl, 'velkommen.startNySøknadKnapp')}
                        </Hovedknapp>

                        <FeatureBlock
                            feature={Feature.endringssøknad}
                            render={() => (
                                <Hovedknapp
                                    className="velkommen__startSøknadKnapp blokk-m"
                                    disabled={!harGodkjentVilkår}
                                    onClick={() => this.startEndringssøknad()}>
                                    {getMessage(intl, 'velkommen.startEndringssøknadKnapp')}
                                </Hovedknapp>
                            )}
                        />
                    </Knapperad>
                    <Normaltekst className="velkommen__personopplysningerLink">
                        <a
                            className="lenke"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                this.setState({
                                    isDinePersonopplysningerModalOpen: true
                                });
                            }}>
                            <FormattedMessage id="velkommen.lesMerOmPersonopplysninger" />
                        </a>
                    </Normaltekst>
                </div>

                <DinePlikterModal
                    isOpen={this.state.isDinePlikterModalOpen}
                    onRequestClose={() => this.setState({ isDinePlikterModalOpen: false })}
                />
                <DinePersonopplysningerModal
                    isOpen={this.state.isDinePersonopplysningerModalOpen}
                    onRequestClose={() =>
                        this.setState({
                            isDinePersonopplysningerModalOpen: false
                        })
                    }
                />
                <ApplicationInfo />
            </Applikasjonsside>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => ({
    person: props.søkerinfo.person,
    harGodkjentVilkår: state.søknad.harGodkjentVilkår
});

export default connect<StateProps>(mapStateToProps)(injectIntl(Velkommen));
