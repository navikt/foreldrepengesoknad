import * as React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import stegConfig, {
    StegIDConfig,
    StegID,
    StegConfig
} from '../../util/routing/stegConfig';
import { StegindikatorStegProps } from '../../../../node_modules/nav-frontend-stegindikator/lib/stegindikator-steg';
import './stegHeader.less';

interface Props {
    id: StegID;
}

class StepIndicator extends React.Component<Props> {
    title: HTMLElement | null;
    componentDidMount() {
        if (this.title != null) {
            this.title.focus();
        }
    }

    buildStegindikatorSteg(config: StegConfig) {
        return Object.values(config)
            .reduce((x: StegIDConfig[], y: StegIDConfig) => {
                if (!x.find((j) => j.index === y.index)) {
                    x.push(y);
                }
                return x;
            }, [])
            .map((stegConfigItem) => ({
                label: stegConfigItem.tittel,
                index: stegConfigItem.index
            }));
    }

    getStegindikatorProps(): StegindikatorStegProps[] {
        return Object.values(stegConfig).map((config, index) => ({
            label: config[0].tittel,
            index: config.index
        }));
    }

    render() {
        const { id } = this.props;
        const steg = this.buildStegindikatorSteg(stegConfig);
        const aktivtSteg = stegConfig[id].index;
        return (
            <div
                className="stepindicator"
                role="progressbar"
                aria-valuenow={aktivtSteg}
                aria-valuemin={1}
                aria-valuemax={steg.length}>
                <h1 className="typo-systemtittel stepindicator__title">
                    <span
                        className="m_no-focusOutline"
                        ref={(c) => (this.title = c)}
                        tabIndex={-1}>
                        {stegConfig[id].tittel}
                    </span>
                </h1>
                <Stegindikator
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

export default StepIndicator;
