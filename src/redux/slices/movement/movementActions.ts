import { type Movement } from "./movementSlice";

import generateRequest from "@/redux/generalActions";

export const requestScrap = generateRequest("post", "movements/scrap");

type MovementsResponse = {
  movements: Movement[];
};

export const requestMovements = generateRequest<MovementsResponse>(
  "get",
  "movements"
);

type PatchUserDescriptionPayload = {
  id: number;
  userDescription: string;
};

type PatchUserDescriptionResponse = {
  message: string;
  id: number;
};

export const patchUserDescription = generateRequest<
  PatchUserDescriptionResponse,
  PatchUserDescriptionPayload
>("patch", "movements/:id/user-description");

export const hola = generateRequest("get", "movements/hola");
