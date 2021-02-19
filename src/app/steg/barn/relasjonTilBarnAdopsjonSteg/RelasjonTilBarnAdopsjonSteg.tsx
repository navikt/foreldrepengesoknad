import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import { connect } from 'react-redux';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import Block from 'common/components/block/Block';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import AttachmentsUploaderPure from 'app/components/storage/attachment/components/AttachmentUploaderPure';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import { apiActionCreators } from 'app/redux/actions';
import Steg, { StegProps } from '../../../components/applikasjon/steg/Steg';
import VeilederInfo from '../../../components/veilederInfo/VeilederInfo';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import { AppState } from '../../../redux/reducers';
import AdopsjonAvEktefellesBarnSpørsmål from '../../../spørsmål/AdopsjonAvEktefellesBarnSpørsmål';
import AdoptertIUtlandetSpørsmål from '../../../spørsmål/AdoptertIUtlandetSpørsmål';
import FødselsdatoerSpørsmål from '../../../spørsmål/FødselsdatoerSpørsmål';
import { HistoryProps } from '../../../types/common';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { Adopsjonsbarn } from '../../../types/søknad/Barn';
import { Skjemanummer, Søkersituasjon } from '../../../types/søknad/Søknad';
import cleanupAdopsjonsSteg from '../../../util/cleanup/cleanupAdopsjonsSteg';
import utils from '../../../util/domain/fødselsdato';
import { StegID } from '../../../util/routing/stegConfig';
import isAvailable from '../../../util/steg/isAvailable';
import { barnErGyldig, getAdopsjonAnkomstdatoValidatorer } from '../../../util/validation/steg/barn';
import DateValues from '../../../util/validation/values';
import AntallBarnBolk from '../components/AntallBarnBolk';
import visibility from './visibility';
import { erGyldigDato, hasValueRule } from 'app/util/validation/common';
import søknadActionCreators from '../../../redux/actions/søknad/søknadActionCreators';
import routeConfig from 'app/util/routing/routeConfig';
import { logAmplitudeEvent, PageKeys } from 'app/amplitude/amplitude';

interface StateProps {
    barn: Adopsjonsbarn;
    stegProps: StegProps;
    situasjon: Søkersituasjon;
    erEndringssøknad: boolean;
}

interface OwnProps {
    intl: IntlShape;
}

type Props = SøkerinfoProps & StateProps & DispatchProps & HistoryProps & OwnProps;
class RelasjonTilBarnAdopsjonSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.oppdaterAntallBarn = this.oppdaterAntallBarn.bind(this);
        this.onPresubmit = this.onPresubmit.bind(this);
        this.cleanupSteg = this.cleanupSteg.bind(this);

        if (!props.stegProps.isAvailable) {
            props.dispatch(søknadActionCreators.setCurrentSteg(StegID.INNGANG));
            props.history.push(routeConfig.APP_ROUTE_PREFIX);
        }

        if (props.barn.antallBarn) {
            props.dispatch(
                søknadActions.updateBarn({
                    fødselsdatoer: utils.trimFødselsdatoer(props.barn.antallBarn, this.props.barn.fødselsdatoer),
                })
            );
        }

        logAmplitudeEvent('sidevisning', {
            app: 'foreldrepengesøknad',
            team: 'foreldrepenger',
            pageKey: PageKeys.OmBarnetAdopsjon,
        });
    }

    oppdaterAntallBarn(antall: number) {
        this.props.dispatch(
            søknadActions.updateBarn({
                ...this.props.barn,
                antallBarn: antall,
                fødselsdatoer: utils.trimFødselsdatoer(antall, this.props.barn.fødselsdatoer),
            })
        );
    }

    onPresubmit() {
        this.cleanupSteg();
        this.props.dispatch(apiActionCreators.getSakForAnnenPart());
    }

    cleanupSteg() {
        const { dispatch, barn } = this.props;
        dispatch(søknadActions.updateBarn(cleanupAdopsjonsSteg(barn)));
    }

    render() {
        const { barn, dispatch, stegProps, intl, erEndringssøknad, situasjon } = this.props;

        return (
            <Steg onPreSubmit={this.onPresubmit} {...stegProps}>
                <Block>
                    <AdopsjonAvEktefellesBarnSpørsmål
                        adopsjonAvEktefellesBarn={barn.adopsjonAvEktefellesBarn}
                        onChange={(adopsjonAvEktefellesBarn: boolean) => {
                            dispatch(
                                søknadActions.updateBarn({
                                    adopsjonAvEktefellesBarn,
                                })
                            );
                        }}
                    />
                </Block>

                <Block visible={visibility.spørsmålOmAdopsjonsdato(barn)}>
                    <DatoInput
                        name="adopsjonsdato"
                        id="adopsjonsdato"
                        label={getMessage(
                            intl,
                            barn.adopsjonAvEktefellesBarn ? 'stebarnsadopsjonsdato.spørsmål' : 'adopsjonsdato.spørsmål'
                        )}
                        onChange={(adopsjonsdato) => {
                            dispatch(
                                søknadActions.updateBarn({
                                    adopsjonsdato,
                                })
                            );
                        }}
                        dato={barn.adopsjonsdato}
                        validators={[
                            hasValueRule(
                                barn.adopsjonsdato,
                                getMessage(intl, 'valideringsfeil.adopsjonsdato.duMåOppgi')
                            ),
                            erGyldigDato(
                                barn.adopsjonsdato,
                                getMessage(intl, 'valideringsfeil.adopsjonsdato.gyldigDato')
                            ),
                        ]}
                    />
                </Block>

                <Block visible={visibility.spørsmålOmAntallBarn(barn)} hasChildBlocks={true}>
                    <AntallBarnBolk
                        spørsmål={getMessage(intl, 'antallBarn.spørsmål.adoptert')}
                        inputName="antallBarn"
                        antallBarn={barn.antallBarn}
                        onChange={this.oppdaterAntallBarn}
                        situasjon={situasjon}
                    />
                </Block>

                <Block visible={visibility.spørsmålOmFødselsdatoer(barn)} hasChildBlocks={true}>
                    <FødselsdatoerSpørsmål
                        fødselsdatoer={barn.fødselsdatoer || []}
                        antallBarn={barn.antallBarn}
                        datoavgrensninger={{
                            minDato: DateValues.date15YearsAnd3MonthsAgo.toDate(),
                            maksDato: ISOStringToDate(barn.adopsjonsdato),
                        }}
                        gjelderAdopsjon={true}
                        onChangeFødselsdato={(fødselsdatoer) =>
                            dispatch(
                                søknadActions.updateBarn({
                                    fødselsdatoer,
                                })
                            )
                        }
                    />
                </Block>

                <Block visible={visibility.spørsmålOmAdoptertIUtlandet(barn)}>
                    <AdoptertIUtlandetSpørsmål
                        adoptertIUtlandet={barn.adoptertIUtlandet}
                        onChange={(adoptertIUtlandet) =>
                            dispatch(
                                søknadActions.updateBarn({
                                    adoptertIUtlandet,
                                })
                            )
                        }
                    />
                </Block>

                <Block visible={visibility.spørsmålOmAnkomstdato(barn)}>
                    <DatoInput
                        id="ankomstdato"
                        name="ankomstdato"
                        label={getMessage(intl, 'ankomstdato.spørsmål')}
                        onChange={(ankomstdato) => {
                            dispatch(
                                søknadActions.updateBarn({
                                    ankomstdato,
                                })
                            );
                        }}
                        dato={barn.ankomstdato}
                        validators={getAdopsjonAnkomstdatoValidatorer(barn, intl)}
                    />
                </Block>

                <Block visible={visibility.spørsmålOmVedlegg(barn, erEndringssøknad)}>
                    <Block margin="xs">
                        <VeilederInfo
                            messages={[
                                {
                                    type: 'normal',
                                    contentIntlKey: barn.adopsjonAvEktefellesBarn
                                        ? 'vedlegg.veileder.stebarnsadopsjon'
                                        : 'vedlegg.veileder.adopsjon',
                                },
                            ]}
                        />
                    </Block>
                    <AttachmentsUploaderPure
                        attachments={barn.omsorgsovertakelse || []}
                        attachmentType={AttachmentType.OMSORGSOVERTAKELSE}
                        skjemanummer={Skjemanummer.OMSORGSOVERTAKELSESDATO}
                        onFilesSelect={(attachments: Attachment[]) => {
                            attachments.forEach((attachment: Attachment) => {
                                dispatch(søknadActions.uploadAttachment(attachment));
                            });
                        }}
                        onFileDelete={(attachment) => dispatch(søknadActions.deleteAttachment(attachment))}
                    />
                </Block>
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const barn = state.søknad.barn as Adopsjonsbarn;

    const stegProps: StegProps = {
        id: StegID.RELASJON_TIL_BARN_ADOPSJON,
        renderFortsettKnapp: barnErGyldig(state.søknad, props.søkerinfo),
        renderFormTag: true,
        history: props.history,
        isAvailable: isAvailable(StegID.RELASJON_TIL_BARN_ADOPSJON, state.søknad, props.søkerinfo),
        renderAlleSpørsmålMåBesvares: true,
    };

    return {
        barn,
        stegProps,
        situasjon: state.søknad.situasjon,
        erEndringssøknad: state.søknad.erEndringssøknad,
    };
};

export default connect<StateProps>(mapStateToProps)(injectIntl(RelasjonTilBarnAdopsjonSteg));
