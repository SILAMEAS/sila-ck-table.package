import {
  MenuItem,
  MenuItemProps,
  Select,
  SelectChangeEvent,
  SelectProps,
  Typography,
  TypographyProps,
} from '@mui/material';
import React from 'react';
import { StyleConstant } from '../constant/StyleConstant';


type ISelectDropDownPage = {
  rowPerPagesOption: number[];
  value: string;
  handleChange: (event: SelectChangeEvent<any>, child: React.ReactNode) => void;
  selectProps?: SelectProps;
  menuItemProps?: MenuItemProps;
  typographyProps?: TypographyProps;
  onlyShowItem?: boolean;
  items: number;
};

export const SelectDropDownPage = (props: ISelectDropDownPage) => {
  const {
    rowPerPagesOption = [10],
    handleChange,
    value = 10,
    selectProps,
    menuItemProps,
    typographyProps,
    items,
    onlyShowItem = false,
  } = props;

  const menuItemSelect = () => {
    return rowPerPagesOption.map((item, index) => {
      let isDisabledTab;
      /**
       index[0] always open however items smaller than 10 items
       * */
      if (index === 0) {
        isDisabledTab = false;
        /**
       1. rowPerPagesOption[0]   ->  false
       * */
      } else {
        /**
         now index is increase +1
         rowPerPagesOption[10,25,50,100]
         items = 26
           ----------------------------------------------------------------
           items <= rowPerPagesOption[index-1]
           ----------------------------------------------------------------
         2. index=1
         26 <= rowPerPagesOption[index-1] -> 26 <= rowPerPagesOption[1-1] -> 26 <= rowPerPagesOption[0] -> 26<=10 -> false
         3. index=2
         26 <= rowPerPagesOption[index-1] -> 26 <= rowPerPagesOption[2-1] -> 26 <= rowPerPagesOption[1] -> 26<=25 -> false
         4. index=3
         26 <= rowPerPagesOption[index-1] -> 26 <= rowPerPagesOption[3-1] -> 26 <= rowPerPagesOption[2] -> 26<=50 -> true
         * */
        isDisabledTab = items <= rowPerPagesOption[index - 1];
        /**
       results : [10 active,25 active,50 active,100 disabled]
       * */
      }

      return (
        <MenuItem
          {...menuItemProps}
          key={item}
          value={item}
          disabled={isDisabledTab}>
          <Typography {...typographyProps}>
            {item}
            {onlyShowItem
              ? ''
              : 'per-page'}
          </Typography>
        </MenuItem>
      );
    });
  };
  return (
    <Select
      {...selectProps}
      sx={{...StyleConstant.select.iconDropDownSelectPrimary}}
      value={value}
      onChange={handleChange}
      displayEmpty
      inputProps={{'aria-label': 'Without label'}}>
      {menuItemSelect()}
    </Select>
  );
};
