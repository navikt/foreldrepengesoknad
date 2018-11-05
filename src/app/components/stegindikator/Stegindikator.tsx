import * as React from 'react';
import { default as NavStegindikator } from 'nav-frontend-stegindikator';
import stegConfig, { StegConfigItem, StegID, StegConfig } from '../../util/routing/stegConfig';
import getMessage from 'common/util/i18nUtils';
import './stegindikator.less';
import BEMHelper from 'common/util/bem';
import { injectIntl, InjectedIntlProps } from 'react-intl';

interface StegProps {
    id: StegID;
}

type Props = StegProps & InjectedIntlProps;

class Stegindikator extends React.Component<Props> {
    title: HTMLElement | null;
    componentDidMount() {
        if (this.title != null) {
            this.title.focus();
        }
    }

    buildStegindikatorSteg(config: StegConfig) {
        return Object.values(config)
            .reduce((stegConfigList: StegConfigItem[], stegConfigItem: StegConfigItem) => {
                if (!stegConfigList.some((stegListElement) => stegListElement.index === stegConfigItem.index)) {
                    stegConfigList.push(stegConfigItem);
                }
                return stegConfigList;
            }, [])
            .map((stegConfigItem) => ({
                label: getMessage(this.props.intl, stegConfigItem.tittel),
                index: stegConfigItem.index
            }));
    }

    render() {
        const { id, intl } = this.props;
        const steg = this.buildStegindikatorSteg(stegConfig);
        const aktivtSteg = stegConfig[id].index;
        const bem = BEMHelper('stegindikator');
        return (
            <div
                className={bem.className}
                role="progressbar"
                aria-valuenow={aktivtSteg + 1}
                aria-valuemin={1}
                aria-valuemax={steg.length}
                aria-label={getMessage(intl, stegConfig[id].tittel)}>
                <h1 className={`typo-systemtittel ${bem.element('title')}`}>
                    <span className="m_no-focusOutline" ref={(c) => (this.title = c)} tabIndex={-1}>
                        {getMessage(intl, stegConfig[id].tittel)}
                    </span>
                </h1>
                <NavStegindikator
                    visLabel={false}
                    kompakt={true}
                    autoResponsiv={true}
                    aktivtSteg={aktivtSteg}
                    steg={steg}
                />
            </div>
        );
    }
}

export default injectIntl(Stegindikator);
