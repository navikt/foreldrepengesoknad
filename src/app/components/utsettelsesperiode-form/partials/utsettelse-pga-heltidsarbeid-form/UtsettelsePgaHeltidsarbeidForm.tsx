import * as React from 'react';
import Block from 'common/components/block/Block';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { AppState } from '../../../../redux/reducers/index';
import { Søkerinfo } from '../../../../types/søkerinfo';
import HvorSkalDuJobbeSpørsmål from '../../../../spørsmål/HvorSkalDuJobbeSpørsmål';

export interface UtsettelsePgaHeltidsarbeidSkjemadata {
    orgnr?: string;
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
    constructor(props: Props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(skjemadataProps: Partial<UtsettelsePgaHeltidsarbeidSkjemadata>) {
        const { skjemadata, onChange } = this.props;

        onChange({
            ...skjemadata,
            ...skjemadataProps
        });
    }

    render() {
        const { skjemadata, søkerinfo } = this.props;
        const { arbeidsforhold } = søkerinfo;
        const { orgnr } = skjemadata;

        return (
            <Block>
                <HvorSkalDuJobbeSpørsmål
                    arbeidsforhold={arbeidsforhold}
                    onChange={(v: string) => this.handleOnChange({ orgnr: v })}
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
