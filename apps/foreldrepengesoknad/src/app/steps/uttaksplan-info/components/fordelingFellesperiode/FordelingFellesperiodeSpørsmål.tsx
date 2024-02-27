import { useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { TilgjengeligStønadskonto, intlUtils } from '@navikt/fp-common';
import RangeInput from './range-input/RangeInput';
import { getAntallUkerFellesperiode } from '../../utils/stønadskontoer';
import { BodyShort, Ingress } from '@navikt/ds-react';

import './fordelingFellesperiodeSpørsmål.less';

export interface OwnProps {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    valgtFellesperiodeukerMor: number | undefined;
    mor: string;
    farMedmor: string;
    annenForelderErFarEllerMedmor: boolean;
    valgtStønadskonto: TilgjengeligStønadskonto[] | undefined;
}

const FordelingFellesperiodeSpørsmål: React.FunctionComponent<OwnProps> = ({
    setFieldValue,
    valgtFellesperiodeukerMor,
    annenForelderErFarEllerMedmor,
    mor,
    farMedmor,
    valgtStønadskonto,
}) => {
    const intl = useIntl();

    const fellesperiodeukerMor =
        valgtFellesperiodeukerMor !== undefined || !valgtStønadskonto
            ? valgtFellesperiodeukerMor
            : Math.round((getAntallUkerFellesperiode(valgtStønadskonto) || 0) / 2);

    useEffect(() => {
        setFieldValue('fellesperiodeukerMor', fellesperiodeukerMor);
    }, [setFieldValue, fellesperiodeukerMor]);

    if (!valgtStønadskonto) {
        return null;
    }

    const ukerFellesperiode = Math.floor(getAntallUkerFellesperiode(valgtStønadskonto));

    const annenForeldersNavn = annenForelderErFarEllerMedmor ? farMedmor : mor;
    return (
        <RangeInput
            label={intlUtils(intl, 'uttaksplaninfo.spørsmål.fordeling')}
            ariaLabelText={intlUtils(intl, 'uttaksplaninfo.spørsmål.fordeling')}
            value={fellesperiodeukerMor!}
            min={0}
            max={ukerFellesperiode}
            onChange={(fellesperiodeukerMor) => setFieldValue('fellesperiodeukerMor', fellesperiodeukerMor)}
            steppers={{
                reduceLabel: intl.formatMessage({ id: 'uttaksplaninfo.fordeling.reduser.tooltip' }),
                increaseLabel: intl.formatMessage({ id: 'uttaksplaninfo.fordeling.øk.tooltip' }),
            }}
            ariaValueChangedMessage={(value) =>
                intl.formatMessage(
                    { id: 'uttaksplaninfo.fordeling.valgtVerdi' },
                    {
                        ukerForelder: value,
                        ukerTotalt: ukerFellesperiode,
                        navnForelder: mor || intl.formatMessage({ id: 'uttaksplan.mor' }),
                    },
                )
            }
            valueLabelRenderer={(options) => (
                <Ingress as="p" className="m-text-center fordelingFellesperiode--valgtVerdi">
                    <FormattedMessage
                        id="uttaksplaninfo.fordeling.valgtVerdi"
                        values={{
                            ukerForelder: options.value,
                            ukerTotalt: options.max,
                            navnForelder: mor || intl.formatMessage({ id: 'uttaksplan.mor' }),
                        }}
                    />
                </Ingress>
            )}
            valueLabelPlacement="above"
            bottomContentRenderer={(options) => (
                <BodyShort className="m-text-center fordelingFellesperiode--bottomContent">
                    <FormattedMessage
                        id="uttaksplaninfo.fordeling.annenForeldersFellesperiode"
                        values={{ annenForeldersNavn, antallUker: options.max - options.value }}
                    />
                </BodyShort>
            )}
        />
    );
};

export default FordelingFellesperiodeSpørsmål;
