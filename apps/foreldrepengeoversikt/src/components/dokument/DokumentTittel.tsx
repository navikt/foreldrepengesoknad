import { FormattedMessage } from 'react-intl';

export const DokumentTittel = ({ tittel }: { tittel?: string }) => {
    if (tittel?.trim()) {
        return tittel;
    }
    return <FormattedMessage id="dokument.utenTittel" />;
};
