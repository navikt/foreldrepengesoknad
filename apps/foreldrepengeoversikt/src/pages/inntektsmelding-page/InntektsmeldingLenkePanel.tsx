import { SackKronerIcon } from '@navikt/aksel-icons';
import { useQuery } from '@tanstack/react-query';
import { groupBy } from 'lodash';
import { useParams } from 'react-router-dom';

import { capitalizeFirstLetterInEveryWordOnly } from '@navikt/fp-utils';

import { hentInntektsmelding } from '../../api/api';
import { LenkePanel } from '../../components/lenke-panel/LenkePanel';
import OversiktRoutes from '../../routes/routes';

export const InntektsmeldingLenkePanel = () => {
    const params = useParams();

    const inntektsmeldinger = useQuery(hentInntektsmelding(params.saksnummer!)).data ?? [];
    const aktiveInntektsmeldinger = inntektsmeldinger.filter((im) => im.erAktiv);

    if (aktiveInntektsmeldinger.length === 0) {
        return null;
    }

    const imPerArbeidsgiver = groupBy(aktiveInntektsmeldinger, (im) => im.arbeidsgiverNavn);

    return Object.values(imPerArbeidsgiver).map((ims) => {
        // Det burde kun finnes 1 aktiv IM per arbeidsgiver.
        const im = ims[0];

        return (
            <LenkePanel
                key={im.journalpostId}
                tittel="Rapportert inntekt"
                undertittel={`Av ${capitalizeFirstLetterInEveryWordOnly(im.arbeidsgiverNavn)}`}
                to={`${OversiktRoutes.INNTEKTSMELDING}/${im.journalpostId}`}
                Ikon={SackKronerIcon}
            />
        );
    });
};
