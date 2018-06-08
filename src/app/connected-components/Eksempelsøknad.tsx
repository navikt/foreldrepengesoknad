import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import ErBarnetFødtSpørsmål from '../spørsmål/ErBarnetFødtSpørsmål';
import {
    SøkerRolle,
    Søkersituasjon,
    default as Søknad
} from '../types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';
import søknadActions from './../redux/actions/søknad/søknadActionCreators';
import apiActions from './../redux/actions/api/apiActionCreators';
import { BarnPartial, UfødtBarn } from '../types/søknad/Barn';
import AntallBarnSpørsmål from '../spørsmål/AntallBarnSpørsmål';
import getMessage from 'common/util/i18nUtils';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import AnnenForelderBolk from '../bolker/AnnenForelderBolk';
import { AnnenForelderPartial } from '../types/søknad/AnnenForelder';
import Bolk from 'app/components/layout/Bolk';
import DatoInput from 'common/components/dato-input/DatoInput';
import VæreINorgeVedFødselSpørsmål from '../spørsmål/VæreINorgeVedFødselSpørsmål';
import {
    UtenlandsoppholdPartial,
    UtenlandsoppholdPeriode,
    UtenlandsoppholdPeriodeType
} from '../types/søknad/Utenlandsopphold';
import DocumentTitle from 'react-document-title';
import BoddINorgeSiste12MndSpørsmål from '../spørsmål/BoddINorgeSiste12MndSpørsmål';
import SkalBoINorgeNeste12MndSpørsmål from '../spørsmål/SkalBoINorgeNeste12MndSpørsmål';
import ErDuSelvstendigNæringsdrivendeSpørsmål from '../spørsmål/ErDuSelvstendigNæringsdrivendeSpørsmål';
import Hovedknapp from 'nav-frontend-knapper/lib/hovedknapp';
import ErDuFrilanserSpørsmål from '../spørsmål/ErDuFrilanserSpørsmål';
import SøkersituasjonSpørsmål from '../spørsmål/SøkersituasjonSpørsmål';
import SøkerrolleSpørsmål from '../spørsmål/SøkerrolleSpørsmål';
import Applikasjonsside from './sider/Applikasjonsside';
import { getSøkerrollerForBruker } from '../util/søkerrollerUtils';
import { Periode } from 'uttaksplan/types';
import Uttaksplan from 'uttaksplan/main/UttaksplanMain';
import { Språkkode } from 'common/intl/types';
import { AppState } from '../redux/reducers';
import { mapAttachmentTilSøknadsvedlegginfo } from '../util/vedleggUtil';
import { Attachment } from 'storage/attachment/types/Attachment';
import UtenlandsoppholdBolk from '../bolker/UtenlandsoppholdBolk';
import Søker from '../types/søknad/Søker';

interface StateProps {
    annenForelder: AnnenForelderPartial;
    barn: BarnPartial;
    situasjon: Søkersituasjon;
    utenlandsopphold: UtenlandsoppholdPartial;
    perioder: Periode[];
    roller?: SøkerRolle[];
    søknad: Søknad;
    søker: Søker;
    attachments: Attachment[];
    uttaksplan: Periode[];
    språkkode: Språkkode;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

class Eksempelsøknad extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.sendInnSøknad = this.sendInnSøknad.bind(this);
        this.renderSkalBoINorgeNeste12MndSpørsmål = this.renderSkalBoINorgeNeste12MndSpørsmål.bind(
            this
        );
        this.renderHarBoddINorgeSiste12MndSpørsmål = this.renderHarBoddINorgeSiste12MndSpørsmål.bind(
            this
        );
        this.updateUtenlandsopphold = this.updateUtenlandsopphold.bind(this);
    }

    sendInnSøknad() {
        const vedlegg = this.props.attachments.map((a) =>
            mapAttachmentTilSøknadsvedlegginfo(a)
        );

        const søknadsdata: Søknad = {
            ...this.props.søknad,
            uttaksplan: [...this.props.uttaksplan],
            vedlegg
        };
        this.props.dispatch(apiActions.sendSøknad(søknadsdata));
    }

    renderSkalBoINorgeNeste12MndSpørsmål() {
        const { utenlandsopphold, dispatch } = this.props;
        return (
            <SkalBoINorgeNeste12MndSpørsmål
                iNorgeNeste12={utenlandsopphold.iNorgeNeste12Mnd}
                onChange={(iNorgeNeste12Mnd: boolean) =>
                    dispatch(
                        søknadActions.updateUtenlandsopphold({
                            iNorgeNeste12Mnd
                        })
                    )
                }
            />
        );
    }

    renderHarBoddINorgeSiste12MndSpørsmål() {
        const { utenlandsopphold, dispatch } = this.props;
        return (
            <Spørsmål
                synlig={utenlandsopphold.iNorgeNeste12Mnd !== undefined}
                render={() => (
                    <BoddINorgeSiste12MndSpørsmål
                        iNorgeSiste12={utenlandsopphold.iNorgeSiste12Mnd}
                        onChange={(iNorgeSiste12Mnd: boolean) =>
                            dispatch(
                                søknadActions.updateUtenlandsopphold({
                                    iNorgeSiste12Mnd
                                })
                            )
                        }
                    />
                )}
            />
        );
    }

    updateUtenlandsopphold(
        perioder: UtenlandsoppholdPeriode[],
        periodeType: UtenlandsoppholdPeriodeType
    ) {
        const { dispatch } = this.props;
        dispatch(
            søknadActions.updateUtenlandsopphold({ [periodeType]: perioder })
        );
    }

    render() {
        const {
            dispatch,
            søknad,
            søker,
            barn,
            roller,
            situasjon,
            annenForelder,
            utenlandsopphold,
            perioder,
            intl,
            språkkode
        } = this.props;

        return (
            <Applikasjonsside visSpråkvelger={true}>
                <DocumentTitle title="Eksempelsøknad" />

                <Spørsmål
                    render={() => (
                        <SøkersituasjonSpørsmål
                            situasjon={situasjon}
                            onChange={(value) =>
                                dispatch(
                                    søknadActions.updateSøknad({
                                        situasjon: value
                                    })
                                )
                            }
                        />
                    )}
                />

                <Spørsmål
                    synlig={situasjon !== undefined}
                    render={() => (
                        <SøkerrolleSpørsmål
                            rolle={søker.rolle}
                            roller={roller}
                            onChange={(nyRolle: SøkerRolle) =>
                                dispatch(
                                    søknadActions.updateSøker({
                                        rolle: nyRolle
                                    })
                                )
                            }
                        />
                    )}
                />

                <Spørsmål
                    synlig={søker.rolle !== undefined}
                    render={() => (
                        <ErBarnetFødtSpørsmål
                            erBarnetFødt={barn.erBarnetFødt}
                            onChange={(erBarnetFødt: boolean) => {
                                dispatch(
                                    søknadActions.updateBarn({
                                        erBarnetFødt
                                    })
                                );
                            }}
                        />
                    )}
                />

                <Spørsmål
                    synlig={barn.erBarnetFødt !== undefined}
                    render={() => (
                        <AntallBarnSpørsmål
                            antallBarn={barn.antallBarn}
                            inputName="antallBarn"
                            onChange={(antallBarn: number) => {
                                dispatch(
                                    søknadActions.updateBarn({ antallBarn })
                                );
                            }}
                            spørsmål={getMessage(
                                intl,
                                'antallBarn.spørsmål.venter'
                            )}
                        />
                    )}
                />

                <Spørsmål
                    synlig={barn.antallBarn !== undefined}
                    render={() => (
                        <DatoInput
                            id="termindatoinput"
                            label={getMessage(intl, 'termindato.spørsmål')}
                            onChange={(termindato: Date) => {
                                dispatch(
                                    søknadActions.updateBarn({ termindato })
                                );
                            }}
                            dato={(barn as UfødtBarn).termindato}
                        />
                    )}
                />

                <Spørsmål
                    synlig={(barn as UfødtBarn).termindato !== undefined}
                    render={() => (
                        <DatoInput
                            label={getMessage(
                                intl,
                                'terminbekreftelseDato.spørsmål'
                            )}
                            onChange={(terminbekreftelseDato: Date) => {
                                dispatch(
                                    søknadActions.updateBarn({
                                        terminbekreftelseDato
                                    })
                                );
                            }}
                            dato={(barn as UfødtBarn).terminbekreftelseDato}
                            id="termindatoinput"
                        />
                    )}
                />

                <Bolk
                    synlig={
                        (barn as UfødtBarn).terminbekreftelseDato !== undefined
                    }
                    render={() => (
                        <AnnenForelderBolk
                            annenForelderData={annenForelder}
                            onChange={(data: AnnenForelderPartial) =>
                                dispatch(
                                    søknadActions.updateAnnenForelder(data)
                                )
                            }
                        />
                    )}
                />

                <Bolk
                    synlig={
                        annenForelder.kanIkkeOppgis ||
                        annenForelder.fnr !== undefined
                    }
                    render={() => (
                        <UtenlandsoppholdBolk
                            renderSpørsmål={
                                this.renderSkalBoINorgeNeste12MndSpørsmål
                            }
                            showUtenlandsoppholdPeriodeContent={
                                utenlandsopphold.iNorgeNeste12Mnd === false
                            }
                            oppfølgingsspørsmål={getMessage(
                                intl,
                                'utenlandsopphold.select.spørsmål.senerePerioder'
                            )}
                            perioder={søknad.utenlandsopphold.senerePerioder}
                            periodeType={'senerePerioder'}
                            språk={språkkode}
                            onChange={(
                                periodeListe: UtenlandsoppholdPeriode[]
                            ) =>
                                this.updateUtenlandsopphold(
                                    periodeListe,
                                    'senerePerioder'
                                )
                            }
                        />
                    )}
                />

                <Bolk
                    synlig={utenlandsopphold.iNorgeNeste12Mnd !== undefined}
                    render={() => (
                        <UtenlandsoppholdBolk
                            renderSpørsmål={
                                this.renderHarBoddINorgeSiste12MndSpørsmål
                            }
                            showUtenlandsoppholdPeriodeContent={
                                utenlandsopphold.iNorgeSiste12Mnd === false
                            }
                            oppfølgingsspørsmål={getMessage(
                                intl,
                                'utenlandsopphold.select.spørsmål.tidligerePerioder'
                            )}
                            perioder={søknad.utenlandsopphold.tidligerePerioder}
                            periodeType={'tidligerePerioder'}
                            språk={språkkode}
                            onChange={(
                                periodeListe: UtenlandsoppholdPeriode[]
                            ) =>
                                this.updateUtenlandsopphold(
                                    periodeListe,
                                    'tidligerePerioder'
                                )
                            }
                        />
                    )}
                />

                <Spørsmål
                    synlig={utenlandsopphold.iNorgeSiste12Mnd !== undefined}
                    render={() => (
                        <VæreINorgeVedFødselSpørsmål
                            fødselINorge={utenlandsopphold.fødselINorge}
                            onChange={(fødselINorge: boolean) =>
                                dispatch(
                                    søknadActions.updateUtenlandsopphold({
                                        fødselINorge
                                    })
                                )
                            }
                        />
                    )}
                />

                <Spørsmål
                    synlig={utenlandsopphold.fødselINorge !== undefined}
                    render={() => (
                        <ErDuSelvstendigNæringsdrivendeSpørsmål
                            erSelvstendigNæringsdrivende={
                                søker.erSelvstendigNæringsdrivende
                            }
                            onChange={(erSelvstendigNæringsdrivende) =>
                                dispatch(
                                    søknadActions.updateSøker({
                                        erSelvstendigNæringsdrivende
                                    })
                                )
                            }
                        />
                    )}
                />

                <Spørsmål
                    synlig={utenlandsopphold.fødselINorge !== undefined}
                    render={() => (
                        <ErDuFrilanserSpørsmål
                            erFrilanser={søker.erFrilanser}
                            onChange={(erFrilanser) =>
                                dispatch(
                                    søknadActions.updateSøker({
                                        erFrilanser
                                    })
                                )
                            }
                        />
                    )}
                />

                {!barn.erBarnetFødt &&
                    (barn as UfødtBarn).termindato && (
                        <Uttaksplan
                            termindato={(barn as UfødtBarn).termindato}
                            navnForelder1="Mor"
                            navnForelder2={
                                annenForelder && annenForelder.navn
                                    ? annenForelder.navn
                                    : 'Forelder 2'
                            }
                            perioder={perioder}
                            onChange={(p) =>
                                dispatch(
                                    søknadActions.updateSøknad({
                                        uttaksplan: p
                                    })
                                )
                            }
                        />
                    )}

                <Hovedknapp
                    htmlType="button"
                    onClick={() => this.sendInnSøknad()}>
                    Send søknad
                </Hovedknapp>
            </Applikasjonsside>
        );
    }
}

export default connect<StateProps>((state: AppState) => {
    const { situasjon } = state.søknad;

    const kjønn = state.api.person ? state.api.person.kjønn : undefined;
    const roller =
        kjønn && situasjon
            ? getSøkerrollerForBruker(kjønn, situasjon)
            : undefined;

    return {
        søknad: state.søknad,
        søker: state.søknad.søker,
        annenForelder: state.søknad.annenForelder,
        barn: state.søknad.barn,
        utenlandsopphold: state.søknad.utenlandsopphold,
        perioder: state.søknad.uttaksplan,
        språkkode: state.common.språkkode,
        situasjon,
        attachments: state.attachments,
        uttaksplan: state.uttaksplan.periode.perioder,
        roller
    };
})(injectIntl(Eksempelsøknad));
