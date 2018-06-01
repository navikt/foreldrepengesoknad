import * as React from 'react';
import * as classnames from 'classnames';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { guid } from 'nav-frontend-js-utils';

import InfoToggler from '../utvidetInformasjon/InfoToggler';

import './utvidetInformasjon.less';
import EkspanderbartInnhold from 'common/components/ekspanderbart-innhold/EkspanderbartInnhold';

interface OwnProps {
    children: React.ReactNode;
    erApen?: boolean;
    apneLabel?: string;
    lukkLabel?: string;
}

interface State {
    apen: boolean;
}

type Props = OwnProps & InjectedIntlProps;

class UtvidetInformasjon extends React.Component<Props, State> {
    innholdId: string;

    constructor(props: Props) {
        super(props);
        this.innholdId = guid();
        this.state = {
            apen: props.erApen || false
        };
    }
    render() {
        const cls = classnames('utvidetInformasjon', {
            'utvidetInformasjon--apen': this.state.apen
        });
        const { intl } = this.props;

        const {
            apneLabel = intl.formatMessage({
                id: 'uttaksplan.utvidetinfo.lesmer'
            }),
            lukkLabel = intl.formatMessage({
                id: 'uttaksplan.utvidetinfo.lukk'
            })
        } = this.props;
        return (
            <div className={cls}>
                <div className="utvidetInformasjon__toggler no-print">
                    <InfoToggler
                        onToggle={() =>
                            this.setState({ apen: !this.state.apen })
                        }
                        apen={this.state.apen}>
                        {this.state.apen ? lukkLabel : apneLabel}
                    </InfoToggler>
                </div>
                <div
                    className="utvidetInformasjon__innhold"
                    id={this.innholdId}>
                    <EkspanderbartInnhold erApen={this.state.apen}>
                        {' '}
                        {this.props.children}
                    </EkspanderbartInnhold>

                    <div className="print-only">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default injectIntl(UtvidetInformasjon);
