import { Injectable } from '@angular/core';
import Compressor from 'compressorjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  public convertFileToFormData(file: File): FormData {
    const formData = new FormData();
    formData.append('image', file, file.name);
    return formData;
  }

  public convertBlobToFormData(blob: Blob, fileName: string): FormData {
    const formData = new FormData();
    formData.append('image', blob, fileName);
    return formData;
  }

  compressFile(file: File, quality: number = 0.5): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const compressor = new Compressor(file, {
        quality,
        success(result) {
         resolve(result);
        },
        error(err) {
          reject(err);
        }
      });
    });
  }
}
