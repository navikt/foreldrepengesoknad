import * as React from 'react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { connect } from 'react-redux';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { guid } from 'nav-frontend-js-utils';
import Lenke from 'nav-frontend-lenker';
import { Element } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Block from 'common/components/block/Block';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import Veileder from 'common/components/veileder/Veileder';
import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import Steg, { StegProps } from 'app/components/applikasjon/steg/Steg';
import AttachmentsUploaderPure from 'app/components/storage/attachment/components/AttachmentUploaderPure';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import VeilederInfo from 'app/components/veilederInfo/VeilederInfo';
import { apiActionCreators } from 'app/redux/actions';
import { getTermindatoReglerForFødsel, termindatoAvgrensningerFodsel } from 'app/util/validation/termindato';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import { AppState } from '../../../redux/reducers';
import ErBarnetFødtSpørsmål from '../../../spørsmål/ErBarnetFødtSpørsmål';
import { HistoryProps } from '../../../types/common';
import { RegistrertBarn } from '../../../types/Person';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { AnnenForelderPartial } from '../../../types/søknad/AnnenForelder';
import Barn, { FødtBarn, isFødtBarn, isUfødtBarn } from '../../../types/søknad/Barn';
import Søker from '../../../types/søknad/Søker';
import { Skjemanummer, SøkerRolle, Søkersituasjon, SøknadenGjelderBarnValg } from '../../../types/søknad/Søknad';
import cleanupRelasjonTilBarnFødselSteg from '../../../util/cleanup/relasjonTilBarn/cleanupRelasjonTilBarnFødselSteg';
import { getErSøkerFarEllerMedmor } from '../../../util/domain/personUtil';
import lenker from '../../../util/routing/lenker';
import { StegID } from '../../../util/routing/stegConfig';
import isAvailable from '../../../util/steg/isAvailable';
import { barnErGyldig } from '../../../util/validation/steg/barn';
import HvilkeBarnGjelderSøknadenBolk from './HvilkeBarnGjelderSøknadenBolk';
import FødtBarnPartial from './partials/FødtBarnPartial';
import UfødtBarnPartial from './partials/UfødtBarnPartial';
import {
    getRelasjonTilBarnFødselVisibility,
    RelasjonTilBarnFødselStegVisibility,
} from './visibility/relasjonTilBarnFødselVisibility';
import { skalViseInfoOmPrematuruker, visTermindato } from './visibility/visibilityFunctions';
import søknadActionCreators from '../../../redux/actions/søknad/søknadActionCreators';
import routeConfig from 'app/util/routing/routeConfig';
import { logAmplitudeEvent, PageKeys } from '../old/amplitude/amplitude';

interface RelasjonTilBarnFødselStegProps {
    barn: Barn;
    søker: Søker;
    annenForelder: AnnenForelderPartial;
    registrerteBarn: RegistrertBarn[];
    søknadenGjelderBarnValg: SøknadenGjelderBarnValg;
    terminbekreftelse: Attachment[];
    stegProps: StegProps;
    vis: RelasjonTilBarnFødselStegVisibility;
    situasjon: Søkersituasjon;
}

interface OwnProps {
    intl: IntlShape;
}

type Props = RelasjonTilBarnFødselStegProps & DispatchProps & SøkerinfoProps & HistoryProps & OwnProps;

class RelasjonTilBarnFødselSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onPresubmit = this.onPresubmit.bind(this);
        this.cleanupSteg = this.cleanupSteg.bind(this);
        this.visInfoOmPrematuruker = this.visInfoOmPrematuruker.bind(this);

        if (!props.stegProps.isAvailable) {
            props.dispatch(søknadActionCreators.setCurrentSteg(StegID.INNGANG));
            props.history.push(routeConfig.APP_ROUTE_PREFIX);
        }

        logAmplitudeEvent('sidevisning', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            pageKey: PageKeys.OmBarnetFødsel,
        });
    }

    onPresubmit() {
        this.cleanupSteg();
        this.props.dispatch(apiActionCreators.getSakForAnnenPart());
    }

    cleanupSteg() {
        const { barn, dispatch } = this.props;
        dispatch(søknadActions.updateBarn(cleanupRelasjonTilBarnFødselSteg(barn)));
    }

    visInfoOmPrematuruker(fødselsdato: Date, termindato?: Date) {
        return termindato !== undefined && skalViseInfoOmPrematuruker(fødselsdato, termindato);
    }

    render() {
        const {
            barn,
            søker,
            annenForelder,
            terminbekreftelse,
            registrerteBarn,
            søknadenGjelderBarnValg,
            stegProps,
            vis,
            dispatch,
            situasjon,
            intl,
        } = this.props;

        const { gjelderAnnetBarn, valgteBarn } = søknadenGjelderBarnValg;
        const valgtBarn = valgteBarn[0];
        const fødtBarnTermindato = (barn as FødtBarn).termindato;

        return (
            <Steg {...stegProps} onPreSubmit={this.onPresubmit}>
                <Block visible={vis.hvilketBarnGjelderSøknadenBolk} margin="none">
                    <HvilkeBarnGjelderSøknadenBolk
                        søknadenGjelderBarnValg={søknadenGjelderBarnValg}
                        registrerteBarn={registrerteBarn}
                        onChange={(søknadenGjelder) =>
                            dispatch(søknadActions.updateSøknadenGjelderBarn(søknadenGjelder))
                        }
                    />
                </Block>
                <Block margin="none" hasChildBlocks={true} visible={vis.erBarnetFødt}>
                    <Block>
                        <ErBarnetFødtSpørsmål
                            erBarnetFødt={barn.erBarnetFødt}
                            onChange={(erBarnetFødt: boolean) =>
                                dispatch(
                                    søknadActions.updateBarn({
                                        erBarnetFødt,
                                    })
                                )
                            }
                        />
                    </Block>
                    {vis.fødtBarnPart && isFødtBarn(barn, situasjon) && (
                        <FødtBarnPartial
                            situasjon={situasjon}
                            dispatch={dispatch}
                            barn={barn}
                            gjelderAnnetBarn={gjelderAnnetBarn}
                            registrerteBarn={registrerteBarn}
                            vis={vis.født}
                            erFarMedmor={søker.rolle !== SøkerRolle.MOR}
                        />
                    )}
                    {barn.erBarnetFødt === false && getErSøkerFarEllerMedmor(søker.rolle) && (
                        <Veilederpanel svg={<Veileder farge="lilla" stil="kompakt" />}>
                            <FormattedMessage
                                id="erBarnetFødt.spørsmål.veileder.medMorEllerFar"
                                values={{
                                    lenke: (
                                        <Lenke href={lenker.papirsøknad}>
                                            <FormattedMessage id="papirsøknad.lenke" />
                                        </Lenke>
                                    ),
                                }}
                            />
                        </Veilederpanel>
                    )}
                    {vis.ufødtBarnPart && isUfødtBarn(barn, situasjon) && !getErSøkerFarEllerMedmor(søker.rolle) && (
                        <UfødtBarnPartial
                            situasjon={situasjon}
                            dispatch={dispatch}
                            barn={barn}
                            annenForelder={annenForelder}
                            søker={søker}
                            erFarEllerMedmor={getErSøkerFarEllerMedmor(søker.rolle)}
                            terminbekreftelse={terminbekreftelse || []}
                            vis={vis.ufødt}
                        />
                    )}
                </Block>
                <Block visible={valgtBarn !== undefined}>
                    {valgtBarn !== undefined && (
                        <>
                            <Block visible={visTermindato(valgtBarn.fødselsdato, søker.rolle)}>
                                <DatoInput
                                    id={guid()}
                                    name="termindato"
                                    dato={(barn as FødtBarn).termindato}
                                    onChange={(termindato) => dispatch(søknadActions.updateBarn({ termindato }))}
                                    label={<Labeltekst intlId="fødselsdatoer.termin" />}
                                    datoAvgrensinger={{ ...termindatoAvgrensningerFodsel }}
                                    validators={getTermindatoReglerForFødsel(fødtBarnTermindato, intl)}
                                />
                            </Block>
                            <Block
                                visible={this.visInfoOmPrematuruker(
                                    valgtBarn.fødselsdato,
                                    ISOStringToDate(fødtBarnTermindato)
                                )}
                            >
                                <VeilederInfo
                                    messages={[
                                        {
                                            contentIntlKey: 'barnFødt.infoPrematuruker',
                                            type: 'info',
                                        },
                                    ]}
                                />
                            </Block>
                            <Block
                                visible={this.visInfoOmPrematuruker(
                                    valgtBarn.fødselsdato,
                                    ISOStringToDate(fødtBarnTermindato)
                                )}
                            >
                                <Block margin="xs">
                                    <Element>{getMessage(intl, 'vedlegg.lastoppknapp.terminbekreftelse')}</Element>
                                </Block>
                                <AttachmentsUploaderPure
                                    attachments={barn.terminbekreftelse || []}
                                    attachmentType={AttachmentType.TERMINBEKREFTELSE}
                                    skjemanummer={Skjemanummer.TERMINBEKREFTELSE}
                                    onFilesSelect={(attachments: Attachment[]) => {
                                        attachments.forEach((attachment: Attachment) => {
                                            dispatch(søknadActions.uploadAttachment(attachment));
                                        });
                                    }}
                                    onFileDelete={(attachment: Attachment) => {
                                        dispatch(søknadActions.deleteAttachment(attachment));
                                    }}
                                />
                            </Block>
                        </>
                    )}
                </Block>
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): RelasjonTilBarnFødselStegProps => {
    const { registrerteBarn = [] } = props.søkerinfo;
    const { søknad } = state;
    const {
        barn,
        søker,
        annenForelder,
        ekstrainfo: { søknadenGjelderBarnValg },
    } = søknad;

    const renderFortsettKnapp = barnErGyldig(søknad, props.søkerinfo);

    const stegProps: StegProps = {
        id: StegID.RELASJON_TIL_BARN_FØDSEL,
        history: props.history,
        renderFortsettKnapp,
        renderFormTag: true,
        isAvailable: isAvailable(StegID.RELASJON_TIL_BARN_FØDSEL, søknad, props.søkerinfo),
        renderAlleSpørsmålMåBesvares: true,
    };

    const vis = getRelasjonTilBarnFødselVisibility(søknad, state.api);

    return {
        søker,
        annenForelder,
        registrerteBarn,
        søknadenGjelderBarnValg: søknadenGjelderBarnValg
            ? søknadenGjelderBarnValg
            : { gjelderAnnetBarn: undefined, valgteBarn: [] },
        barn,
        terminbekreftelse: isUfødtBarn(barn, søknad.situasjon) ? barn.terminbekreftelse : [],
        stegProps,
        vis,
        situasjon: søknad.situasjon,
    };
};

export default connect<RelasjonTilBarnFødselStegProps>(mapStateToProps)(injectIntl(RelasjonTilBarnFødselSteg));
