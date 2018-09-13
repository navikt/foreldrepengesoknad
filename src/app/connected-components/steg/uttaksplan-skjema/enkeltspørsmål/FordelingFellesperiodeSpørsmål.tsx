import * as React from 'react';
import RangeInput from 'common/components/skjema/elements/range-input/RangeInput';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import { Ingress, Element } from 'nav-frontend-typografi';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';

export interface OwnProps {
    navnForelder1?: string;
    navnForelder2?: string;
    ukerFellesperiode: number;
}

const FordelingFellesperiodeSpørsmål: React.StatelessComponent<
    OwnProps & UttaksplanSkjemaspørsmålProps & InjectedIntlProps
> = ({ visible, navnForelder1, navnForelder2, ukerFellesperiode, intl }) => (
    <UttaksplanSkjemaSpørsmål
        visible={visible}
        render={(data, onChange) => (
            <RangeInput
                label={<Element tag="div">Hvor mange uker ønsker du å ta av fellesperioden</Element>}
                ariaDescription={intl.formatMessage(
                    { id: 'uttaksplan.skjema.fordeling.aria.fordeling' },
                    {
                        navnForelder1,
                        ukerFellesperiode
                    }
                )}
                value={data.fellesperiodeukerForelder1!}
                min={0}
                max={ukerFellesperiode}
                onChange={(fellesperiodeukerForelder1) => onChange({ fellesperiodeukerForelder1 })}
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
                            ukerTotalt: ukerFellesperiode,
                            navnForelder: navnForelder1 || intl.formatMessage({ id: 'uttaksplan.forelder1' })
                        }
                    )
                }
                valueLabelRenderer={(options) => (
                    <Ingress tag="p" className="m-text-center fordelingFellesperiode-valgtVerdi">
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
                valueLabelPlacement="below"
            />
        )}
    />
);

export default injectIntl(FordelingFellesperiodeSpørsmål);
