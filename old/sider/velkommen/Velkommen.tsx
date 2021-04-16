import * as React from 'react';
import DocumentTitle from 'react-document-title';
import { injectIntl, FormattedMessage, IntlShape } from 'react-intl';
import { connect } from 'react-redux';

import { Innholdstittel, Normaltekst, Ingress } from 'nav-frontend-typografi';

import getMessage from 'common/util/i18nUtils';
import VeilederMedSnakkeboble from 'common/components/veilederMedSnakkeboble/VeilederMedSnakkeboble';

import Applikasjonsside from '../../components/applikasjon/applikasjonsside/Applikasjonsside';
import DinePersonopplysningerModal from './dinePersonopplysningerModal/DinePersonopplysningerModal';

import { AppState } from '../../redux/reducers';
import { DispatchProps } from 'common/redux/types';
import Person from '../../types/Person';
import { HistoryProps } from '../../types/common';

import søknadActions from '../../redux/actions/søknad/søknadActionCreators';

import { SøkerinfoProps } from '../../types/søkerinfo';
import SøknadstypeSpørsmål from '../../spørsmål/SøknadstypeSpørsmål';
import Block from 'common/components/block/Block';
import Sak, { SakType, FagsakStatus } from '../../types/søknad/Sak';
import SakInfo from './sakInfo/SakInfo';

import { erInfotrygdSak } from '../../util/saker/sakerUtils';
import BEMHelper from 'common/util/bem';
import VeilederInfo from '../../components/veilederInfo/VeilederInfo';
import { StorageKvittering } from '../../types/StorageKvittering';
import SakInfoStorageKvittering from 'app/sider/velkommen/sakInfo/SakInfoStorageKvittering';
import DinePlikter from './dinePlikter/DinePlikter';
import UtvidetInformasjon from 'app/components/elementer/utvidetinformasjon/UtvidetInformasjon';
import ForståttRettigheterForm from './ForståttRettigheterForm';

import './velkommen.less';
import { UnansweredQuestionsInfo } from '@navikt/sif-common-formik/lib';
import { logAmplitudeEvent, PageKeys } from '../old/amplitude/amplitude';

interface StateProps {
    person?: Person;
    harGodkjentVilkår: boolean;
    sakForEndringssøknad?: Sak;
    sakUnderBehandling?: Sak;
    oppslagSakerFeilet?: boolean;
    storageKvittering?: StorageKvittering;
    isLoadingEkisterendeSak: boolean;
}

interface State {
    isDinePersonopplysningerModalOpen: boolean;
    skalEndre: boolean | undefined;
}

interface OwnProps {
    intl: IntlShape;
}

type Props = StateProps & DispatchProps & HistoryProps & SøkerinfoProps & OwnProps;

class Velkommen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.getStartSøknadKnappLabel = this.getStartSøknadKnappLabel.bind(this);
        this.state = {
            isDinePersonopplysningerModalOpen: false,
            skalEndre: undefined,
        };

        logAmplitudeEvent('sidevisning', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            pageKey: PageKeys.Velkommen,
        });
    }

    getBekreftCheckboksPanelLabelHeader() {
        const { intl } = this.props;

        return (
            <>
                <FormattedMessage id="velkommen.samtykkeIntro.del1" />
                <UtvidetInformasjon apneLabel={getMessage(intl, 'velkommen.samtykkeIntro.del1.apneLabel')}>
                    <DinePlikter />
                </UtvidetInformasjon>
                <Block margin="xs">
                    <FormattedMessage id="velkommen.samtykkeIntro.del2" />
                </Block>
                <FormattedMessage id="velkommen.samtykkeIntro.del3" />
            </>
        );
    }

    handleStartSøknad(erEndringssøknad: boolean | undefined) {
        const { søkerinfo, sakForEndringssøknad, history, dispatch } = this.props;
        const saksnummer =
            erEndringssøknad === true && sakForEndringssøknad && sakForEndringssøknad.saksnummer
                ? sakForEndringssøknad.saksnummer
                : undefined;
        dispatch(søknadActions.updateSøknad({ harGodkjentVilkår: true }));
        dispatch(søknadActions.startSøknad(søkerinfo, erEndringssøknad === true, saksnummer, history));
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
            sakForEndringssøknad,
            sakUnderBehandling,
            oppslagSakerFeilet,
            storageKvittering,
            isLoadingEkisterendeSak,
            intl,
        } = this.props;
        if (person === undefined) {
            return null;
        }

        const erSakForEndringssøknadFraInfotrygd =
            sakForEndringssøknad !== undefined && erInfotrygdSak(sakForEndringssøknad);

        const visValgForNySøknadEllerEndring = sakForEndringssøknad !== undefined || oppslagSakerFeilet === true;

        const visInfoOmEndringsøknadIkkeTilgjengelig = oppslagSakerFeilet === true && this.state.skalEndre === true;

        const visBekreftSkjema =
            oppslagSakerFeilet !== true
                ? sakForEndringssøknad === undefined || this.state.skalEndre !== undefined
                : this.state.skalEndre === false;

        const bem = BEMHelper('velkommen');

        return (
            <div role="main">
                <Applikasjonsside visSpråkvelger={true} margin={false}>
                    <DocumentTitle title={getMessage(intl, 'dokument.tittel.velkommen')} />

                    <VeilederMedSnakkeboble
                        dialog={{
                            title: getMessage(intl, 'velkommen.bobletittel', {
                                name: person.fornavn,
                            }),
                            text: getMessage(intl, 'velkommen.bobletekst'),
                        }}
                    />
                    <div className={bem.block}>
                        <Innholdstittel className={`${bem.element('tittel')} blokk-s`}>
                            {getMessage(intl, 'velkommen.tittel')}
                        </Innholdstittel>
                        {visValgForNySøknadEllerEndring && (
                            <>
                                <Block>
                                    <Ingress tag="div">
                                        {erSakForEndringssøknadFraInfotrygd ? (
                                            <>
                                                <Block margin="xs">
                                                    <FormattedMessage id="velkommen.intro.harInfotrygdSak.del1" />
                                                </Block>
                                                <Block margin="xs">
                                                    <FormattedMessage id="velkommen.intro.harInfotrygdSak.del2" />
                                                </Block>
                                            </>
                                        ) : (
                                            <>
                                                <Block margin="xs">
                                                    <FormattedMessage id="velkommen.intro.harSak.del1" />
                                                </Block>
                                                <Block margin="xs">
                                                    <FormattedMessage id="velkommen.intro.harSak.del2" />
                                                </Block>
                                            </>
                                        )}
                                    </Ingress>
                                </Block>
                                {sakForEndringssøknad !== undefined && sakForEndringssøknad.type === SakType.FPSAK && (
                                    <Block>
                                        <SakInfo sak={sakForEndringssøknad} />
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
                                <Block visible={this.state.skalEndre === undefined}>
                                    <UnansweredQuestionsInfo>
                                        <FormattedMessage id="steg.footer.spørsmålMåBesvares" />
                                    </UnansweredQuestionsInfo>
                                </Block>

                                {this.state.skalEndre === false && !erSakForEndringssøknadFraInfotrygd && (
                                    <VeilederInfo
                                        messages={[
                                            {
                                                contentIntlKey: 'velkommen.intro.harSak.veileder',
                                                type: 'normal',
                                            },
                                        ]}
                                    />
                                )}
                                {this.state.skalEndre &&
                                    !erSakForEndringssøknadFraInfotrygd &&
                                    sakForEndringssøknad !== undefined &&
                                    sakForEndringssøknad.status === FagsakStatus.UNDER_BEHANDLING && (
                                        <VeilederInfo
                                            messages={[
                                                {
                                                    contentIntlKey: 'velkommen.intro.harSak.veileder.endring',
                                                    type: 'normal',
                                                },
                                            ]}
                                        />
                                    )}
                                {this.state.skalEndre === true && erSakForEndringssøknadFraInfotrygd && (
                                    <VeilederInfo
                                        messages={[
                                            {
                                                contentIntlKey: 'velkommen.intro.harInfotrygdSak.veileder',
                                                type: 'normal',
                                            },
                                        ]}
                                    />
                                )}
                            </>
                        )}
                        {sakUnderBehandling !== undefined && (
                            <>
                                <Block>
                                    <FormattedMessage id="velkommen.intro.harFørstegangssøknadUnderBehandling" />
                                </Block>
                                <Block>
                                    <SakInfo sak={sakUnderBehandling} />
                                </Block>
                            </>
                        )}
                        {!erSakForEndringssøknadFraInfotrygd &&
                            storageKvittering &&
                            storageKvittering.innsendingstidspunkt &&
                            sakUnderBehandling === undefined &&
                            sakForEndringssøknad === undefined && (
                                <>
                                    <Block>
                                        <FormattedMessage id="velkommen.intro.harFørstegangssøknadUnderBehandling" />
                                    </Block>
                                    <Block>
                                        <SakInfoStorageKvittering storageKvittering={storageKvittering} />
                                    </Block>
                                </>
                            )}
                        <Block visible={visInfoOmEndringsøknadIkkeTilgjengelig}>
                            <VeilederInfo
                                messages={[
                                    {
                                        contentIntlKey: 'velkommen.endringssøknadIkkeTilgjengelig.veileder',
                                        type: 'normal',
                                    },
                                ]}
                            />
                        </Block>
                        <Block visible={visBekreftSkjema}>
                            <ForståttRettigheterForm
                                checkboxLabelHeader={this.getBekreftCheckboksPanelLabelHeader()}
                                isLoadingEkisterendeSak={isLoadingEkisterendeSak}
                                knappClassName={`${bem.element('startSøknadKnapp')} blokk-m`}
                                knappLabel={this.getStartSøknadKnappLabel()}
                                onConfirm={() => this.handleStartSøknad(this.state.skalEndre)}
                            />
                            <Normaltekst className={bem.element('personopplysningerLink')}>
                                <a
                                    className="lenke"
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({ isDinePersonopplysningerModalOpen: true });
                                    }}
                                >
                                    <FormattedMessage id="velkommen.lesMerOmPersonopplysninger" />
                                </a>
                            </Normaltekst>
                        </Block>
                    </div>
                    <DinePersonopplysningerModal
                        isOpen={this.state.isDinePersonopplysningerModalOpen}
                        onRequestClose={() =>
                            this.setState({
                                isDinePersonopplysningerModalOpen: false,
                            })
                        }
                    />
                </Applikasjonsside>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => ({
    person: props.søkerinfo && props.søkerinfo.person,
    harGodkjentVilkår: state.søknad.harGodkjentVilkår,
    sakForEndringssøknad: state.api.sakForEndringssøknad,
    sakUnderBehandling: state.api.sakUnderBehandling,
    oppslagSakerFeilet: state.api.oppslagSakerFeilet,
    storageKvittering: state.api.storageKvittering,
    isLoadingEkisterendeSak: state.api.isLoadingEksisterendeSak,
});

export default connect<StateProps>(mapStateToProps)(injectIntl(Velkommen));
