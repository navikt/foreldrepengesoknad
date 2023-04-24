import { useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { Block, intlUtils } from '@navikt/fp-common';
import lenker from 'app/links/links';
import RangeInput from './range-input/RangeInput';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import {
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerMødrekvote,
} from '../../utils/stønadskontoer';
import { BodyShort, Ingress, Link } from '@navikt/ds-react';

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
    const antallUkerFedreKvote = getAntallUkerFedrekvote(valgtStønadskonto);
    const antallUkerMødreKvote = getAntallUkerMødrekvote(valgtStønadskonto);

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
                <BodyShort as="div">
                    <Block padBottom="l">{infotekst}</Block>
                    <Link href={lenker.nav_aktivitetskrav} target="_blank">
                        <FormattedMessage id="uttaksplaninfo.fordeling.veiledning.lenketekst" />
                    </Link>
                </BodyShort>
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
