import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_API_KEY!
);
export async function uploadFileToSupabase(file: any) {
  const filePath = `documents/${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from("chat_app")
    .upload(filePath, file);
  if (data) {
    const { data } = await supabase.storage
      .from("chat_app")
      .getPublicUrl(filePath);
    console.log(data);
    return data;
    console.log(data);
  } else {
    console.log(error);
  }
}
