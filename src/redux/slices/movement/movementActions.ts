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
