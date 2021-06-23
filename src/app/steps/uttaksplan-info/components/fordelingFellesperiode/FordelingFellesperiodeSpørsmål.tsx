import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import { Ingress, Normaltekst } from 'nav-frontend-typografi';
import { Block, intlUtils } from '@navikt/fp-common';
import lenker from 'app/links/links';
import RangeInput from './range-input/RangeInput';

import './fordelingFellesperiodeSpørsmål.less';

export interface OwnProps {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    fellesperiodeukerMor: number;
    mor: string;
    farMedmor: string;
    ukerFellesperiode: number;
    annenForelderErFarEllerMedmor: boolean;
    antallUkerFedreKvote: number;
    antallUkerMødreKvote: number;
}

const FordelingFellesperiodeSpørsmål: React.FunctionComponent<OwnProps> = ({
    setFieldValue,
    fellesperiodeukerMor,
    annenForelderErFarEllerMedmor,
    mor,
    farMedmor,
    ukerFellesperiode,
    antallUkerFedreKvote,
    antallUkerMødreKvote,
}) => {
    const intl = useIntl();
    const infotekst = intlUtils(intl, 'uttaksplaninfo.fordeling.veiledning', {
        pakrevdForelder1: antallUkerMødreKvote,
        pakrevdForelder2: antallUkerFedreKvote,
        navnForelder1: mor,
        navnForelder2: farMedmor,
    });
    const annenForeldersNavn = annenForelderErFarEllerMedmor ? farMedmor : mor;
    return (
        <RangeInput
            label={intlUtils(intl, 'uttaksplaninfo.spørsmål.fordeling')}
            hjelpetekst={
                <Normaltekst tag="div">
                    <Block padBottom="l">{infotekst}</Block>
                    <Lenke href={lenker.nav_aktivitetskrav} target="_blank">
                        <FormattedMessage id="uttaksplaninfo.fordeling.veiledning.lenketekst" />
                    </Lenke>
                </Normaltekst>
            }
            hjelpetekstApneLabel={intlUtils(intl, 'uttaksplaninfo.fordeling.veiledning.lenketekst.apneLabel')}
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
                    }
                )
            }
            valueLabelRenderer={(options) => (
                <Ingress tag="p" className="m-text-center fordelingFellesperiode--valgtVerdi">
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
                <Normaltekst className="m-text-center fordelingFellesperiode--bottomContent">
                    <FormattedMessage
                        id="uttaksplaninfo.fordeling.annenForeldersFellesperiode"
                        values={{ annenForeldersNavn, antallUker: options.max - options.value }}
                    />
                </Normaltekst>
            )}
        />
    );
};

export default FordelingFellesperiodeSpørsmål;
