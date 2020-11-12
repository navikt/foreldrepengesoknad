import * as React from 'react';
import { useIntl } from 'react-intl';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import getMessage from 'common/util/i18nUtils';
import Oppsummeringsliste from 'app/steg/oppsummering/components/oppsummeringsliste/Oppsummeringsliste';
import { FrilansOppdrag } from '../../../../../../types/søknad/FrilansInformasjon';
import { formatDate } from '../../../../../../util/dates/dates';

interface FrilansoppdragOppsummeringslisteProps {
    frilansoppdrag: FrilansOppdrag[];
}

type Props = FrilansoppdragOppsummeringslisteProps;

const FrilansoppdragOppsummeringsliste: React.FunctionComponent<Props> = ({ frilansoppdrag }) => {
    const intl = useIntl();

    return (
        <Oppsummeringsliste
            data={frilansoppdrag.map(({ navnPåArbeidsgiver, tidsperiode, pågående }) => ({
                venstrestiltTekst: navnPåArbeidsgiver,
                høyrestiltTekst: getMessage(intl, 'tidsintervall', {
                    fom: formatDate(ISOStringToDate(tidsperiode.fom)),
                    tom: pågående ? 'pågående' : formatDate(ISOStringToDate(tidsperiode.tom)),
                }),
            }))}
        />
    );
};
export default FrilansoppdragOppsummeringsliste;
