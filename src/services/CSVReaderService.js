import { read, utils } from 'xlsx';

export default class CSVReaderService {

  constructor() {}

  read(file) {
    if (!file) return Promise.resolve(null);
    return new Promise((res, rej) => {
      let myReader = new FileReader();
      myReader.onload = () => {
        // pre-process data
        let binary = "";
        let bytes = new Uint8Array(myReader.result);
        let length = bytes.byteLength;
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }

        let workbook = read(binary, {type : 'binary'});
        let sheet_name_list = workbook.SheetNames;
        let target_sheets = workbook.Sheets[sheet_name_list[0]];
        let readData = utils.sheet_to_json(target_sheets);
        res({
          title: sheet_name_list[0],
          data: readData
        });
      }
      myReader.readAsArrayBuffer(file);
    })
  }
}