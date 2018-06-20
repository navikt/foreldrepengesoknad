import * as React from 'react';
import { FrilansInntektPartial } from '../types/søknad/AnnenInntekt';
import HarJobbetForNærVennEllerFamilieSiste12MndSpørsmål from '../spørsmål/HarJobbetForNærVennEllerFamilieSiste12MndSpørsmål';

interface FrilanserBolkProps {
    frilansInntekt: FrilansInntektPartial;
    onChange: (v: FrilansInntektPartial) => void;
}

class FrilanserBolk extends React.Component<FrilanserBolkProps> {
    constructor(props: FrilanserBolkProps) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(changedProps: FrilansInntektPartial) {
        const { frilansInntekt, onChange } = this.props;
        onChange({ ...frilansInntekt, ...changedProps });
    }

    render() {
        const { frilansInntekt } = this.props;

        return (
            <React.Fragment>
                <HarJobbetForNærVennEllerFamilieSiste12MndSpørsmål
                    onChange={(
                        harJobbetForNærVennEllerFamilieSiste12Mnd: boolean
                    ) =>
                        this.handleOnChange({
                            harJobbetForNærVennEllerFamilieSiste12Mnd
                        })
                    }
                    harJobbetForNærVennEllerFamilieSiste12Mnd={
                        frilansInntekt.harJobbetForNærVennEllerFamilieSiste12Mnd
                    }
                />
            </React.Fragment>
        );
    }
}

export default FrilanserBolk;
