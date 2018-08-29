import * as React from 'react';
import { default as NavStegindikator } from 'nav-frontend-stegindikator';
import stegConfig, { StegConfigItem, StegID, StegConfig } from '../../util/routing/stegConfig';
import './stegindikator.less';
import BEMHelper from 'common/util/bem';

interface Props {
    id: StegID;
}

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
                label: stegConfigItem.tittel,
                index: stegConfigItem.index
            }));
    }

    render() {
        const { id } = this.props;
        const steg = this.buildStegindikatorSteg(stegConfig);
        const aktivtSteg = stegConfig[id].index;
        const bem = BEMHelper('stegindikator');
        return (
            <div
                className={bem.className}
                role="progressbar"
                aria-valuenow={aktivtSteg}
                aria-valuemin={1}
                aria-valuemax={steg.length}>
                <h1 className={`typo-systemtittel ${bem.element('title')}`}>
                    <span className="m_no-focusOutline" ref={(c) => (this.title = c)} tabIndex={-1}>
                        {stegConfig[id].tittel}
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

export default Stegindikator;
