import { chartData } from "../data/home";

export const CHART_WIDTH = 700;
export const CHART_HEIGHT = 260;
const CHART_TOP = 34;
const CHART_BOTTOM = 222;
const CHART_MIN = 20;
const CHART_MAX = 52;

export const chartPoints = chartData.map((item, index) => ({
  ...item,
  x: (index / (chartData.length - 1)) * CHART_WIDTH,
  y:
    CHART_BOTTOM -
    ((item.value - CHART_MIN) / (CHART_MAX - CHART_MIN)) *
      (CHART_BOTTOM - CHART_TOP),
}));

function buildSmoothPath(points) {
  if (!points.length) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const current = points[i];
    const next = points[i + 1];
    const previous = points[i - 1] || current;
    const afterNext = points[i + 2] || next;

    const cp1x = current.x + (next.x - previous.x) / 6;
    const cp1y = current.y + (next.y - previous.y) / 6;
    const cp2x = next.x - (afterNext.x - current.x) / 6;
    const cp2y = next.y - (afterNext.y - current.y) / 6;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }

  return path;
}

export const chartLinePath = buildSmoothPath(chartPoints);
export const chartAreaPath = `${chartLinePath} L ${CHART_WIDTH} ${CHART_HEIGHT} L 0 ${CHART_HEIGHT} Z`;
