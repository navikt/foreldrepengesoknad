import { BriefcaseIcon } from '@navikt/aksel-icons';

import { BodyShort } from '@navikt/ds-react';

interface Props {
    skalJobbeIPermisjonsperioden: boolean;
    erUtsettelse: boolean;
}

export const SkalJobbeContent = ({ skalJobbeIPermisjonsperioden, erUtsettelse }: Props) => {
    if (erUtsettelse) {
        return null;
    }

    if (skalJobbeIPermisjonsperioden) {
        return (
            <div style={{ margin: '0.5rem 0', display: 'flex' }}>
                <div>
                    <BriefcaseIcon width={24} height={24} />
                </div>
                <div>
                    <div style={{ display: 'flex', marginLeft: '1rem', gap: '1rem' }}>
                        <BodyShort>Du skal jobbe i denne perioden</BodyShort>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ margin: '0.5rem 0', display: 'flex' }}>
            <div>
                <BriefcaseIcon width={24} height={24} />
            </div>
            <div>
                <div style={{ display: 'flex', marginLeft: '1rem', gap: '1rem' }}>
                    <BodyShort>Du skal ikke jobbe i denne perioden</BodyShort>
                </div>
            </div>
        </div>
    );
};
