import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { formatDate } from '../../../../app/util/dates/dates';
import Oppsummeringsliste from 'common/components/oppsummeringsliste/Oppsummeringsliste';
import { AnnenInntekt } from '../../../../app/types/søknad/AnnenInntekt';

interface AndreInntekterOppsummeringslisteProps {
    andreInntekter: AnnenInntekt[];
}

type Props = AndreInntekterOppsummeringslisteProps & InjectedIntlProps;

const AndreInntekterOppsummeringsliste: React.StatelessComponent<Props> = ({ andreInntekter, intl }: Props) => {
    return (
        <Oppsummeringsliste
            data={andreInntekter.map(({ type, tidsperiode, pågående }) => ({
                venstrestiltTekst: getMessage(intl, `inntektstype.${type.toLowerCase()}`),
                høyrestiltTekst: getMessage(intl, 'tidsintervall', {
                    fom: formatDate(tidsperiode.fom),
                    tom: pågående ? 'pågående' : formatDate(tidsperiode.tom)
                })
            }))}
        />
    );
};
export default injectIntl(AndreInntekterOppsummeringsliste);
