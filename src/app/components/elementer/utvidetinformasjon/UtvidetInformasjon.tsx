import * as React from 'react';
import { guid } from 'nav-frontend-js-utils';

import InfoToggler from './InfoToggler';
import './utvidetInformasjon.less';
import EkspanderbartInnhold from './EkspanderbartInnhold';
import { Normaltekst } from 'nav-frontend-typografi';
import { injectIntl, IntlShape } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import BEMHelper from 'common/util/bem';

interface OwnProps {
    children: React.ReactNode;
    erApen?: boolean;
    apneLabel?: React.ReactNode;
    lukkLabel?: React.ReactNode;
    intl: IntlShape;
    description?: boolean;
}

type Props = OwnProps;

interface State {
    apen: boolean;
}

class UtvidetInformasjon extends React.Component<Props, State> {
    innholdId: string;

    constructor(props: Props) {
        super(props);
        this.innholdId = guid();
        this.state = {
            apen: props.erApen || false,
        };
    }
    render() {
        const {
            lukkLabel = getMessage(this.props.intl, 'utvidetInformasjon.lukkTekst'),
            description = false,
        } = this.props;

        const bem = description ? BEMHelper('utvidetInformasjonDescription') : BEMHelper('utvidetInformasjon');

        return (
            <div className={bem.block}>
                <div className={`${bem.element('toggler')} no-print`}>
                    <InfoToggler onToggle={() => this.setState({ apen: !this.state.apen })} apen={this.state.apen}>
                        <Normaltekst tag="span">{this.state.apen ? lukkLabel : this.props.apneLabel}</Normaltekst>
                    </InfoToggler>
                </div>
                <div className={bem.element('innhold')} id={this.innholdId}>
                    <EkspanderbartInnhold erApen={this.state.apen}>{this.props.children}</EkspanderbartInnhold>

                    <div className="print-only">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default injectIntl(UtvidetInformasjon);
