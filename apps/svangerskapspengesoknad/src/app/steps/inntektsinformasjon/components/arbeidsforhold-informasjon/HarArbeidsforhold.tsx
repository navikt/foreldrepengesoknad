import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Block, bemUtils, formatDate, intlUtils } from '@navikt/fp-common';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { BodyShort, Label } from '@navikt/ds-react';

interface Props {
    arbeidsforhold: Arbeidsforhold[];
    harArbeidsforhold: boolean;
}

const HarArbeidsforhold: FunctionComponent<Props> = ({ arbeidsforhold, harArbeidsforhold }: Props) => {
    const intl = useIntl();

    if (!harArbeidsforhold) {
        return null;
    }

    const bem = bemUtils('arbeidsforholdInfoBox');

    return (
        <ul className={bem.element('arbeidsforholdList')}>
            {arbeidsforhold.map((arbforhold: Arbeidsforhold) => (
                <li key={arbforhold.arbeidsgiverId}>
                    <div className={bem.block}>
                        <div className={bem.element('topRow')}>
                            <Label>
                                {arbforhold.arbeidsgiverIdType === 'orgnr'
                                    ? arbforhold.arbeidsgiverNavn
                                    : intlUtils(intl, 'arbeidsgiver')}
                            </Label>
                            <BodyShort className={bem.element('stillingsprosent')}>
                                {intlUtils(intl, 'inntektsinformasjon.arbeidsforhold.stillingsprosent', {
                                    stillingsprosent: arbforhold.stillingsprosent,
                                })}
                            </BodyShort>
                        </div>
                        <Block padBottom="m">
                            {arbforhold.arbeidsgiverIdType === 'orgnr' && (
                                <BodyShort>
                                    {intlUtils(intl, 'inntektsinformasjon.arbeidsforhold.organisasjonsnummer', {
                                        organisasjonsnummer: arbforhold.arbeidsgiverId,
                                    })}
                                </BodyShort>
                            )}
                        </Block>
                        <BodyShort>
                            {intlUtils(intl, 'inntektsinformasjon.arbeidsforhold.periode', {
                                fom: formatDate(arbforhold.fom),
                                tom: arbforhold.tom ? formatDate(arbforhold.tom) : intlUtils(intl, 'pågående'),
                            })}
                        </BodyShort>
                    </div>
                </li>
            ))}
        </ul>
    );
};
export default HarArbeidsforhold;
