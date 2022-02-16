import React from 'react';

import throttle from 'lodash.throttle';
import { Element, Normaltekst } from 'nav-frontend-typografi';
// import { Attachment as AttachmentType } from 'app/types/Attachment';
import { injectIntl, IntlShape } from 'react-intl';
// import Attachment from 'app/components/attachment/Attachment';
import { Block, intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import { tilleggsopplysningerMaxLength } from 'uttaksplan/validering/tester/erTilleggsopplysningerGyldigTest';
// import { AttachmentType as AttachmentTypeEnum } from 'pp/types/AttachmentType';
// import { Skjemanummer } from 'app/types/Skjemanummer';
import { Textarea } from 'nav-frontend-skjema';
// import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
// import { AttachmentType, AttachmentType } from 'app/types/AttachmentType';
// import { Skjemanummer } from 'app/types/Skjemanummer';
// import { AttachmentType } from 'app/types/AttachmentType';
import { Attachment } from 'app/types/Attachment';

interface OwnProps {
    begrunnelse?: string;
    vedlegg?: Attachment[];
    onBegrunnelseChange: (begrunnelse: string) => void;
    //onVedleggChange: (vedlegg: AttachmentType[]) => void;
    intl: IntlShape;
}

type Props = OwnProps;

interface State {
    begrunnelse: string;
}

const getLabel = (intl: IntlShape) => {
    return (
        <>
            <Element>{intlUtils(intl, 'uttaksplan.tilleggsopplysninger.label')}</Element>
            <UtvidetInformasjon apneLabel={intlUtils(intl, 'uttaksplan.tilleggsopplysninger.apneLabel')}>
                <div style={{ backgroundColor: '#e9e7e7', padding: '1.5rem' }}>
                    <Block margin="s">
                        <Element>
                            {intlUtils(intl, 'uttaksplan.tilleggsopplysninger.sykdomTilbakeITid.overskrift')}
                        </Element>
                        <Normaltekst>
                            {intlUtils(intl, 'uttaksplan.tilleggsopplysninger.sykdomTilbakeITid')}
                        </Normaltekst>
                    </Block>
                    <Block margin="s">
                        <Element>{intlUtils(intl, 'uttaksplan.tilleggsopplysninger.uttak.overskrift')}</Element>
                        <Normaltekst>{intlUtils(intl, 'uttaksplan.tilleggsopplysninger.uttak')}</Normaltekst>
                    </Block>
                    <Block margin="s">
                        <Element>
                            {intlUtils(
                                intl,
                                'uttaksplan.tilleggsopplysninger.utsettelsearbeidellergradering.overskrift'
                            )}
                        </Element>
                        <Normaltekst>
                            {intlUtils(intl, 'uttaksplan.tilleggsopplysninger.utsettelsearbeidellergradering')}
                        </Normaltekst>
                    </Block>
                    <Element>{intlUtils(intl, 'uttaksplan.tilleggsopplysninger.sykdom.overskrift')}</Element>
                    <Normaltekst>{intlUtils(intl, 'uttaksplan.tilleggsopplysninger.sykdom')}</Normaltekst>
                </div>
            </UtvidetInformasjon>
        </>
    );
};

export type TextareaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

class OppgiTilleggsopplysninger extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            begrunnelse: this.props.begrunnelse || '',
        };

        this.throttledOnChange = throttle(this.throttledOnChange, 2000);
    }

    throttledOnChange = () => {
        this.props.onBegrunnelseChange(this.state.begrunnelse);
    };

    handleBegrunnelseChange = (e: TextareaChangeEvent) => {
        this.setState(
            {
                begrunnelse: e.target.value,
            },
            this.throttledOnChange
        );
    };

    render() {
        // const { vedlegg, intl, onVedleggChange } = this.props;
        const { intl } = this.props;

        return (
            <div className="blokk-m">
                <Block margin="l">
                    <Textarea
                        value={this.state.begrunnelse}
                        maxLength={tilleggsopplysningerMaxLength}
                        name="begrunnelseForSenEndring"
                        label={getLabel(intl)}
                        onChange={this.handleBegrunnelseChange}
                    />
                </Block>
                {/* <Block>
                    <FormikFileUploader
                        label={intlUtils(intl, 'vedlegg.lastoppknapp.senEndring')}
                        name={'vedleggForSenEndring'}
                        attachments={vedlegg || []}
                        attachmentType={AttachmentType.SEN_ENDRING}
                        skjemanummer={Skjemanummer.DOK_BEGRUNNELSE_SØKE_TILBAKE_I_TID}
                    />
                </Block> */}
                {/* <VedleggSpørsmål
                    vedlegg={vedlegg || []}
                    attachmentType={AttachmentType.SEN_ENDRING}
                    onChange={(endredeVedlegg: Attachment[]) => {
                        onVedleggChange(endredeVedlegg);
                    }}
                    skjemanummer={Skjemanummer.DOK_BEGRUNNELSE_SØKE_TILBAKE_I_TID}
                /> */}
            </div>
        );
    }
}

export default injectIntl(OppgiTilleggsopplysninger);
