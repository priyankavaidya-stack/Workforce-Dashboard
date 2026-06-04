import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
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

const RevenueChart = () => {
  const theme = useTheme();
  const employees = useAtomValue(filteredProvidersAtom);

  const payrollByDepartment = employees.reduce(
    (acc: Record<string, number>, employee) => {
      acc[employee.department] =
        (acc[employee.department] || 0) +
        employee.salary;

      return acc;
    },
    {}
  );

  const chartData = Object.entries(
    payrollByDepartment
  )
    .map(([department, payroll]) => ({
      department,
      payroll,
    }))
    .sort((a, b) => b.payroll - a.payroll);

  if (chartData.length === 0) {
    return (
      <Card sx={{ height: "100%" }}>
        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="h6" gutterBottom>
            Payroll by Department
          </Typography>
          <Box
            sx={{
              height: 300,
              display: "grid",
              placeItems: "center",
              color: "text.secondary",
            }}
          >
            No data for the selected filters.
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
          Payroll by Department
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />

            <XAxis
              dataKey="department"
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            />

            <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} />

            <Tooltip />

            <Bar
              dataKey="payroll"
              fill={theme.palette.primary.main}
              radius={[6, 6, 0, 0]}
              name="Payroll"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;