export async function uploadImageToImgbb(file) {
    const formData = new FormData();
    formData.append("image", file);
  
    const res = await fetch(`https://api.imgbb.com/1/upload?key=18b56c5468a5c3a067dd0a1bbf1428c0`, {
      method: "POST",
      body: formData,
    });
  
    const data = await res.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("Image upload failed");
    }
  }
  