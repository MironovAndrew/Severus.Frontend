import { createSelector } from "@reduxjs/toolkit";
import { ProfileSchema } from "../../types/ProfileSchema";
import { getProfile } from "../getProfile/getProfile";

export const getProfileError = createSelector(
  getProfile,
  (schema: ProfileSchema | undefined) => schema?.error
);
