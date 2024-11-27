import { SackKronerIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { hentInntektsmelding } from '../../api/api';
import { LenkePanel } from '../../components/lenke-panel/LenkePanel';
import { OversiktRoutes } from '../../routes/routes';

export const InntektsmeldingLenkePanel = () => {
    const params = useParams();

    const inntektsmeldinger = useQuery(hentInntektsmelding(params.saksnummer!)).data ?? [];
    const aktiveInntektsmeldinger = inntektsmeldinger.filter((im) => im.erAktiv);

    if (aktiveInntektsmeldinger.length === 0) {
        return null;
    }

    return <LenkePanel tittel="Rapportert inntekt" to={OversiktRoutes.INNTEKTSMELDING} Ikon={SackKronerIcon} />;
};
