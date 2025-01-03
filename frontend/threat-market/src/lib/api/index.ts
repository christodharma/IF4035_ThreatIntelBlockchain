import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function uploadFile(url: string, file: File): Promise<any> {
    if (!file) {
      throw new Error("No file provided for upload.");
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("File upload failed.");
    }
  }


  export async function downloadFile(url: string): Promise<string> {
    try {
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data]);
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error downloading file:", error);
      throw new Error("File download failed.");
    }
  }