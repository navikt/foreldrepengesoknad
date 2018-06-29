import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import RangeInput from 'common/components/range-input/RangeInput';
import { Infotekster } from 'uttaksplan/redux/reducers/viewReducer';
import Sporsmal from 'uttaksplan/components/sporsmal/Sporsmal';
import FordelingFellesperiodeLabelRenderer from './fordelingFellesperiode/FordelingFellesperiodeLabelRenderer';

export interface OwnProps {
    navnForelder1?: string;
    navnForelder2?: string;
    ukerForelder1: number;
    ukerFellesperiode: number;
    introRenderer: () => React.ReactNode;
    onChange: (dager: number) => void;
}

const FordelingFellesperiodeSpørsmål: React.StatelessComponent<
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
                        id: 'uttaksplan.skjema.fordeling.sporsmal.ikonlabel'
                    })
                }}>
                <FormattedMessage id="uttaksplan.skjema.fordeling.sporsmal" />
            </Sporsmal>
        }
        ariaDescription={intl.formatMessage(
            { id: 'uttaksplan.skjema.fordeling.aria.fordeling' },
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
                { id: 'uttaksplan.skjema.fordeling.reduser.tooltip' },
                {
                    navn:
                        navnForelder1 ||
                        intl.formatMessage({ id: 'uttaksplan.forelder1' })
                }
            ),
            increaseLabel: intl.formatMessage(
                { id: 'uttaksplan.skjema.fordeling.reduser.tooltip' },
                {
                    navn:
                        navnForelder2 ||
                        intl.formatMessage({ id: 'uttaksplan.forelder2' })
                }
            )
        }}
        ariaValueChangedMessage={(value) =>
            intl.formatMessage(
                { id: 'uttaksplan.skjermleser.fordeling_av_fellesperiode' },
                {
                    ukerForelder1: value,
                    ukerForelder2: ukerFellesperiode - value,
                    navnForelder1:
                        navnForelder1 ||
                        intl.formatMessage({ id: 'uttaksplan.forelder1' }),
                    navnForelder2:
                        navnForelder2 ||
                        intl.formatMessage({ id: 'uttaksplan.forelder2' })
                }
            )
        }
        valueLabelRenderer={(options) => (
            <FordelingFellesperiodeLabelRenderer
                options={options}
                navnForelder1={
                    navnForelder1 ||
                    intl.formatMessage({ id: 'uttaksplan.Forelder1' })
                }
                navnForelder2={
                    navnForelder2 ||
                    intl.formatMessage({ id: 'uttaksplan.Forelder2' })
                }
                introRenderer={introRenderer}
            />
        )}
    />
);

export default injectIntl(FordelingFellesperiodeSpørsmål);
