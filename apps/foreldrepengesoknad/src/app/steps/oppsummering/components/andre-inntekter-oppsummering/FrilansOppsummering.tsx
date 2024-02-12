import { BodyShort } from '@navikt/ds-react';
import { formatDate } from '@navikt/fp-common';
import SøkerData from 'app/context/types/SøkerData';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';

interface Props {
    søkerData: SøkerData;
}

const FrilansOppsummering: FunctionComponent<Props> = ({ søkerData }) => {
    const intl = useIntl();

    if (!søkerData.frilansInformasjon || !søkerData.harJobbetSomFrilansSiste10Mnd) {
        return (
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.frilans.tittel' })}>
                <BodyShort>{intl.formatMessage({ id: 'oppsummering.frilans.ikkeFrilans' })}</BodyShort>
            </OppsummeringsPunkt>
        );
    }
    const { oppstart, jobberFremdelesSomFrilans } = søkerData.frilansInformasjon;

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
