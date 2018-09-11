import * as React from 'react';
import FlervalgSpørsmål, {
    FlervalgAlternativ
} from '../../../../components/flervalg-sp\u00F8rsm\u00E5l/FlervalgSp\u00F8rsm\u00E5l';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSp\u00F8rsm\u00E5l';
import { Barn, Adopsjonsbarn } from '../../../../types/s\u00F8knad/Barn';

interface OwnProps {
    barn: Barn;
}

type Props = UttaksplanSkjemaspørsmålProps & OwnProps;

const StartdatoAdopsjonBolk = (props: Props) => {
    const { visible, barn } = props;
    const alternativer: FlervalgAlternativ[] = [];

    const gjelderAdopsjonIUtland = (barn as Adopsjonsbarn).adoptertIUtlandet || false;

    return (
        <>
            <UttaksplanSkjemaSpørsmål
                harUnderspørsmål={true}
                visible={visible}
                render={(data, onChange) => (
                    <FlervalgSpørsmål
                        navn="startdatoAdopsjon"
                        spørsmål="Når ønsker du å starte permisjon?"
                        valgtVerdi={data.valgtAdopsjonStartdato}
                        alternativer={alternativer}
                        onChange={(value) => onChange({ valgtAdopsjonStartdato: value })}
                    />
                )}
            />
        </>
    );
};

export default StartdatoAdopsjonBolk;
