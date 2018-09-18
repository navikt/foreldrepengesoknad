import * as React from 'react';
import RangeInput from 'common/components/skjema/elements/range-input/RangeInput';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import { Ingress, Element } from 'nav-frontend-typografi';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';

export interface OwnProps {
    navnMor?: string;
    navnFarMedmor?: string;
    ukerFellesperiode: number;
}

const FordelingFellesperiodeSpørsmål: React.StatelessComponent<
    OwnProps & UttaksplanSkjemaspørsmålProps & InjectedIntlProps
> = ({ visible, navnMor, navnFarMedmor, ukerFellesperiode, intl }) => (
    <UttaksplanSkjemaSpørsmål
        visible={visible}
        render={(data, onChange) => (
            <RangeInput
                label={<Element tag="div">Hvor mange uker ønsker du å ta av fellesperioden</Element>}
                ariaDescription={intl.formatMessage(
                    { id: 'uttaksplan.skjema.fordeling.aria.fordeling' },
                    {
                        navnMor,
                        ukerFellesperiode
                    }
                )}
                value={data.fellesperiodeukerMor!}
                min={0}
                max={ukerFellesperiode}
                onChange={(fellesperiodeukerMor) => onChange({ fellesperiodeukerMor })}
                steppers={{
                    reduceLabel: intl.formatMessage(
                        { id: 'uttaksplan.skjema.fordeling.reduser.tooltip' },
                        {
                            navn: navnMor || intl.formatMessage({ id: 'uttaksplan.mor' })
                        }
                    ),
                    increaseLabel: intl.formatMessage(
                        { id: 'uttaksplan.skjema.fordeling.reduser.tooltip' },
                        {
                            navn: navnFarMedmor || intl.formatMessage({ id: 'uttaksplan.farMedmor' })
                        }
                    )
                }}
                ariaValueChangedMessage={(value) =>
                    intl.formatMessage(
                        { id: 'uttaksplan.skjema.fordeling.valgtVerdi' },
                        {
                            ukerForelder: value,
                            ukerTotalt: ukerFellesperiode,
                            navnForelder: navnMor || intl.formatMessage({ id: 'uttaksplan.mor' })
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
                                navnForelder: navnMor || intl.formatMessage({ id: 'uttaksplan.mor' })
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
