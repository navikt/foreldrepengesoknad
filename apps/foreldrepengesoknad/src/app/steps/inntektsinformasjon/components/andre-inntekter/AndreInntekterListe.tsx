import { formatTidsperiodeMedValgfriSluttdato, intlUtils } from '@navikt/fp-common';
import InteractiveListElement from 'app/components/interactive-list-element/InteractiveListElement';
import { AnnenInntekt, AnnenInntektType } from 'app/context/types/AnnenInntekt';
import React, { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';

interface Props {
    andreInntekter: AnnenInntekt[];
    deleteAnnenInntekt: (oppdrag: AnnenInntekt) => void;
    selectAnnenInntekt: (oppdrag: AnnenInntekt) => void;
}

const getTitle = (type: AnnenInntektType, intl: IntlShape): string => {
    if (type === AnnenInntektType.JOBB_I_UTLANDET) {
        return intlUtils(intl, 'inntektsinformasjon.andreInntekter.inntektsliste.jobbIUtlandet');
    }

    if (type === AnnenInntektType.MILITÆRTJENESTE) {
        return intlUtils(intl, 'inntektsinformasjon.andreInntekter.inntektsliste.førstegangstjeneste');
    }

    if (type === AnnenInntektType.SLUTTPAKKE) {
        return intlUtils(intl, 'inntektsinformasjon.andreInntekter.inntektsliste.sluttpakke');
    }

    return intlUtils(intl, 'inntektsinformasjon.andreInntekter.inntektsliste.ventelønn');
};

const AndreInntekterListe: FunctionComponent<Props> = ({ andreInntekter, deleteAnnenInntekt, selectAnnenInntekt }) => {
    const intl = useIntl();

    if (andreInntekter.length === 0) {
        return null;
    }

    return (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {andreInntekter.map((annenInntekt, index) => (
                <InteractiveListElement
                    deleteLinkText="Slett annen inntekt"
                    onDelete={() => deleteAnnenInntekt(annenInntekt)}
                    onEdit={() => selectAnnenInntekt(annenInntekt)}
                    text={formatTidsperiodeMedValgfriSluttdato(annenInntekt.tidsperiode)}
                    title={getTitle(annenInntekt.type, intl)}
                    deleteButtonAriaText={`Slett annen inntekt`}
                    editButtonAriaText={`Rediger annen inntekt`}
                    missingDocumentation={
                        annenInntekt.vedlegg.length === 0 && annenInntekt.type !== AnnenInntektType.JOBB_I_UTLANDET
                    }
                    key={`${annenInntekt.type}${annenInntekt.tidsperiode.fom}${index}`}
                />
            ))}
        </ul>
    );
};

export default AndreInntekterListe;
