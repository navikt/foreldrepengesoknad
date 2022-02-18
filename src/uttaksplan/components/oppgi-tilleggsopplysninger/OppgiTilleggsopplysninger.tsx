import React from 'react';

import throttle from 'lodash.throttle';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { injectIntl, IntlShape } from 'react-intl';
import { Block, intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import { tilleggsopplysningerMaxLength } from 'uttaksplan/validering/tester/erTilleggsopplysningerGyldigTest';
import { Textarea } from 'nav-frontend-skjema';

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
            </div>
        );
    }
}

export default injectIntl(OppgiTilleggsopplysninger);
