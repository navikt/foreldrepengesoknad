import { UtenlandsoppholdData } from "../../types/søknad/Søknad";
import { UpdateUtenlandsopppholdPayload } from "../actions/søknad/søknadActionDefinitions";

export const updateUtenlandsoppholdState = (
  payload: UpdateUtenlandsopppholdPayload,
  utenlandsoppholIState: UtenlandsoppholdData[]
): UtenlandsoppholdData[] => {
  if (payload.action === "add") {
    return [...utenlandsoppholIState, payload.utenlandsopphold];
  }
  if (payload.action === "delete") {
    return [...utenlandsoppholIState].filter(
      o => o !== payload.utenlandsopphold
    );
  }
  return [];
};
