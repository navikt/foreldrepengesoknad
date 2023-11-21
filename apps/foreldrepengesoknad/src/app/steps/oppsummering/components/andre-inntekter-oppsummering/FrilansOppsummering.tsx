import { formatDate, intlUtils } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import { BodyShort } from '@navikt/ds-react';
import Søker from 'app/context/types/Søker';

interface Props {
    søker: Søker;
}

const FrilansOppsummering: FunctionComponent<Props> = ({ søker }) => {
    const intl = useIntl();

    if (!søker.frilansInformasjon || !søker.harJobbetSomFrilansSiste10Mnd) {
        return (
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.frilans.tittel')}>
                <BodyShort>{intlUtils(intl, 'oppsummering.frilans.ikkeFrilans')}</BodyShort>
            </OppsummeringsPunkt>
        );
    }
    const { oppstart, jobberFremdelesSomFrilans } = søker.frilansInformasjon;

    return (
        <>
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.frilans.tittel')} />
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.frilans.oppstartsdato')}>
                <BodyShort>{formatDate(oppstart)}</BodyShort>
            </OppsummeringsPunkt>
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.frilans.fremdelesFrilans')}>
                <BodyShort>{jobberFremdelesSomFrilans ? intlUtils(intl, 'ja') : intlUtils(intl, 'nei')}</BodyShort>
            </OppsummeringsPunkt>
        </>
    );
};

export default FrilansOppsummering;
