import { ValiderbartSkjemaelementProps } from 'common/lib/validation/elements/ValiderbartSkjemaelement';

export interface CommonSkjemaelementProps {
    infotekst?: string | React.ReactNode;
    apneLabel?: string | React.ReactNode;
}

export type SkjemaelementProps = CommonSkjemaelementProps & ValiderbartSkjemaelementProps;
