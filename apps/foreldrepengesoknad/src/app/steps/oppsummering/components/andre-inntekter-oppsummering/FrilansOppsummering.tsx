import { BodyShort } from '@navikt/ds-react';
import { formatDate } from '@navikt/fp-common';
import Søker from 'app/context/types/Søker';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';

interface Props {
    søker: Søker;
}

const FrilansOppsummering: FunctionComponent<Props> = ({ søker }) => {
    const intl = useIntl();

    if (!søker.frilansInformasjon || !søker.harJobbetSomFrilansSiste10Mnd) {
        return (
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.frilans.tittel' })}>
                <BodyShort>{intl.formatMessage({ id: 'oppsummering.frilans.ikkeFrilans' })}</BodyShort>
            </OppsummeringsPunkt>
        );
    }
    const { oppstart, jobberFremdelesSomFrilans } = søker.frilansInformasjon;

    return (
        <>
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.frilans.tittel' })} />
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.frilans.oppstartsdato' })}>
                <BodyShort>{formatDate(oppstart)}</BodyShort>
            </OppsummeringsPunkt>
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.frilans.fremdelesFrilans' })}>
                <BodyShort>
                    {jobberFremdelesSomFrilans ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' })}
                </BodyShort>
            </OppsummeringsPunkt>
        </>
    );
};

export default FrilansOppsummering;
