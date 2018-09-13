import * as React from 'react';
import Block from 'common/components/block/Block';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import HvorSkalDuJobbeSpørsmål from '../../../../spørsmål/HvorSkalDuJobbeSpørsmål';
import Arbeidsforhold from '../../../../types/Arbeidsforhold';

export interface UtsettelsePgaHeltidsarbeidSkjemadata {
    orgnr?: string;
    skalJobbeSomFrilansEllerSelvstendigNæringsdrivende?: boolean;
}

interface UtsettelsePgaArbeidFormProps {
    onChange: (v: UtsettelsePgaHeltidsarbeidSkjemadata) => void;
    skjemadata: UtsettelsePgaHeltidsarbeidSkjemadata;
    arbeidsforhold: Arbeidsforhold[];
}

type Props = UtsettelsePgaArbeidFormProps & InjectedIntlProps;

class UtsettelsePgaHeltidsarbeidForm extends React.Component<Props> {
    render() {
        const { skjemadata, onChange, arbeidsforhold } = this.props;
        const { orgnr } = skjemadata;

        return (
            <Block>
                <HvorSkalDuJobbeSpørsmål
                    arbeidsforhold={arbeidsforhold}
                    onChange={(v: string, skalJobbeSomFrilansEllerSelvstendigNæringsdrivende: boolean) =>
                        onChange({ orgnr: v, skalJobbeSomFrilansEllerSelvstendigNæringsdrivende })
                    }
                    valgtArbeidsforhold={orgnr}
                />
            </Block>
        );
    }
}

export default injectIntl(UtsettelsePgaHeltidsarbeidForm);
