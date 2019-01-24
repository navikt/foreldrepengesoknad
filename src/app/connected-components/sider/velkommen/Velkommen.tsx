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

import { SøkerinfoProps } from '../../../types/søkerinfo';
import Knapperad from 'common/components/knapperad/Knapperad';
import { apiActionCreators } from '../../../redux/actions';
import SøknadstypeSpørsmål from '../../../spørsmål/SøknadstypeSpørsmål';
import Block from 'common/components/block/Block';
import Sak, { SakType } from '../../../types/søknad/Sak';
import SakInfo from '../../../components/sak-info/SakInfo';

import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { erInfotrygdSak, skalKunneSøkeOmEndring } from '../../../util/saker/sakerUtils';
import BEMHelper from 'common/util/bem';

import './velkommen.less';

interface StateProps {
    person?: Person;
    harGodkjentVilkår: boolean;
    oppslagSakerFeilet?: boolean;
    nyesteSak?: Sak;
    erNyesteSakKlarForEndring?: boolean;
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
        const { nyesteSak, history, erNyesteSakKlarForEndring, dispatch } = this.props;
        dispatch(
            søknadActions.updateSøknad({
                erEndringssøknad: erEndringssøknad === true,
                saksnummer:
                    erEndringssøknad === true && erNyesteSakKlarForEndring && nyesteSak && nyesteSak.saksnummer
                        ? nyesteSak.saksnummer
                        : undefined
            })
        );
        dispatch(apiActionCreators.storeAppState());
        history.push('soknad/inngang');
    }

    getStartSøknadKnappLabel(): string {
        const { intl } = this.props;
        if (this.state.skalEndre) {
            return getMessage(intl, `velkommen.startEndringssøknadKnapp`);
        } else {
            return getMessage(intl, `velkommen.startNySøknadKnapp`);
        }
    }

    render() {
        const {
            person,
            oppslagSakerFeilet,
            harGodkjentVilkår,
            dispatch,
            nyesteSak,
            erNyesteSakKlarForEndring,
            intl
        } = this.props;
        if (person === undefined) {
            return null;
        }

        const erSakForEndringssøknadFraInfotrygd: boolean =
            erNyesteSakKlarForEndring === true && nyesteSak !== undefined && erInfotrygdSak(nyesteSak);

        const visValgForNySøknadEllerEndring = erNyesteSakKlarForEndring !== undefined || oppslagSakerFeilet === true;
        const visInfoOmEndringsøknadIkkeTilgjengelig = oppslagSakerFeilet === true && this.state.skalEndre === true;

        const visBekreftSkjema =
            oppslagSakerFeilet !== true
                ? !erNyesteSakKlarForEndring || this.state.skalEndre !== undefined
                : this.state.skalEndre === false;

        const bem = BEMHelper('velkommen');

        return (
            <Applikasjonsside visSpråkvelger={true} margin={false}>
                <DocumentTitle title={getMessage(intl, 'dokument.tittel.velkommen')} />

                <VeilederMedSnakkeboble
                    dialog={{
                        title: getMessage(intl, 'velkommen.bobletittel', {
                            name: person.fornavn
                        }),
                        text: getMessage(intl, 'velkommen.bobletekst')
                    }}
                />
                <div className={bem.className}>
                    <Innholdstittel className={`${bem.element('tittel')} blokk-s`}>
                        {getMessage(intl, 'velkommen.tittel')}
                    </Innholdstittel>
                    {visValgForNySøknadEllerEndring && (
                        <>
                            <Block>
                                <Ingress>
                                    <FormattedMessage
                                        id={
                                            erSakForEndringssøknadFraInfotrygd
                                                ? 'velkommen.intro.harInfotrygdSak'
                                                : 'velkommen.intro.harSak'
                                        }
                                    />
                                </Ingress>
                            </Block>
                            {nyesteSak &&
                                erNyesteSakKlarForEndring &&
                                nyesteSak.type === SakType.FPSAK && (
                                    <Block>
                                        <SakInfo sak={nyesteSak} />
                                    </Block>
                                )}
                            <Block>
                                <SøknadstypeSpørsmål
                                    harEksisterendeSak={true}
                                    skalEndre={this.state.skalEndre}
                                    onChange={(skalEndre) => this.setState({ skalEndre })}
                                    erSakForEndringssøknadFraInfotrygd={erSakForEndringssøknadFraInfotrygd}
                                />
                            </Block>
                            {this.state.skalEndre === false &&
                                !erSakForEndringssøknadFraInfotrygd && (
                                    <Veilederinfo>
                                        <FormattedMessage id="velkommen.intro.harSak.veileder" />
                                    </Veilederinfo>
                                )}
                            {this.state.skalEndre === true &&
                                erSakForEndringssøknadFraInfotrygd && (
                                    <Veilederinfo>
                                        <FormattedMessage id="velkommen.intro.harInfotrygdSak.veileder" />
                                    </Veilederinfo>
                                )}
                        </>
                    )}
                    <Block visible={visInfoOmEndringsøknadIkkeTilgjengelig}>
                        <Veilederinfo type="advarsel">
                            <FormattedMessage id="velkommen.endringssøknadIkkeTilgjengelig.veileder" />
                        </Veilederinfo>
                    </Block>
                    <Block visible={visBekreftSkjema}>
                        <BekreftCheckboksPanel
                            className="blokk-m"
                            checked={harGodkjentVilkår}
                            label={getMessage(intl, 'velkommen.samtykke')}
                            onChange={() => {
                                dispatch(søknadActions.updateSøknad({ harGodkjentVilkår: !harGodkjentVilkår }));
                            }}>
                            <Normaltekst>{this.getBekreftCheckboksPanelLabelHeader()}</Normaltekst>
                        </BekreftCheckboksPanel>
                        <Knapperad>
                            <Hovedknapp
                                className={`${bem.element('startSøknadKnapp')} blokk-m`}
                                disabled={!harGodkjentVilkår}
                                onClick={() => this.startSøknad(this.state.skalEndre)}>
                                {this.getStartSøknadKnappLabel()}
                            </Hovedknapp>
                        </Knapperad>
                        <Normaltekst className={bem.element('personopplysningerLink')}>
                            <a
                                className="lenke"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.setState({ isDinePersonopplysningerModalOpen: true });
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

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const nyesteSak = state.api.nyesteSak;
    const erNyesteSakKlarForEndring: boolean = nyesteSak !== undefined && skalKunneSøkeOmEndring(nyesteSak);

    return {
        person: props.søkerinfo.person,
        harGodkjentVilkår: state.søknad.harGodkjentVilkår,
        oppslagSakerFeilet: state.api.oppslagSakerFeilet,
        nyesteSak: state.api.nyesteSak,
        erNyesteSakKlarForEndring
    };
};

export default connect<StateProps>(mapStateToProps)(injectIntl(Velkommen));
