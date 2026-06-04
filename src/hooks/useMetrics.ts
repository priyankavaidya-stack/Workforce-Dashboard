import { useAtomValue } from "jotai";
import { filteredProvidersAtom } from "../atoms/employeeAtoms";

export const useMetrics = () => {
  const providers = useAtomValue(filteredProvidersAtom);

  const totalEmployees = providers.length;

  const totalPayroll = providers.reduce(
    (acc, provider) => acc + provider.salary,
    0
  );

  const averagePerformance =
    providers.length === 0
      ? 0
      :
    providers.reduce(
      (acc, provider) => acc + provider.performanceRating,
      0
    ) / providers.length;

  const totalProjects = providers.reduce(
    (acc, provider) => acc + provider.projectsCompleted,
    0
  );

  const activeRate =
    providers.length === 0
      ? 0
      : (providers.filter((provider) => provider.isActive).length / providers.length) * 100;

  return {
    totalEmployees,
    totalPayroll,
    averagePerformance,
    totalProjects,
    activeRate,
  };
};