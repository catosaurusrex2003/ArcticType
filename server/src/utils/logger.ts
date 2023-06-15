import pino from "pino";

export default pino({
  transport: {
    target: "pino-pretty",
    options: {
      ignore: "pid,hostname",
      customColors: "error:red,warn:yellow,info:blue",
      // translateTime: false,
    },
  },
  timestamp: () => `,"time":"${new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' , second : 'numeric' , hour12: true })}"`,
});
