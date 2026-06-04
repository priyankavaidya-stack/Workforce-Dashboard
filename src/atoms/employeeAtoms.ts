import { atom } from "jotai";
import { providers } from "../data/employees";

export const providersAtom = atom(providers);

export const searchAtom = atom("");

export const departmentAtom = atom("All");

export const activityAtom = atom("All");

export const specialtyAtom = departmentAtom;
export const statusAtom = activityAtom;

export const filteredProvidersAtom = atom((get) => {
  const providers = get(providersAtom);
  const search = get(searchAtom).trim().toLowerCase();
  const department = get(departmentAtom);
  const activity = get(activityAtom);

  return providers.filter((provider) => {
    const employeeStatus =
      provider.isActive ? "Active" : "Inactive";

    const searchBlob = [
      `${provider.firstName} ${provider.lastName}`,
      provider.email,
      provider.department,
      provider.position,
      provider.location,
      provider.manager ?? "",
      provider.skills.join(" "),
      employeeStatus,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      search.length === 0 ||
      searchBlob.includes(search);

    const matchesDepartment =
      department === "All" ||
      provider.department === department;

    const matchesActivity =
      activity === "All" ||
      employeeStatus === activity;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesActivity
    );
  });
});

export const filteredProviderCountAtom = atom(
  (get) =>
    get(filteredProvidersAtom).length
);