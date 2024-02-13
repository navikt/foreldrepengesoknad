import { BodyShort } from '@navikt/ds-react';
import { Block, bemUtils, formatDateUtc, intlUtils } from '@navikt/fp-common';
import { Arbeidsforhold } from '@navikt/fp-types';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

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
        <ul className="arbeidsforholdList">
            {arbeidsforhold.map((arbforhold: Arbeidsforhold) => (
                <li key={arbforhold.arbeidsgiverId}>
                    <div className={bem.block}>
                        <div className={bem.element('topRow')}>
                            <BodyShort className={bem.element('label')}>
                                {arbforhold.arbeidsgiverIdType === 'orgnr'
                                    ? arbforhold.arbeidsgiverNavn
                                    : intlUtils(intl, 'arbeidsgiver')}
                            </BodyShort>
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
                                fom: formatDateUtc(arbforhold.fom),
                                tom: arbforhold.tom ? formatDateUtc(arbforhold.tom) : intlUtils(intl, 'pågående'),
                            })}
                        </BodyShort>
                    </div>
                </li>
            ))}
        </ul>
    );
};
export default HarArbeidsforhold;
