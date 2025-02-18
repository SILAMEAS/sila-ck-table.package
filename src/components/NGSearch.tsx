import { debounce, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { IFilterTableCustom } from "./types";
import { useCallback } from "react";
import { StyleConstant } from "../constant/StyleConstant";
export const SearchFormTableCustom = ({
    setFilter,
    filter,
    placeholder = 'default placeholder',
  }: {
    filter: IFilterTableCustom;
    setFilter: React.Dispatch<React.SetStateAction<IFilterTableCustom>>;
    placeholder?: string;
  }) => {
    /** search when stop typing **/
    const handleSearchDebounce = useCallback(
      debounce(async (search: string) => {
        setFilter({...filter, search});
      }, 500),
      [],
    );
    return (
      <TextField
        size={'small'}
        placeholder={placeholder}
        onChange={event => {
          handleSearchDebounce(event.target.value);
        }}
        sx={{
          ...StyleConstant.inputStyleLogin,
          width: "500px",
          borderRadius:"6px",
          height: '20px',
          // ...sx,
        }}
        InputProps={{
          // ...params.InputProps,
          startAdornment: (
            <InputAdornment position="end" sx={{mr: 2}}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          shrink: false,
          focused: false,
        }}
      />
    );
  };
  