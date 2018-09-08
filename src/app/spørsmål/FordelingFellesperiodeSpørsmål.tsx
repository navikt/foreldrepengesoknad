import * as React from 'react';
import RangeInput from 'common/components/skjema/elements/range-input/RangeInput';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import { Ingress, Element } from 'nav-frontend-typografi';

export interface Props {
    navnForelder1?: string;
    navnForelder2?: string;
    ukerForelder1: number;
    ukerFellesperiode: number;
    introRenderer?: () => React.ReactNode;
    onChange: (dager: number) => void;
}

const FordelingFellesperiodeSpørsmål: React.StatelessComponent<Props & InjectedIntlProps> = ({
    navnForelder1,
    navnForelder2,
    ukerForelder1,
    ukerFellesperiode,
    onChange,
    intl
}) => (
    <RangeInput
        label={<Element tag="div">Hvor mange uker ønsker du å ta av fellesperioden</Element>}
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
                    navn: navnForelder1 || intl.formatMessage({ id: 'uttaksplan.forelder1' })
                }
            ),
            increaseLabel: intl.formatMessage(
                { id: 'uttaksplan.skjema.fordeling.reduser.tooltip' },
                {
                    navn: navnForelder2 || intl.formatMessage({ id: 'uttaksplan.forelder2' })
                }
            )
        }}
        ariaValueChangedMessage={(value) =>
            intl.formatMessage(
                { id: 'uttaksplan.skjema.fordeling.valgtVerdi' },
                {
                    ukerForelder: value,
                    ukerTpotalt: ukerFellesperiode,
                    navnForelder: navnForelder1 || intl.formatMessage({ id: 'uttaksplan.forelder1' })
                }
            )
        }
        valueLabelRenderer={(options) => (
            <Ingress tag="p" className="m-text-center">
                <FormattedMessage
                    id="uttaksplan.skjema.fordeling.valgtVerdi"
                    values={{
                        ukerForelder: options.value,
                        ukerTotalt: options.max,
                        navnForelder: navnForelder1 || intl.formatMessage({ id: 'uttaksplan.forelder1' })
                    }}
                />
            </Ingress>
        )}
    />
);

export default injectIntl(FordelingFellesperiodeSpørsmål);
