import { DateFormats } from "../data/app.constant";
import { useAppDispatch } from "../redux/hooks";
import { hideLoader, showLoader } from "../redux/slices/loader.slice";
import moment from "moment";
import XLSX from "xlsx-js-style";

export class UtilService {
  private appDespatch = useAppDispatch();
  convertBase64ToBlob(base64Image: string) {
    // Split into two parts
    const parts = base64Image.split(";base64,");

    // Hold the content type
    const imageType = parts[0].split(":")[1];

    // Decode Base64 string
    const decodedData = window.atob(parts[1]);

    // Create UNIT8ARRAY of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length);

    // Insert all character code into uInt8Array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }

    // Return BLOB image after conversion
    return new Blob([uInt8Array], { type: imageType });
  }

  convertFileToBase64(file: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
    });
  }

  showLoader() {
    this.appDespatch(showLoader());
  }

  hideLoader() {
    this.appDespatch(hideLoader());
  }

  formatDate(date: string | Date, format: string = DateFormats.DD_MM_YYYY): string {
    return moment(date).format(format);
  }

  getParams(filters: any = {}) {
    const params: any = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params[key] = filters[key];
      }
    });
    return params;
  }

  exportAsExcel(data: any[], fileName: string) {
    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "sheet");

    fileName = `${fileName}.xlsx`;
    XLSX.writeFile(wb, fileName);
  }
}
