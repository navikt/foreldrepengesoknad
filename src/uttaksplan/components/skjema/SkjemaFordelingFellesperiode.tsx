import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import RangeInput from 'uttaksplan/elements/rangeInput/RangeInput';
import FordelingFellesperiodeLabelRenderer from 'uttaksplan/components/skjema/FordelingFellesperiodeLabelRenderer';
import { Infotekster } from 'uttaksplan/redux/reducers/viewReducer';
import Sporsmal from 'uttaksplan/components/sporsmal/Sporsmal';

export interface OwnProps {
    navnForelder1?: string;
    navnForelder2?: string;
    ukerForelder1: number;
    ukerFellesperiode: number;
    introRenderer: () => React.ReactNode;
    onChange: (dager: number) => void;
}

const FordelingFellesperiode: React.StatelessComponent<
    OwnProps & InjectedIntlProps
> = ({
    navnForelder1,
    navnForelder2,
    ukerForelder1,
    ukerFellesperiode,
    introRenderer,
    onChange,
    intl
}) => (
    <RangeInput
        label={
            <Sporsmal
                info={{
                    id: Infotekster.fordelingFellesperiode,
                    label: intl.formatMessage({
                        id: 'skjema.fordeling.sporsmal.ikonlabel'
                    })
                }}>
                <FormattedMessage id="skjema.fordeling.sporsmal" />
            </Sporsmal>
        }
        ariaDescription={intl.formatMessage(
            { id: 'skjema.fordeling.aria.fordeling' },
            {
                navnForelder1,
                ukerFellesperiode
            }
        )}
        value={ukerForelder1}
        min={0}
        max={ukerFellesperiode}
        onChange={onChange}
        steppers={{
            reduceLabel: intl.formatMessage(
                { id: 'skjema.fordeling.reduser.tooltip' },
                {
                    navn:
                        navnForelder1 || intl.formatMessage({ id: 'forelder1' })
                }
            ),
            increaseLabel: intl.formatMessage(
                { id: 'skjema.fordeling.reduser.tooltip' },
                {
                    navn:
                        navnForelder2 || intl.formatMessage({ id: 'forelder2' })
                }
            )
        }}
        ariaValueChangedMessage={(value) =>
            intl.formatMessage(
                { id: 'skjermleser.fordeling_av_fellesperiode' },
                {
                    ukerForelder1: value,
                    ukerForelder2: ukerFellesperiode - value,
                    navnForelder1:
                        navnForelder1 ||
                        intl.formatMessage({ id: 'forelder1' }),
                    navnForelder2:
                        navnForelder2 || intl.formatMessage({ id: 'forelder2' })
                }
            )
        }
        valueLabelRenderer={(options) => (
            <FordelingFellesperiodeLabelRenderer
                options={options}
                navnForelder1={
                    navnForelder1 || intl.formatMessage({ id: 'Forelder1' })
                }
                navnForelder2={
                    navnForelder2 || intl.formatMessage({ id: 'Forelder2' })
                }
                introRenderer={introRenderer}
            />
        )}
    />
);

export default injectIntl(FordelingFellesperiode);
