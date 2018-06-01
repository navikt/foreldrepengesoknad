import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { RangeInputValueLabelRendererOptions } from 'common/components/range-input/RangeInput';

export interface Props {
    options: RangeInputValueLabelRendererOptions;
    navnForelder1: string;
    navnForelder2: string;
    introRenderer: () => React.ReactNode;
}

const FordelingFellesperiodeLabelRenderer: React.StatelessComponent<Props> = ({
    options,
    navnForelder1,
    navnForelder2,
    introRenderer
}) => {
    const ukerForelder1 = options.value || 0;
    const ukerForelder2 = options.max - (options.value || 0);
    return (
        <div>
            {introRenderer && introRenderer()}
            <div className="skjema_fordelingFellesperiode">
                <div className="skjema_fordelingFellesperiode__forelder1">
                    <div className="skjema_fordelingFellesperiode__forelderNavn blokk-xxxs">
                        {navnForelder1}
                    </div>
                    <div className="skjema_fordelingFellesperiode__uker">
                        <FormattedMessage
                            id="uttaksplan.skjema.fordeling.uker"
                            values={{
                                uker: ukerForelder1
                            }}
                        />
                    </div>
                </div>
                <div className="skjema_fordelingFellesperiode__forelder2">
                    <div className="skjema_fordelingFellesperiode__forelderNavn  blokk-xxxs">
                        {navnForelder2}
                    </div>
                    <div className="skjema_fordelingFellesperiode__uker">
                        <FormattedMessage
                            id="uttaksplan.skjema.fordeling.uker"
                            values={{
                                uker: ukerForelder2
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FordelingFellesperiodeLabelRenderer;
