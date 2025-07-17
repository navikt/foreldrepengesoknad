import React, { useState } from 'react';

import { Button } from '@navikt/ds-react';

interface Props {
    handleAddPeriode: (periode: any) => void;
    erBarnetFødt: boolean;
    gjelderAdopsjon: boolean;
    onCancel: () => void;
}

export function LeggTilPeriodeBox({ handleAddPeriode, erBarnetFødt, gjelderAdopsjon, onCancel }: Props) {
    const [periode, setPeriode] = useState<any>({});

    return (
        <div style={{ border: '1px solid #ddd', padding: 16, marginTop: 16 }}>
            <h3>Legg til periode (prototype)</h3>
            {/* Her kan du legge til input-felter for periode */}
            <Button onClick={() => handleAddPeriode(periode)}>Legg til</Button>
            <Button variant="tertiary" onClick={onCancel} style={{ marginLeft: 8 }}>
                Avbryt
            </Button>
        </div>
    );
}
