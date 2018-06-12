import * as React from 'react';
import DocumentTitle from 'react-document-title';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';

import getMessage from 'common/util/i18nUtils';
import { DispatchProps } from 'common/redux/types';
import VeilederMedSnakkeboble from 'common/components/veileder-med-snakkeboble/VeilederMedSnakkeboble';

import Applikasjonsside from '../Applikasjonsside';

import DinePlikterModal from './DinePlikterModal';
import DinePersonopplysningerModal from './DinePersonopplysningerModal';

import Person from '../../../types/Person';

import { HistoryProps } from '../../../types/common';

import './velkommen.less';

interface StateProps {
    person: Person;
}

interface OwnProps {
    isDinePlikterModalOpen: boolean;
    isDinePersonopplysningerModalOpen: boolean;
    harGodkjentVilkår: boolean;
}

type Props = StateProps & DispatchProps & InjectedIntlProps & HistoryProps;
class Velkommen extends React.Component<Props, OwnProps> {
    componentWillMount() {
        this.setState({
            isDinePlikterModalOpen: false,
            isDinePersonopplysningerModalOpen: false,
            harGodkjentVilkår: false
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
                            onClick={(e) =>
                                this.setState({
                                    isDinePlikterModalOpen: true
                                })
                            }>
                            <FormattedMessage id="velkommen.dinePlikter" />
                        </a>
                    )
                }}
            />
        );
    }

    render() {
        const { harGodkjentVilkår } = this.state;
        const { person, history, intl } = this.props;

        return (
            <Applikasjonsside visSpråkvelger={true} withoutMargin={true}>
                <DocumentTitle title="Søknad om foreldrepenger" />
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
                            this.setState({
                                harGodkjentVilkår: !harGodkjentVilkår
                            });
                        }}>
                        <span>
                            {this.getBekreftCheckboksPanelLabelHeader()}
                        </span>
                    </BekreftCheckboksPanel>
                    <Hovedknapp
                        className="velkommen__startSøknadKnapp blokk-m"
                        disabled={!this.state.harGodkjentVilkår}
                        onClick={() =>
                            harGodkjentVilkår &&
                            history.push('/foreldrepengesoknad/sideoversikt')
                        }>
                        {getMessage(intl, 'velkommen.startSøknadKnapp')}
                    </Hovedknapp>
                    <div className="velkommen__personopplysningerLink">
                        <a
                            className="lenke"
                            href="#"
                            onClick={(e) =>
                                this.setState({
                                    isDinePersonopplysningerModalOpen: true
                                })
                            }>
                            <FormattedMessage id="velkommen.lesMerOmPersonopplysninger" />
                        </a>
                    </div>
                </div>

                <DinePlikterModal
                    isOpen={this.state.isDinePlikterModalOpen}
                    onRequestClose={() =>
                        this.setState({ isDinePlikterModalOpen: false })
                    }
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

const mapStateToProps = (state: any) => ({
    person: state.api.person
});

export default connect<StateProps>(mapStateToProps)(injectIntl(Velkommen));
