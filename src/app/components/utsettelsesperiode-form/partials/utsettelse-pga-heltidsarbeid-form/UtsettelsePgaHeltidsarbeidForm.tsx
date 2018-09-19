import * as React from 'react';
import Block from 'common/components/block/Block';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import HvorSkalDuJobbeSpørsmål from '../../../../spørsmål/HvorSkalDuJobbeSpørsmål';
import Arbeidsforhold from '../../../../types/Arbeidsforhold';
import { Tidsperiode } from 'common/types';
import { getValidTidsperiode } from '../../../../util/uttaksplan/Tidsperioden';

export interface UtsettelsePgaHeltidsarbeidSkjemadata {
    orgnr?: string;
    tidsperiode?: Partial<Tidsperiode>;
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
        const { orgnr, tidsperiode } = skjemadata;
        const validTidsperiode = getValidTidsperiode(tidsperiode);

        return (
            <>
                <Block visible={validTidsperiode !== undefined}>
                    <HvorSkalDuJobbeSpørsmål
                        arbeidsforhold={arbeidsforhold}
                        onChange={(v: string, skalJobbeSomFrilansEllerSelvstendigNæringsdrivende: boolean) =>
                            onChange({ orgnr: v, skalJobbeSomFrilansEllerSelvstendigNæringsdrivende })
                        }
                        valgtArbeidsforhold={orgnr}
                    />
                </Block>
            </>
        );
    }
}

export default injectIntl(UtsettelsePgaHeltidsarbeidForm);
