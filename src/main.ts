import api from "./api/api";
import app from "./gui/app";

app.start();
api.start(7000);