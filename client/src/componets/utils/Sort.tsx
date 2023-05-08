import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { getMovieItemAsync, setPage } from "../movie/movieSlice";
import { useAppDispatch } from "../../app/store/configureStore";
import { useAppSelector } from "../../app/store/configureStore";

export default function Sort() {
  const { pagination } = useAppSelector((state) => state.movies);
  const limit: any = pagination && pagination.limit!;
  const offset: any = pagination && pagination.offset;
  const sort: any = pagination && pagination.sort;

  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState("desc");

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    console.log(value);

    // dispatch(setPage({ limit, offset, sort: value }));

    const sorts: any = await dispatch(
      getMovieItemAsync({ limit, offset, sort: value })
    );
    console.log(sorts);
  };

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Sort</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="desc"
        name="radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="asc" control={<Radio />} label="Ascending" />
        <FormControlLabel value="desc" control={<Radio />} label="Descending" />
        {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
      </RadioGroup>
    </FormControl>
  );
}
