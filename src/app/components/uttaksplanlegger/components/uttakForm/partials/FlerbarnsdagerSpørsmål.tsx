import * as React from 'react';
import JaNeiSpørsmål from 'common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';
import { Uttaksperiode, UttaksperiodeBase } from 'app/types/uttaksplan/periodetyper';
import { RecursivePartial } from 'app/types/Partial';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

interface Props {
    periode: RecursivePartial<UttaksperiodeBase>;
    onChange: (periode: RecursivePartial<Uttaksperiode>) => void;
}

const FlernbarnsdagerSpørsmål: React.SFC<Props> = ({ periode, onChange }) => {
    const intl = useIntl();

    return (
        <>
            <JaNeiSpørsmål
                navn="ønskerFlerbarnsuker"
                spørsmål={getMessage(intl, 'uttaksplan.ønskerFlerbarnsdager')}
                valgtVerdi={periode.ønskerFlerbarnsdager}
                onChange={(ønskerFlerbarnsdager) => onChange({ ønskerFlerbarnsdager })}
            />
        </>
    );
};

export default FlernbarnsdagerSpørsmål;
