import {
  Drawer,
  Typography,
  Box,
  Divider,
  Stack,
  Chip,
  LinearProgress,
  Rating,
} from "@mui/material";
import type { Provider } from "../../types/employee";

interface ProviderDrawerProps {
  open: boolean;
  provider: Provider | null;
  onClose: () => void;
}

const ProviderDrawer = ({
  open,
  provider,
  onClose,
}: ProviderDrawerProps) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          width: {
            xs: 320,
            sm: 380,
          },
          p: 3,
        }}
      >
        {provider && (
          <>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
            >
              <Box>
                <Typography
                  variant="h5"
                >
                  {provider.firstName} {provider.lastName}
                </Typography>

                <Typography
                  color="text.secondary"
                >
                  {provider.position}
                </Typography>
              </Box>

              <Chip
                label={provider.isActive ? "Active" : "Inactive"}
                color={
                  provider.isActive
                    ? "success"
                    : "default"
                }
              />
            </Stack>

            <Divider
              sx={{ my: 2 }}
            />

            <Stack
              spacing={2.25}
            >
              <Typography>
                Department: {provider.department}
              </Typography>

              <Typography>
                Location: {provider.location}
              </Typography>

              <Typography>
                Email: {provider.email}
              </Typography>

              <Typography>
                Salary: ${provider.salary.toLocaleString()}
              </Typography>

              <Typography>
                Projects: {provider.projectsCompleted}
              </Typography>

              <LinearProgress
                variant="determinate"
                value={Math.min(provider.performanceRating * 20, 100)}
                sx={{ height: 10, borderRadius: 999 }}
              />

              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Typography>
                  Performance:
                </Typography>
                <Rating
                  value={provider.performanceRating}
                  precision={0.1}
                  readOnly
                />
                <Typography color="text.secondary">
                  {provider.performanceRating.toFixed(1)}
                </Typography>
              </Stack>

              <Typography>
                Manager: {provider.manager ?? "None"}
              </Typography>

              <Typography>
                Skills: {provider.skills.join(", ")}
              </Typography>

              <Typography>
                Hire Date: {new Date(provider.hireDate).toLocaleDateString()}
              </Typography>
            </Stack>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default ProviderDrawer;