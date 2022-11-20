import express from "express";
import ClientDao from "../data/ClientDao.js";
import { getId } from "../util/key.js";
import { clients } from "./register.js";

const router = express.Router();

router.get("/api/clients", async (req, res) => {

  const { key } = req.query;
  let uuid = "";
  if (!key) {
    res.json({
      status: 400,
      message: `You must provide an API Key!`,
    });
    return;
  }

  try {
    uuid = getId(key);
  } catch (e) {
    res.json({
      status: 500,
      message: e.message,
    });
    return;
  }

  try {
    await clients.read(uuid);
    const data = await clients.readAll();
    res.json({
      status: 200,
      message: `Successfully retrieved ${data.length} records!`,
      data: data,
    });
  } catch (e) {
    res.json({
      status: 403,
      message: `Invalid API Key!`,
    });
  }
});

export default router;
