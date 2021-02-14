const convertMilToSeconds = (t: number) => Math.floor(t / 1000);
const convertMilToMinutes = (t: number) => Math.floor(t / 60000);
const convertMilToHours = (t: number) => Math.floor(t / 3600000);
const convertToPlural = (value: number, s: string, p: string) =>
  `${value} ${value === 1 ? s : p}`;

export function dateTimeFormation(dateTime: Date): string {
  let time = dateTime.getTime();
  const currentTime = Date.now();

  let newTime;
  if (time > currentTime) {
    newTime = time - currentTime;
  } else {
    newTime = currentTime - time;
  }
  if (newTime < 60000) {
    return convertToPlural(convertMilToSeconds(newTime), "second", "seconds");
  } else if (newTime < 3600000) {
    return convertToPlural(convertMilToMinutes(newTime), "minute", "minutes");
  } else if (newTime < 86400000) {
    return convertToPlural(convertMilToHours(newTime), "hour", "hours");
  } else if (newTime < 604800000) {
    return `${
      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dateTime.getDay()]
    } AT ${dateTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else {
    return `${dateTime.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })} AT ${dateTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
}
