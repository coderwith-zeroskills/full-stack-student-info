import * as React from "react";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import clsx from "clsx";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";

export default function BasicFormControl({ handleSave }) {
  const [formData, setFormData] = React.useState({
    member_name: null,
    member_email: null,
    age: null,
    member_parent_id: null,
  });
  // will update UI to add more functionality

  return (
    <FormControl defaultValue="" required>
      <Label>Member Name</Label>
      <TextField
        hiddenLabel
        fullWidth
        id="outlined-basic"
        label="Member Name"
        variant="outlined"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, member_name: e.target.value }))
        }
      />
      <Label>Member Email</Label>
      <TextField
        hiddenLabel
        fullWidth
        id="outlined-basic"
        label="Member Email"
        variant="outlined"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, member_email: e.target.value }))
        }
      />
      <Label>Age</Label>
      <TextField
        hiddenLabel
        fullWidth
        id="outlined-basic"
        label="Age"
        variant="outlined"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, age: e.target.value }))
        }
      />
      <Label>Parent Id</Label>
      <TextField
        hiddenLabel
        fullWidth
        id="outlined-basic"
        label="Parent Id"
        variant="outlined"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, member_parent_id: e.target.value }))
        }
      />
      <Button
        variant="contained"
        sx={{ m: 1 }}
        onClick={() => handleSave(formData)}
      >
        Save
      </Button>
      <HelperText />
    </FormControl>
  );
}

const StyledInput = styled(Input)(
  ({ theme }) => `

  .${inputClasses.input} {
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  }
`
);

const Label = styled(({ children, className }) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p className={clsx(className, error || showRequiredError ? "invalid" : "")}>
      {children}
      {required ? " *" : ""}
    </p>
  );
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
`;

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};
