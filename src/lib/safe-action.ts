import { AxiosError } from "axios";
import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError(error) {
    if (error instanceof AxiosError) {
      return error.response?.data.error || DEFAULT_SERVER_ERROR_MESSAGE;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  }
});
