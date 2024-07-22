import { type Movement } from "./movementSlice";

import generateRequest from "@/redux/generalActions";

export const requestScrap = generateRequest("post", "movements/scrap");

type MovementResponseString = Movement & {
  date: string;
  valueDate: string;
};

type MovementsResponse = {
  movements: MovementResponseString[];
};

export const requestMovements = generateRequest<MovementsResponse>(
  "get",
  "movements"
);
