import * as React from 'react';
import { OverføringÅrsakType } from '../../../types/uttaksplan/periodetyper';
import OverføringsårsakSpørsmål from '../../../sp\u00F8rsm\u00E5l/Overf\u00F8rings\u00E5rsakSp\u00F8rsm\u00E5l';
import Block from 'common/components/block/Block';
import { Attachment } from 'csstype';

interface Props {
    overføringsårsak: OverføringÅrsakType;
    navnAnnenForelder: string;
    onChange: (skjemadata: OverføringUttakFormSkjemadata) => void;
}

export interface OverføringUttakFormSkjemadata {
    årsak: OverføringÅrsakType;
    vedlegg?: Attachment[];
}

class OverføringUttakForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { onChange, overføringsårsak, navnAnnenForelder } = this.props;
        return (
            <>
                <Block margin="s">
                    <OverføringsårsakSpørsmål
                        annenForelderNavn={navnAnnenForelder}
                        årsak={overføringsårsak}
                        onChange={(årsak) => onChange({ årsak })}
                    />
                </Block>
            </>
        );
    }
}

export default OverføringUttakForm;
