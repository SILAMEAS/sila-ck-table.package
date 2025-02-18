export const StyleConstant = {
    inputStyleLogin: {
        '& input::placeholder': {
          fontSize: "12px",
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: "#E9E9E9",
            borderWidth: '0.1px',
            // background: 'blue',
            // height: 40,
            background: 'inherit',
          },
          '&:hover fieldset': {
            borderColor: "#E9E9E9",
          },
          '&.Mui-focused fieldset': {
            borderColor: "primary.main",
            borderWidth: '0.2px',
          },
        },
      },
      select: {
        iconDropDownSelectPrimary: {
          '.MuiSvgIcon-root': {
            color: "primary.main",
          },
        },
      },
}