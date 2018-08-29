import { ValiderbartSkjemaelementProps } from 'common/lib/validation/elements/ValiderbartSkjemaelement';

export interface CommonSkjemaelementProps {
    infotekst?: string;
}

export type SkjemaelementProps = CommonSkjemaelementProps & ValiderbartSkjemaelementProps;
