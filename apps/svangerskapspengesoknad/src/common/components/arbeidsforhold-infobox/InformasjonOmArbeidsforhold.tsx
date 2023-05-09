import { useIntl } from 'react-intl';

import Arbeidsforhold from '../../../app/types/Arbeidsforhold';
import getMessage from 'common/util/i18nUtils';
import BEMHelper from 'common/util/bem';

import { formatDate } from 'app/utils/formatDate';
import './arbeidsforhold.less';
import { dateToISOFormattedDateString } from 'common/util/datoUtils';
import { BodyShort, Label } from '@navikt/ds-react';

interface InformasjonOmArbeidsforholdProps {
    arbeidsforhold: Arbeidsforhold;
}

type Props = InformasjonOmArbeidsforholdProps;
const InformasjonOmArbeidsforhold: React.FunctionComponent<Props> = ({ arbeidsforhold }: Props) => {
    const intl = useIntl();
    const cls = BEMHelper('arbeidsforholdInfoBox');
    return (
        <div className={cls.block}>
            <div className={cls.element('topRow')}>
                {arbeidsforhold.arbeidsgiverIdType === 'orgnr' && (
                    <BodyShort>
                        {getMessage(intl, 'annenInntekt.arbeidsforhold.organisasjonsnummer', {
                            organisasjonsnummer: arbeidsforhold.arbeidsgiverId,
                        })}
                    </BodyShort>
                )}
                <BodyShort className={cls.element('stillingsprosent')}>
                    {getMessage(intl, 'annenInntekt.arbeidsforhold.stillingsprosent', {
                        stillingsprosent: arbeidsforhold.stillingsprosent,
                    })}
                </BodyShort>
            </div>
            <Label>
                {arbeidsforhold.arbeidsgiverIdType === 'orgnr'
                    ? arbeidsforhold.arbeidsgiverNavn
                    : getMessage(intl, 'arbeidsgiver')}
            </Label>
            <BodyShort>
                {getMessage(intl, 'annenInntekt.arbeidsforhold.periode', {
                    fom: formatDate(dateToISOFormattedDateString(arbeidsforhold.fom)),
                    tom: arbeidsforhold.tom
                        ? formatDate(dateToISOFormattedDateString(arbeidsforhold.tom))
                        : getMessage(intl, 'pågående'),
                })}
            </BodyShort>
        </div>
    );
};
export default InformasjonOmArbeidsforhold;
