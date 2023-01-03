export const rowHeight = 100;
export const viewportHeight = 200;
export const focusedBorderSize = 4;

export function buildThresholdList(numSteps) {
  const thresholds = [];

  for (let i = 1.0; i <= numSteps; i++) {
    const ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}
