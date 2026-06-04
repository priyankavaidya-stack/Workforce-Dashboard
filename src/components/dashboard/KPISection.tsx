import {
  Grid,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { useAtomValue } from "jotai";

import { useMetrics } from "../../hooks/useMetrics";
import {
  filteredProviderCountAtom,
  providersAtom,
} from "../../atoms/employeeAtoms";

const KPISection = () => {
  const {
    totalEmployees,
    totalPayroll,
    averagePerformance,
    totalProjects,
    activeRate,
  } = useMetrics();

  const totalSystemProviders =
    useAtomValue(providersAtom).length;
  const filteredCount = useAtomValue(
    filteredProviderCountAtom
  );

  const coveragePercent =
    totalSystemProviders === 0
      ? 0
      : Math.round(
          (filteredCount /
            totalSystemProviders) *
            100
        );

  const cards = [
    {
      title: "Employees",
      value: totalEmployees,
      growth: `${coveragePercent}% of full network`,
      icon: <PeopleAltIcon />,
      trend: [62, 60, 63, 67, 66, 70, 72],
      color: "#0f766e",
    },
    {
      title: "Total Payroll",
      value: `$${totalPayroll.toLocaleString()}`,
      growth: "Current filtered payroll",
      icon: <AttachMoneyIcon />,
      trend: [48, 52, 51, 58, 61, 65, 69],
      color: "#0ea5e9",
    },
    {
      title: "Performance",
      value: averagePerformance.toFixed(1),
      growth: "Average performance rating",
      icon: <StarIcon />,
      trend: [72, 73, 74, 76, 77, 78, 79],
      color: "#f59e0b",
    },
    {
      title: "Projects",
      value: totalProjects,
      growth: `${activeRate.toFixed(0)}% employees active`,
      icon: <AssignmentTurnedInIcon />,
      trend: [55, 57, 60, 64, 66, 68, 70],
      color: "#8b5cf6",
    },
    {
      title: "Active Rate",
      value: `${activeRate.toFixed(0)}%`,
      growth: "Workforce participation",
      icon: <TrendingUpIcon />,
      trend: [68, 68, 69, 70, 71, 72, 73],
      color: "#8b5cf6",
    },
  ];

  return (
    <Grid container spacing={2.5} sx={{ mb: 4 }}>
      {cards.map((card) => (
        <Grid
          key={card.title}
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              height: "100%",
            }}
          >
            <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
            >
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, mt: 1 }}
                >
                  {card.value}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{ color: "success.main" }}
                >
                  {card.growth}
                </Typography>

                <Box sx={{ mt: 1.5, height: 36, width: 132, minWidth: 0 }}>
                  <ResponsiveContainer width="100%" height="100%" aspect={16 / 2}>
                    <AreaChart
                      data={card.trend.map(
                        (value, index) => ({
                          index,
                          value,
                        })
                      )}
                    >
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={card.color}
                        fill={card.color}
                        fillOpacity={0.2}
                        strokeWidth={2}
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </Box>

              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {card.icon}
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default KPISection;