import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import { connect } from 'react-redux';
import Block from 'common/components/block/Block';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import { DispatchProps } from 'common/redux/types';
import Steg from 'app/components/applikasjon/steg/Steg';
import AttachmentsUploaderPure from 'app/components/storage/attachment/components/AttachmentUploaderPure';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import { StegProps } from '../../../components/applikasjon/steg/Steg';
import VeilederInfo from '../../../components/veilederInfo/VeilederInfo';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import { AppState } from '../../../redux/reducers';
import FødselsdatoerSpørsmål from '../../../spørsmål/FødselsdatoerSpørsmål';
import { HistoryProps } from '../../../types/common';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { ForeldreansvarBarn } from '../../../types/søknad/Barn';
import { Skjemanummer } from '../../../types/søknad/Søknad';
import utils from '../../../util/domain/fødselsdato';
import { StegID } from '../../../util/routing/stegConfig';
import isAvailable from '../../../util/steg/isAvailable';
import { fødselsdatoerErFyltUt } from '../../../util/validation/fødselsdato';
import { barnErGyldig } from '../../../util/validation/steg/barn';
import DateValues from '../../../util/validation/values';
import AntallBarnBolk from '../components/AntallBarnBolk';
import visibility from './visibility';
import søknadActionCreators from '../../../redux/actions/søknad/søknadActionCreators';
import routeConfig from 'app/util/routing/routeConfig';

export interface StateProps {
    barn: Partial<ForeldreansvarBarn>;
    stegProps: StegProps;
}

interface OwnProps {
    intl: IntlShape;
}

export type Props = SøkerinfoProps & StateProps & DispatchProps & HistoryProps & OwnProps;

class RelasjonTilBarnForeldreansvarSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.oppdaterAntallBarn = this.oppdaterAntallBarn.bind(this);

        if (!props.stegProps.isAvailable) {
            props.dispatch(søknadActionCreators.setCurrentSteg(StegID.INNGANG));
            props.history.push(routeConfig.APP_ROUTE_PREFIX);
        }
    }

    oppdaterAntallBarn(antall: number) {
        this.props.dispatch(
            søknadActions.updateBarn({
                antallBarn: antall,
                fødselsdatoer: utils.trimFødselsdatoer(antall, this.props.barn.fødselsdatoer),
            })
        );
    }

    render() {
        const { barn, intl, stegProps, dispatch } = this.props;
        return (
            <Steg {...stegProps}>
                <Block>
                    <DatoInput
                        name="foreldreansvar_dato"
                        id="foreldreansvar_dato"
                        label={<Labeltekst intlId="foreldreansvar.overtakelsedato" />}
                        onChange={(foreldreansvarsdato) =>
                            dispatch(
                                søknadActions.updateBarn({
                                    foreldreansvarsdato,
                                })
                            )
                        }
                        dato={barn.foreldreansvarsdato}
                    />
                </Block>

                <Block visible={visibility.antallBarn(barn)}>
                    <AntallBarnBolk
                        spørsmål={intl.formatMessage({
                            id: 'foreldreansvar.antallBarn',
                        })}
                        inputName="foreldreansvar.antallBarn.input"
                        antallBarn={barn.antallBarn}
                        onChange={this.oppdaterAntallBarn}
                    />
                </Block>

                <Block visible={visibility.fødselsdatoer(barn)} margin="none">
                    <FødselsdatoerSpørsmål
                        antallBarn={barn.antallBarn}
                        fødselsdatoer={barn.fødselsdatoer || []}
                        datoavgrensninger={{
                            minDato: DateValues.date15YearsAgo.toDate(),
                        }}
                        onChangeFødselsdato={(fødselsdatoer) =>
                            dispatch(
                                søknadActions.updateBarn({
                                    fødselsdatoer,
                                })
                            )
                        }
                    />
                </Block>

                <Block visible={visibility.harBarnOver15ÅrMelding(barn)} margin="s">
                    <VeilederInfo
                        messages={[
                            {
                                type: 'info',
                                contentIntlKey: 'Barn over 15 år er registrert.',
                            },
                        ]}
                    />
                </Block>

                <Block visible={visibility.vedlegg(barn)}>
                    <VeilederInfo
                        messages={[
                            {
                                type: 'normal',
                                contentIntlKey: 'vedlegg.veileder.omsorgsovertakelse',
                            },
                        ]}
                    />
                    <AttachmentsUploaderPure
                        attachments={barn.adopsjonsvedtak || []}
                        attachmentType={AttachmentType.ADOPSJONSVEDTAK}
                        onFilesSelect={(attachments: Attachment[]) => {
                            attachments.forEach((attachment: Attachment) => {
                                dispatch(søknadActions.uploadAttachment(attachment));
                            });
                        }}
                        onFileDelete={(attachment: Attachment) => dispatch(søknadActions.deleteAttachment(attachment))}
                        skjemanummer={Skjemanummer.DOKUMENTASJON_AV_TERMIN_ELLER_FØDSEL}
                    />
                </Block>
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const barn = state.søknad.barn as Partial<ForeldreansvarBarn>;
    const fødselsdatoerOk = fødselsdatoerErFyltUt(barn.fødselsdatoer);

    const stegProps: StegProps = {
        id: StegID.RELASJON_TIL_BARN_FORELDREANSVAR,
        renderFortsettKnapp: barnErGyldig(state.søknad, props.søkerinfo) && fødselsdatoerOk,
        renderFormTag: true,
        history: props.history,
        isAvailable: isAvailable(StegID.RELASJON_TIL_BARN_FORELDREANSVAR, state.søknad, props.søkerinfo),
        renderAlleSpørsmålMåBesvares: true,
    };

    return {
        barn,
        stegProps,
    };
};

export default connect<StateProps>(mapStateToProps)(injectIntl(RelasjonTilBarnForeldreansvarSteg));
