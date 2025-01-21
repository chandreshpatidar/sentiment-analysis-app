import { Request } from "express";
import useragent from "useragent";

export const getClientInfo = (req: Request) => {
  const agent = useragent.parse(req.headers["user-agent"]);
  const browser = agent.toAgent();
  const os = agent.os.toString();
  const device = agent.device.toString();

  return {
    ip: req.ip.includes("::ffff:") ? req.ip.split("::ffff:")[1] : req.ip,
    browser,
    os,
    device,
  };
};
