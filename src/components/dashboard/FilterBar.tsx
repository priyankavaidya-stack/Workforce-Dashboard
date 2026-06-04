import {
  Paper,
  Stack,
  TextField,
  MenuItem,
  Typography,
  Button,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import {
  useAtom,
  useAtomValue,
} from "jotai";

import {
  providersAtom,
  searchAtom,
  departmentAtom,
  activityAtom,
  filteredProviderCountAtom,
} from "../../atoms/employeeAtoms";

const FilterBar = () => {
  const providers = useAtomValue(providersAtom);
  const filteredCount = useAtomValue(filteredProviderCountAtom);

  const [search, setSearch] = useAtom(searchAtom);

  const [department, setDepartment] =
    useAtom(departmentAtom);

  const [activity, setActivity] =
    useAtom(activityAtom);

  const departments = [
    "All",
    ...new Set(
      providers.map((p) => p.department)
    ),
  ];

  const statuses = [
    "All",
    "Active",
    "Inactive",
  ];

  const resetFilters = () => {
    setSearch("");
    setDepartment("All");
    setActivity("All");
  };

  const applyPreset = (
    preset: "all" | "engineering-active" | "management" | "inactive"
  ) => {
    if (preset === "all") {
      resetFilters();
      return;
    }

    if (preset === "engineering-active") {
      setSearch("");
      setDepartment("Engineering");
      setActivity("Active");
      return;
    }

    if (preset === "management") {
      setSearch("manager");
      setDepartment("All");
      setActivity("All");
      return;
    }

    if (preset === "inactive") {
      setSearch("");
      setDepartment("All");
      setActivity("Inactive");
      return;
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 2.5 },
        mb: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 2 }}
      >
        Employee Directory
      </Typography>

      <Stack
        direction="row"
        sx={{ mb: 2, justifyContent: "space-between", alignItems: "center" }}
      >
        <Chip
          color="primary"
          variant="outlined"
          label={`${filteredCount} matched`}
        />

        <Button
          variant="text"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
      </Stack>

      <Stack spacing={1.25} sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Scenario presets
        </Typography>

        <ToggleButtonGroup
          exclusive
          size="small"
          value={null}
          sx={{ flexWrap: "wrap", gap: 1 }}
        >
          <ToggleButton value="all" onClick={() => applyPreset("all")}>All Network</ToggleButton>
          <ToggleButton value="engineering-active" onClick={() => applyPreset("engineering-active")}>Engineering Active</ToggleButton>
          <ToggleButton value="management" onClick={() => applyPreset("management")}>Management Focus</ToggleButton>
          <ToggleButton value="inactive" onClick={() => applyPreset("inactive")}>Inactive Watch</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={2}
      >
        <TextField
          fullWidth
          label="Search Employee"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <TextField
          select
          label="Department"
          value={department}
          onChange={(e) =>
            setDepartment(e.target.value)
          }
          sx={{
            minWidth: 250,
          }}
        >
          {departments.map((item) => (
            <MenuItem
              key={item}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Activity"
          value={activity}
          onChange={(e) =>
            setActivity(e.target.value)
          }
          sx={{
            minWidth: 180,
          }}
        >
          {statuses.map((item) => (
            <MenuItem
              key={item}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    </Paper>
  );
};

export default FilterBar;