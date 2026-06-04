import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Skeleton,
} from "@mui/material";
import { lazy, Suspense } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAtom } from "jotai";
import FilterBar from "../components/dashboard/FilterBar";
import { themeAtom } from "../atoms/themeAtom";
import { executiveViewAtom } from "../atoms/dashboardUiAtoms";

const KPISection = lazy(
  () => import("../components/dashboard/KPISection")
);
const RevenueChart = lazy(
  () => import("../components/dashboard/RevenueChart")
);
const StatusChart = lazy(
  () => import("../components/dashboard/StatusChart")
);
const DashboardGrid = lazy(
  () => import("../components/dashboard/DashboardGrid")
);
const HighlightsPanel = lazy(
  () => import("../components/dashboard/HighlightsPanel")
);

const SectionFallback = () => (
  <Card sx={{ borderRadius: 3 }}>
    <CardContent>
      <Skeleton variant="text" width="45%" height={36} />
      <Skeleton
        variant="rectangular"
        height={260}
        sx={{ borderRadius: 2 }}
      />
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [mode, setMode] = useAtom(themeAtom);
  const [executiveView, setExecutiveView] =
    useAtom(executiveViewAtom);

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const handleViewChange = (
    _: React.MouseEvent<HTMLElement>,
    value: string | null
  ) => {
    if (value === null) {
      return;
    }

    setExecutiveView(value === "executive");
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: {
          xs: 3,
          md: 5,
        },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{ mb: 3, justifyContent: "space-between", gap: 1.5 }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              letterSpacing: "-0.02em",
            }}
          >
            Workforce Dashboard Overview
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
          >
            Operational intelligence for employee performance, payroll, and productivity.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}>
          <ToggleButtonGroup
            value={executiveView ? "executive" : "operator"}
            exclusive
            size="small"
            onChange={handleViewChange}
          >
            <ToggleButton value="operator">Operator</ToggleButton>
            <ToggleButton value="executive">Executive</ToggleButton>
          </ToggleButtonGroup>

          <Tooltip title="Toggle theme">
            <IconButton
              color="primary"
              onClick={toggleMode}
            >
              {mode === "light" ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon />
              )}
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Suspense fallback={<SectionFallback />}>
        <KPISection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <HighlightsPanel />
      </Suspense>
      
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h5"
          sx={{ mb: 2.5, color: "text.primary" }}
        >
          Analytics Overview
        </Typography>

        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
            sx={{ minHeight: 380 }}
          >
            <Suspense fallback={<SectionFallback />}>
              <RevenueChart />
            </Suspense>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
            sx={{ minHeight: 380 }}
          >
            <Suspense fallback={<SectionFallback />}>
              <StatusChart />
            </Suspense>
          </Grid>
        </Grid>
      </Box>

      {!executiveView && (
        <Card
          sx={{
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box sx={{ mt: 1 }}>
              <FilterBar />
            </Box>
            <Suspense fallback={<SectionFallback />}>
              <DashboardGrid />
            </Suspense>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Dashboard;