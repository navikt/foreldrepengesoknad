import { formatDate, intlUtils } from '@navikt/fp-common';
import Barn, { BarnType, isAdoptertAnnetBarn, isAdoptertStebarn, isUfødtBarn } from 'app/context/types/Barn';
import React, { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import BarnAdoptertIUtlandetDetaljer from './BarnAdoptertIUtlandetDetaljer';

interface Props {
    barn: Barn;
}

const getAntallBarnTekst = (antallBarnString: string, intl: IntlShape): string => {
    const antallBarn = parseInt(antallBarnString, 10);

    if (antallBarn === 1) {
        return intlUtils(intl, 'oppsummering.barn.antallBarn.ettBarn');
    }

    if (antallBarn === 2) {
        return intlUtils(intl, 'oppsummering.barn.antallBarn.toBarn');
    }

    return intlUtils(intl, 'oppsummering.barn.antallBarn.flere', { antallBarn });
};

const getTerminEllerFødselTittel = (type: BarnType) => {
    if (type === BarnType.UFØDT) {
        return 'Termin';
    }

    return 'Fødselsdato';
};

const getTerminEllerFødselsdato = (barn: Barn) => {
    if (isUfødtBarn(barn)) {
        return formatDate(barn.termindato);
    }

    return formatDate(barn.fødselsdatoer[0]);
};

const BarnOppsummering: FunctionComponent<Props> = ({ barn }) => {
    const intl = useIntl();

    return (
        <>
            <OppsummeringsPunkt
                title={intlUtils(intl, 'oppsummering.barn.søknadenGjelder')}
                text={getAntallBarnTekst(barn.antallBarn, intl)}
            />
            <OppsummeringsPunkt title={getTerminEllerFødselTittel(barn.type)} text={getTerminEllerFødselsdato(barn)} />
            {(isAdoptertAnnetBarn(barn) || isAdoptertStebarn(barn)) && (
                <>
                    <OppsummeringsPunkt
                        title={intlUtils(intl, 'oppsummering.barn.gjelderSøknadenStebarnsadopsjon')}
                        text={barn.type === BarnType.ADOPTERT_STEBARN ? intlUtils(intl, 'ja') : intlUtils(intl, 'nei')}
                    />
                    <OppsummeringsPunkt
                        title={intlUtils(intl, 'oppsummering.barn.adopsjonsdato')}
                        text={formatDate(barn.adopsjonsdato)}
                    />
                    <BarnAdoptertIUtlandetDetaljer barn={barn} />
                </>
            )}
        </>
    );
};

export default BarnOppsummering;
