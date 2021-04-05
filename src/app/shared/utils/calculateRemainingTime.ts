export function dateCreator(diff?: { hours?: number, mins?: number, seconds?: number }): Date {
  const d = new Date();
  if (diff) {
    if (diff.hours) {
      d.setHours(d.getHours() + diff.hours);
    }
    if (diff.mins) {
      d.setMinutes(d.getMinutes() + diff.mins);
    }
    if (diff.seconds) {
      d.setSeconds(d.getSeconds() + diff.seconds);
    }
  }
  return d;
}

export function calculateRemainingTime(date: Date): string {
  const now = new Date();
  let remainingTime = Math.floor((date.getTime() - now.getTime()) / 1000);
  if (remainingTime <= 0) {
    return null;
  } else {
    const hours = Math.floor(remainingTime / 3600);
    remainingTime = remainingTime % 3600;
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${leadingZero(hours)}:${leadingZero(minutes)}:${leadingZero(seconds)}`;
  }
}

function leadingZero(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}
