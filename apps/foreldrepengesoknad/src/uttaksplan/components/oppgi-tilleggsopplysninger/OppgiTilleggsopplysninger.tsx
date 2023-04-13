import React from 'react';

import throttle from 'lodash.throttle';
import { injectIntl, IntlShape } from 'react-intl';
import { Block, intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import { tilleggsopplysningerMaxLength } from 'uttaksplan/validering/tester/erTilleggsopplysningerGyldigTest';
import { Attachment } from 'app/types/Attachment';
import { BodyLong, Label, Textarea } from '@navikt/ds-react';

interface OwnProps {
    begrunnelse?: string;
    vedlegg?: Attachment[];
    onBegrunnelseTekstChange: (begrunnelse: string) => void;
    intl: IntlShape;
}

type Props = OwnProps;

interface State {
    begrunnelse: string;
}

const getLabel = (intl: IntlShape) => {
    return (
        <>
            <Label>{intlUtils(intl, 'uttaksplan.tilleggsopplysninger.label')}</Label>
            <UtvidetInformasjon apneLabel={intlUtils(intl, 'uttaksplan.tilleggsopplysninger.apneLabel')}>
                <div style={{ backgroundColor: '#e9e7e7', padding: '1.5rem' }}>
                    <Block margin="s">
                        <Label>{intlUtils(intl, 'uttaksplan.tilleggsopplysninger.sykdomTilbakeITid.overskrift')}</Label>
                        <BodyLong>{intlUtils(intl, 'uttaksplan.tilleggsopplysninger.sykdomTilbakeITid')}</BodyLong>
                    </Block>
                    <Block margin="s">
                        <Label>{intlUtils(intl, 'uttaksplan.tilleggsopplysninger.uttak.overskrift')}</Label>
                        <BodyLong>{intlUtils(intl, 'uttaksplan.tilleggsopplysninger.uttak')}</BodyLong>
                    </Block>
                    <Block margin="s">
                        <Label>
                            {intlUtils(
                                intl,
                                'uttaksplan.tilleggsopplysninger.utsettelsearbeidellergradering.overskrift'
                            )}
                        </Label>
                        <BodyLong>
                            {intlUtils(intl, 'uttaksplan.tilleggsopplysninger.utsettelsearbeidellergradering')}
                        </BodyLong>
                    </Block>
                    <Label>{intlUtils(intl, 'uttaksplan.tilleggsopplysninger.sykdom.overskrift')}</Label>
                    <BodyLong>{intlUtils(intl, 'uttaksplan.tilleggsopplysninger.sykdom')}</BodyLong>
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
        this.props.onBegrunnelseTekstChange(this.state.begrunnelse);
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
                <Block padBottom="l">
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
