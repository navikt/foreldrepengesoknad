import * as React from 'react';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import { getFritekstfeltRules } from 'app/util/validation/fritekstfelt';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import { Skjemanummer } from 'app/types/søknad/Søknad';
import { TextareaChangeEvent } from 'common/types/Events';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import Textarea from 'common/components/skjema/wrappers/Textarea';
import throttle from 'lodash.throttle';
import VedleggSpørsmål from 'app/components/skjema/vedleggSpørsmål/VedleggSpørsmål';
import { tilleggsopplysningerMaxLength } from 'app/util/validation/uttaksplan/tilleggsopplysningerValidation';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import UtvidetInformasjon from 'app/components/elementer/utvidetinformasjon/UtvidetInformasjon';

interface OwnProps {
    begrunnelse?: string;
    vedlegg?: Attachment[];
    onBegrunnelseChange: (begrunnelse: string) => void;
    onVedleggChange: (vedlegg: Attachment[]) => void;
}

type Props = OwnProps & InjectedIntlProps;

interface State {
    begrunnelse: string;
}

const getLabel = (intl: InjectedIntl) => {
    return (
        <>
            <Element>{getMessage(intl, 'uttaksplan.tilleggsopplysninger.label')}</Element>
            <UtvidetInformasjon apneLabel="Les mer om hva vi ønsker at du skal gi en forklaring om">
                <div style={{ backgroundColor: '#e9e7e7', padding: '1.5rem' }}>
                    <Block margin="s">
                        <Element>
                            {getMessage(intl, 'uttaksplan.tilleggsopplysninger.sykdomTilbakeITid.overskrift')}
                        </Element>
                        <Normaltekst>
                            {getMessage(intl, 'uttaksplan.tilleggsopplysninger.sykdomTilbakeITid')}
                        </Normaltekst>
                    </Block>
                    <Block margin="s">
                        <Element>{getMessage(intl, 'uttaksplan.tilleggsopplysninger.uttak.overskrift')}</Element>
                        <Normaltekst>{getMessage(intl, 'uttaksplan.tilleggsopplysninger.uttak')}</Normaltekst>
                    </Block>
                    <Block margin="s">
                        <Element>
                            {getMessage(
                                intl,
                                'uttaksplan.tilleggsopplysninger.utsettelsearbeidellergradering.overskrift'
                            )}
                        </Element>
                        <Normaltekst>
                            {getMessage(intl, 'uttaksplan.tilleggsopplysninger.utsettelsearbeidellergradering')}
                        </Normaltekst>
                    </Block>
                    <Element>{getMessage(intl, 'uttaksplan.tilleggsopplysninger.sykdom.overskrift')}</Element>
                    <Normaltekst>{getMessage(intl, 'uttaksplan.tilleggsopplysninger.sykdom')}</Normaltekst>
                </div>
            </UtvidetInformasjon>
        </>
    );
};

class OppgiTilleggsopplysninger extends React.Component<Props, State> {
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
        const { vedlegg, intl, onVedleggChange } = this.props;

        return (
            <div className="blokk-m">
                <Block margin="s">
                    <Textarea
                        value={this.state.begrunnelse}
                        maxLength={tilleggsopplysningerMaxLength}
                        validators={getFritekstfeltRules(
                            { maxLength: tilleggsopplysningerMaxLength },
                            intl,
                            this.state.begrunnelse
                        )}
                        name="begrunnelseForSenEndring"
                        label={getLabel(intl)}
                        onChange={this.handleBegrunnelseChange}
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

export default injectIntl(OppgiTilleggsopplysninger);
