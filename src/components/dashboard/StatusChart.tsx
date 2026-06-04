import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from "@mui/material";

import { useAtomValue } from "jotai";
import { filteredProvidersAtom } from "../../atoms/employeeAtoms";

const COLORS = [
  "#4caf50",
  "#f44336",
];

const StatusChart = () => {
  const theme = useTheme();
  const employees = useAtomValue(filteredProvidersAtom);

  const counts = {
    Active: 0,
    Inactive: 0,
  };

  employees.forEach((employee) => {
    if (employee.isActive) {
      counts.Active++;
      return;
    }

    counts.Inactive++;
  });

  const data = Object.entries(counts).map(
    ([name, value]) => ({
      name,
      value,
    })
  ).filter((entry) => entry.value > 0);

  if (data.length === 0) {
    return (
      <Card sx={{ height: "100%" }}>
        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="h6" gutterBottom>
            Employee Activity
          </Typography>
          <Box
            sx={{
              height: 300,
              display: "grid",
              placeItems: "center",
              color: "text.secondary",
            }}
          >
            No status distribution for the selected filters.
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography
          variant="h6"
          gutterBottom
        >
          Employee Activity
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend
              wrapperStyle={{ color: theme.palette.text.secondary }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StatusChart;