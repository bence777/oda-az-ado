export const LEAD_STATUSES = [
  "Új érdeklődő",
  "Kapcsolatfelvétel",
  "Egyeztetés alatt",
  "Ajánlat kiküldve",
  "Megnyerte",
  "Nem aktuális",
  "Elutasítva",
];

export const ACTIVE_LEAD_STATUSES = [
  "Kapcsolatfelvétel",
  "Egyeztetés alatt",
  "Ajánlat kiküldve",
];

export const LEAD_STATUS_META = {
  "Új érdeklődő": { bg: "#E8F0FF", color: "#2459C4", dot: "#3B82F6" },
  "Kapcsolatfelvétel": { bg: "#F1ECFF", color: "#6D45B8", dot: "#8B5CF6" },
  "Egyeztetés alatt": { bg: "#FFF4DD", color: "#94620A", dot: "#F59E0B" },
  "Ajánlat kiküldve": { bg: "#E8F7F7", color: "#147A7A", dot: "#14B8A6" },
  Megnyerte: { bg: "#E8F8EF", color: "#18794E", dot: "#22C55E" },
  "Nem aktuális": { bg: "#EEF1F5", color: "#596579", dot: "#94A3B8" },
  Elutasítva: { bg: "#FDECEC", color: "#A13D3D", dot: "#EF4444" },
};

export function isLeadStatus(value) {
  return LEAD_STATUSES.includes(value);
}

export function getLeadStatusMeta(status) {
  return LEAD_STATUS_META[status] || LEAD_STATUS_META["Nem aktuális"];
}
