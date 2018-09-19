import * as React from 'react';
import RangeInput from 'common/components/skjema/elements/range-input/RangeInput';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import { Ingress, Element } from 'nav-frontend-typografi';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import { NavnPåForeldre } from 'common/types';

export interface OwnProps {
    navnPåForeldre: NavnPåForeldre;
    ukerFellesperiode: number;
}

const FordelingFellesperiodeSpørsmål: React.StatelessComponent<
    OwnProps & UttaksplanSkjemaspørsmålProps & InjectedIntlProps
> = ({ visible, navnPåForeldre, ukerFellesperiode, intl }) => (
    <UttaksplanSkjemaSpørsmål
        visible={visible}
        render={(data, onChange) => (
            <RangeInput
                label={<Element tag="div">Hvor mange uker ønsker du å ta av fellesperioden</Element>}
                ariaDescription={intl.formatMessage(
                    { id: 'uttaksplan.skjema.fordeling.aria.fordeling' },
                    {
                        navnMor: navnPåForeldre.mor,
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
                            navn: navnPåForeldre.mor || intl.formatMessage({ id: 'uttaksplan.mor' })
                        }
                    ),
                    increaseLabel: intl.formatMessage(
                        { id: 'uttaksplan.skjema.fordeling.reduser.tooltip' },
                        {
                            navn: navnPåForeldre.farMedmor || intl.formatMessage({ id: 'uttaksplan.farMedmor' })
                        }
                    )
                }}
                ariaValueChangedMessage={(value) =>
                    intl.formatMessage(
                        { id: 'uttaksplan.skjema.fordeling.valgtVerdi' },
                        {
                            ukerForelder: value,
                            ukerTotalt: ukerFellesperiode,
                            navnForelder: navnPåForeldre.mor || intl.formatMessage({ id: 'uttaksplan.mor' })
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
                                navnForelder: navnPåForeldre.mor || intl.formatMessage({ id: 'uttaksplan.mor' })
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
