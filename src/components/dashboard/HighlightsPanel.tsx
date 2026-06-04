import {
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import BoltIcon from "@mui/icons-material/Bolt";
import { useAtomValue } from "jotai";
import {
  filteredProvidersAtom,
  providersAtom,
} from "../../atoms/employeeAtoms";

const HighlightsPanel = () => {
  const employees = useAtomValue(filteredProvidersAtom);
  const allEmployees = useAtomValue(providersAtom);

  const topPerformer = employees.reduce(
    (currentTop, employee) => {
      if (
        !currentTop ||
        employee.performanceRating >
          currentTop.performanceRating
      ) {
        return employee;
      }

      return currentTop;
    },
    null as (typeof employees)[number] | null
  );

  const avgProjects =
    employees.length === 0
      ? 0
      : Math.round(
          employees.reduce(
            (sum, employee) =>
              sum +
              employee.projectsCompleted,
            0
          ) / employees.length
        );

  const avgSalary =
    employees.length === 0
      ? 0
      : Math.round(
          employees.reduce(
            (sum, employee) =>
              sum + employee.salary,
            0
          ) / employees.length
        );

  const filteredCoverage =
    allEmployees.length === 0
      ? 0
      : Math.round((employees.length / allEmployees.length) * 100);

  return (
    <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
      <Grid
        size={{
          xs: 12,
          md: 6,
        }}
      >
        <Card>
          <CardContent sx={{ p: 2.5 }}>
            <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: "center" }}>
              <WorkspacePremiumIcon color="primary" />
              <Typography variant="h6">Top Performer</Typography>
            </Stack>

            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {topPerformer
                ? `${topPerformer.firstName} ${topPerformer.lastName}`
                : "No employee match"}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {topPerformer
                ? `${topPerformer.department} • ${topPerformer.position}`
                : "Adjust filters to explore employee-level highlights."}
            </Typography>

            <Typography variant="h5" sx={{ mt: 2 }}>
              {topPerformer
                ? `${topPerformer.performanceRating.toFixed(1)} / 5`
                : "0.0 / 5"}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Highest performance rating in current view
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid
        size={{
          xs: 12,
          md: 6,
        }}
      >
        <Card>
          <CardContent sx={{ p: 2.5 }}>
            <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: "center" }}>
              <BoltIcon color="secondary" />
              <Typography variant="h6">Operational Snapshot</Typography>
            </Stack>

            <Typography variant="body2" color="text.secondary">
              Filter coverage
            </Typography>
            <LinearProgress
              variant="determinate"
              value={filteredCoverage}
              sx={{ my: 1, height: 10, borderRadius: 99 }}
            />
            <Typography variant="caption" color="text.secondary">
              {employees.length}/{allEmployees.length} employees in view ({filteredCoverage}%)
            </Typography>

            <Stack direction="row" spacing={4} sx={{ mt: 2 }}>
              <div>
                <Typography variant="body2" color="text.secondary">
                  Avg projects
                </Typography>
                <Typography variant="h6">{avgProjects}</Typography>
              </div>

              <div>
                <Typography variant="body2" color="text.secondary">
                  Avg salary
                </Typography>
                <Typography variant="h6">${avgSalary.toLocaleString()}</Typography>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HighlightsPanel;
