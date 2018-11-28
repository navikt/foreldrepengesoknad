import * as React from 'react';
import DocumentTitle from 'react-document-title';
import { InjectedIntlProps, injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { connect } from 'react-redux';

import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Innholdstittel, Normaltekst, Ingress } from 'nav-frontend-typografi';
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
import { Feature, isFeatureEnabled } from '../../../Feature';
import SøknadstypeSpørsmål from '../../../spørsmål/SøknadstypeSpørsmål';
import Block from 'common/components/block/Block';

interface StateProps {
    person?: Person;
    harGodkjentVilkår: boolean;
}

interface State {
    isDinePlikterModalOpen: boolean;
    isDinePersonopplysningerModalOpen: boolean;
    skalEndre: boolean | undefined;
}

type Props = StateProps & DispatchProps & InjectedIntlProps & HistoryProps & DispatchProps & SøkerinfoProps;

class Velkommen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.getStartSøknadKnappLabel = this.getStartSøknadKnappLabel.bind(this);
    }
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

    startSøknad(erEndringssøknad: boolean | undefined) {
        const { history, dispatch } = this.props;
        dispatch(søknadActions.updateSøknad({ erEndringssøknad: erEndringssøknad === true }));
        dispatch(apiActionCreators.storeAppState());
        history.push('soknad/inngang');
    }

    getStartSøknadKnappLabel(): string {
        const { intl } = this.props;
        if (isFeatureEnabled(Feature.endringssøknad) && this.state.skalEndre) {
            return getMessage(intl, `velkommen.startEndringssøknadKnapp`);
        } else {
            return getMessage(intl, `velkommen.startNySøknadKnapp`);
        }
    }

    render() {
        const { person, harGodkjentVilkår, dispatch, intl } = this.props;

        if (person === undefined) {
            return null;
        }

        const endringssøknadEnabled = isFeatureEnabled(Feature.endringssøknad);

        return (
            <Applikasjonsside visSpråkvelger={isFeatureEnabled(Feature.nynorsk)} margin={false}>
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
                    <Innholdstittel className="velkommen__tittel blokk-s">
                        {getMessage(intl, 'velkommen.tittel')}
                    </Innholdstittel>
                    <FeatureBlock
                        feature={Feature.endringssøknad}
                        render={() => (
                            <>
                                <Block>
                                    <Ingress>
                                        <FormattedMessage id="velkommen.intro.harIkkeSak" />
                                    </Ingress>
                                </Block>
                                <Block>
                                    <SøknadstypeSpørsmål
                                        harEksisterendeSak={false}
                                        skalEndre={this.state.skalEndre}
                                        onChange={(skalEndre) => this.setState({ skalEndre })}
                                    />
                                </Block>
                            </>
                        )}
                    />
                    <Block visible={endringssøknadEnabled === false || this.state.skalEndre !== undefined}>
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
                                onClick={() => this.startSøknad(this.state.skalEndre)}>
                                {this.getStartSøknadKnappLabel()}
                            </Hovedknapp>
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
                    </Block>
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
            </Applikasjonsside>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => ({
    person: props.søkerinfo.person,
    harGodkjentVilkår: state.søknad.harGodkjentVilkår
});

export default connect<StateProps>(mapStateToProps)(injectIntl(Velkommen));
