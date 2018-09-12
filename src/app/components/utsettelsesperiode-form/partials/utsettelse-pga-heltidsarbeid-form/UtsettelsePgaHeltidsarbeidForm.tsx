import * as React from 'react';
import Block from 'common/components/block/Block';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { AppState } from '../../../../redux/reducers/index';
import { Søkerinfo } from '../../../../types/søkerinfo';
import HvorSkalDuJobbeSpørsmål from '../../../../spørsmål/HvorSkalDuJobbeSpørsmål';

export interface UtsettelsePgaHeltidsarbeidSkjemadata {
    orgnr?: string;
    skalJobbeSomFrilansEllerSelvstendigNæringsdrivende?: boolean;
}

interface UtsettelsePgaArbeidFormProps {
    onChange: (v: UtsettelsePgaHeltidsarbeidSkjemadata) => void;
    skjemadata: UtsettelsePgaHeltidsarbeidSkjemadata;
}

interface StateProps {
    søkerinfo: Søkerinfo;
}

type Props = UtsettelsePgaArbeidFormProps & StateProps & InjectedIntlProps;

class UtsettelsePgaHeltidsarbeidForm extends React.Component<Props> {
    render() {
        const { skjemadata, søkerinfo, onChange } = this.props;
        const { arbeidsforhold } = søkerinfo;
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

const mapStateToProps = (state: AppState): StateProps => {
    return {
        søkerinfo: state.api.søkerinfo!
    };
};
export default connect(mapStateToProps)(injectIntl(UtsettelsePgaHeltidsarbeidForm));
