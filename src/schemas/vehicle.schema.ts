import * as Yup from "yup";
import { AppDefaults, AppMessages, ImageMimeType } from "../data/app.constant";

const vehicleSchema = Yup.object().shape({
  file: Yup.mixed()
    .nullable()
    .notRequired()
    .test("FILE_SIZE", AppMessages.FILE_SIZE, (value: any) => !value || (value && value?.size <= AppDefaults.MAX_FILE_SIZE))
    .test("FILE_FORMAT", AppMessages.FILE_TYPE, (value: any) => !value || (value && Object.keys(ImageMimeType).includes(value.type))),
  vehicleNumber: Yup.string().required(AppMessages.REQUIRED),
  company: Yup.string().required(AppMessages.REQUIRED),
  capacity: Yup.string().required(AppMessages.REQUIRED),
  vehicleType: Yup.string().required(AppMessages.REQUIRED),
  mfgYear: Yup.string(),
  chassisNumber: Yup.string(),
  regNumber: Yup.string(),
});

export { vehicleSchema };
