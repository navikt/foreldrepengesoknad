import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, IntlShape } from 'react-intl';

import { StegID } from '../../../util/routing/stegConfig';
import Steg from 'app/components/applikasjon/steg/Steg';

import { DispatchProps } from 'common/redux/types';
import { AppState } from '../../../redux/reducers';
import Block from 'common/components/block/Block';
import AntallBarnBolk from '../components/AntallBarnBolk';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import FødselsdatoerSpørsmål from '../../../spørsmål/FødselsdatoerSpørsmål';
import Labeltekst from 'common/components/labeltekst/Labeltekst';

import utils from '../../../util/domain/fødselsdato';
import { ForeldreansvarBarn } from '../../../types/søknad/Barn';
import { HistoryProps } from '../../../types/common';
import { StegProps } from '../../../components/applikasjon/steg/Steg';
import AttachmentsUploaderPure from 'app/components/storage/attachment/components/AttachmentUploaderPure';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import isAvailable from '../../../util/steg/isAvailable';
import { barnErGyldig } from '../../../util/validation/steg/barn';
import { Skjemanummer } from '../../../types/søknad/Søknad';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import DateValues from '../../../util/validation/values';
import { fødselsdatoerErFyltUt } from '../../../util/validation/fødselsdato';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import visibility from './visibility';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import VeilederInfo from '../../../components/veilederInfo/VeilederInfo';

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
                        inputId="foreldreansvar_dato"
                        label={<Labeltekst intlId="foreldreansvar.overtakelsedato" />}
                        onChange={(dato: Date) =>
                            dispatch(
                                søknadActions.updateBarn({
                                    foreldreansvarsdato: dato,
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
                        onChangeFødselsdato={(fødselsdatoer: Date[]) =>
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
    };

    return {
        barn,
        stegProps,
    };
};

export default connect<StateProps>(mapStateToProps)(injectIntl(RelasjonTilBarnForeldreansvarSteg));
