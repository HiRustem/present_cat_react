const greetings = {
  morning: "Доброе утро!❤️",
  afternoon: "Добрый день!❤️",
  evening: "Добрый вечер!❤️",
  night: "Доброй ночи!❤️",
};

export const getCurrentTimePhrase = () => {
  const now = new Date();
  const hours = now.getHours();

  if (hours >= 6 && hours < 12) {
    return greetings.morning;
  } else if (hours >= 12 && hours < 18) {
    return greetings.afternoon;
  } else if (hours >= 18 && hours < 22) {
    return greetings.evening;
  }

  return greetings.night;
};
