import * as React from 'react';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import { getFritekstfeltRules } from 'app/util/validation/fritekstfelt';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { SenEndringÅrsak } from 'app/types/uttaksplan/periodetyper';
import { Skjemanummer } from 'app/types/søknad/Søknad';
import { TextareaChangeEvent } from 'common/types/Events';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import Textarea from 'common/components/skjema/wrappers/Textarea';
import throttle from 'lodash.throttle';
import VedleggSpørsmål from 'app/components/skjema/vedleggSpørsmål/VedleggSpørsmål';
import { begrunnelseSenEndringMaxLength } from 'app/util/validation/uttaksplan/begrunnelseForSenEndringValidation';

interface OwnProps {
    årsak: SenEndringÅrsak;
    begrunnelse?: string;
    vedlegg?: Attachment[];
    onBegrunnelseChange: (begrunnelse: string) => void;
    onVedleggChange: (vedlegg: Attachment[]) => void;
}

type Props = OwnProps & InjectedIntlProps;

interface State {
    begrunnelse: string;
}

class BegrunnelseForSenEndring extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            begrunnelse: this.props.begrunnelse || ''
        };

        this.throttledOnChange = throttle(this.throttledOnChange, 2000);
    }

    throttledOnChange = () => {
        this.props.onBegrunnelseChange(this.state.begrunnelse);
    };

    handleBegrunnelseChange = (e: TextareaChangeEvent) => {
        this.setState(
            {
                begrunnelse: e.target.value
            },
            this.throttledOnChange
        );
    };

    render() {
        const { vedlegg, intl, årsak, onVedleggChange } = this.props;

        const infotekst = `uttaksplan.senEndring.veileder.${årsak}`;
        const begrunnelseLabel = `uttaksplan.senEndring.begrunnelse.${årsak}`;

        return (
            <div className="blokk-m">
                <Block margin="s">
                    <Textarea
                        value={this.state.begrunnelse}
                        maxLength={begrunnelseSenEndringMaxLength}
                        validators={getFritekstfeltRules(
                            { maxLength: begrunnelseSenEndringMaxLength },
                            intl,
                            this.state.begrunnelse
                        )}
                        name="begrunnelseForSenEndring"
                        label={getMessage(intl, begrunnelseLabel)}
                        onChange={this.handleBegrunnelseChange}
                        infotekst={getMessage(intl, infotekst)}
                    />
                </Block>
                <VedleggSpørsmål
                    vedlegg={vedlegg || []}
                    attachmentType={AttachmentType.SEN_ENDRING}
                    onChange={(endredeVedlegg: Attachment[]) => {
                        onVedleggChange(endredeVedlegg);
                    }}
                    skjemanummer={Skjemanummer.DOK_BEGRUNNELSE_SØKE_TILBAKE_I_TID}
                />
            </div>
        );
    }
}

export default injectIntl(BegrunnelseForSenEndring);
