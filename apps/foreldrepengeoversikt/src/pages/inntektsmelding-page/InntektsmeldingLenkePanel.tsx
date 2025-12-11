import { SackKronerIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { hentInntektsmelding } from '../../api/queries.ts';
import { LenkePanel } from '../../components/lenke-panel/LenkePanel';
import { OversiktRoutes } from '../../routes/routes';

export const InntektsmeldingLenkePanel = () => {
    const params = useParams();

    const inntektsmeldinger = useQuery(hentInntektsmelding(params.saksnummer!)).data ?? [];
    const aktiveInntektsmeldinger = inntektsmeldinger.filter((im) => im.erAktiv);

    if (aktiveInntektsmeldinger.length === 0) {
        return null;
    }

    if (aktiveInntektsmeldinger.length === 1) {
        return (
            <LenkePanel
                tittel="Rapportert inntekt"
                to={`${OversiktRoutes.INNTEKTSMELDING}/${aktiveInntektsmeldinger[0]!.journalpostId}`}
                Ikon={SackKronerIcon}
            />
        );
    }

    return <LenkePanel tittel="Rapportert inntekt" to={OversiktRoutes.INNTEKTSMELDING} Ikon={SackKronerIcon} />;
};
