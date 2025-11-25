// src/utils/file.ts
export async function fileToBase64(file: File): Promise<string> {
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // result dạng: "data:image/png;base64,AAAA..."
      const [, base64] = result.split(',');
      resolve(base64 || result);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
