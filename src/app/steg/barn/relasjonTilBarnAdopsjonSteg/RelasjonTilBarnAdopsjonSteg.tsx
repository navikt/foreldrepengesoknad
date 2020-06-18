import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, IntlShape } from 'react-intl';
import { StegID } from '../../../util/routing/stegConfig';
import { DispatchProps } from 'common/redux/types';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import AntallBarnBolk from '../components/AntallBarnBolk';
import AdoptertIUtlandetSpørsmål from '../../../spørsmål/AdoptertIUtlandetSpørsmål';
import getMessage from 'common/util/i18nUtils';
import Block from 'common/components/block/Block';
import { Adopsjonsbarn } from '../../../types/søknad/Barn';
import FødselsdatoerSpørsmål from '../../../spørsmål/FødselsdatoerSpørsmål';
import utils from '../../../util/domain/fødselsdato';
import { AppState } from '../../../redux/reducers';
import Steg, { StegProps } from '../../../components/applikasjon/steg/Steg';
import AttachmentsUploaderPure from 'app/components/storage/attachment/components/AttachmentUploaderPure';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import isAvailable from '../../../util/steg/isAvailable';
import { barnErGyldig, getAdopsjonAnkomstdatoValidatorer } from '../../../util/validation/steg/barn';
import { Skjemanummer, Søkersituasjon } from '../../../types/søknad/Søknad';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import DateValues from '../../../util/validation/values';
import AdopsjonAvEktefellesBarnSpørsmål from '../../../spørsmål/AdopsjonAvEktefellesBarnSpørsmål';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { HistoryProps } from '../../../types/common';
import visibility from './visibility';
import cleanupAdopsjonsSteg from '../../../util/cleanup/cleanupAdopsjonsSteg';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import VeilederInfo from '../../../components/veilederInfo/VeilederInfo';
import { apiActionCreators } from 'app/redux/actions';

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

        if (props.barn.antallBarn) {
            props.dispatch(
                søknadActions.updateBarn({
                    fødselsdatoer: utils.trimFødselsdatoer(props.barn.antallBarn, this.props.barn.fødselsdatoer),
                })
            );
        }
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
                        onChange={(adopsjonsdato: Date) => {
                            dispatch(
                                søknadActions.updateBarn({
                                    adopsjonsdato,
                                })
                            );
                        }}
                        dato={barn.adopsjonsdato}
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
                            maksDato: barn.adopsjonsdato,
                        }}
                        gjelderAdopsjon={true}
                        onChangeFødselsdato={(fødselsdatoer: Date[]) =>
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
                        onChange={(ankomstdato: Date) => {
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
    };

    return {
        barn,
        stegProps,
        situasjon: state.søknad.situasjon,
        erEndringssøknad: state.søknad.erEndringssøknad,
    };
};

export default connect<StateProps>(mapStateToProps)(injectIntl(RelasjonTilBarnAdopsjonSteg));
