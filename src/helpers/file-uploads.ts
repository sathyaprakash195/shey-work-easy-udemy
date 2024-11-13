import supabaseConfig from "@/config/supabase";

export const uploadFileAndGetUrl = async (file: File) => {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabaseConfig.storage
      .from("default")
      .upload(fileName, file);
    if (error) throw error;

    const downloadUrlResponse: any = supabaseConfig.storage
      .from("default")
      .getPublicUrl(fileName);
    if (downloadUrlResponse.error) throw downloadUrlResponse.error;

    console.log(downloadUrlResponse.data);
    return downloadUrlResponse.data.publicUrl;
  } catch (error) {
    throw error;
  }
};
