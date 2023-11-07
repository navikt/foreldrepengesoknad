import { formatDate, intlUtils } from '@navikt/fp-common';
import useSøknad from 'app/utils/hooks/useSøknad';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import { BodyShort } from '@navikt/ds-react';

const FrilansOppsummering: FunctionComponent = () => {
    const intl = useIntl();
    const {
        søker: { frilansInformasjon, harJobbetSomFrilansSiste10Mnd },
    } = useSøknad();

    if (!frilansInformasjon || !harJobbetSomFrilansSiste10Mnd) {
        return (
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.frilans.tittel')}>
                <BodyShort>{intlUtils(intl, 'oppsummering.frilans.ikkeFrilans')}</BodyShort>
            </OppsummeringsPunkt>
        );
    }
    const { oppstart, jobberFremdelesSomFrilans } = frilansInformasjon;

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
