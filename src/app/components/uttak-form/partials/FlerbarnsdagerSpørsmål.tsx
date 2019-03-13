import * as React from 'react';
import JaNeiSpørsmål from 'app/components/ja-nei-spørsmål/JaNeiSpørsmål';
import { Uttaksperiode, UttaksperiodeBase } from 'app/types/uttaksplan/periodetyper';
import { RecursivePartial } from 'app/types/Partial';

interface Props {
    periode: RecursivePartial<UttaksperiodeBase>;
    onChange: (periode: RecursivePartial<Uttaksperiode>) => void;
}

const FlernbarnsdagerSpørsmål: React.SFC<Props> = ({ periode, onChange }) => {
    return (
        <>
            <JaNeiSpørsmål
                navn="ønskerFlerbarnsuker"
                spørsmål="Ønsker du å benytte deg av flerbarnsdagene?"
                valgtVerdi={periode.ønskerFlerbarnsdager}
                onChange={(ønskerFlerbarnsdager) => onChange({ ønskerFlerbarnsdager })}
            />
        </>
    );
};

export default FlernbarnsdagerSpørsmål;
