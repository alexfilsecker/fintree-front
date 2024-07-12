import { Button, Typography } from "@mui/material";

import { useAppDispatch } from "@/hooks/state";
import requestScrap from "@/redux/slices/movement/movementActions";

const Home = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleScrapClick = (): void => {
    void dispatch(requestScrap());
  };

  return (
    <div className="flex flex-col align-middle gap-5">
      <Typography variant="h1">Home</Typography>
      <Button variant="contained" onClick={handleScrapClick}>
        Scrap
      </Button>
    </div>
  );
};

export default Home;
