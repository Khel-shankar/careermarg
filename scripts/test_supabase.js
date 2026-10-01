const { createClient } = require("@supabase/supabase-js");

const url = "https://rbqxhjkaqflgxzeegdro.supabase.co";
const key = "sb_publishable_VoOXU5GjznfoBJyRsHs5cg_jw3otoZ2";

const supabase = createClient(url, key);

async function test() {
  console.log("Connecting to Supabase...");
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    console.error("Supabase Error:", error);
  } else {
    console.log("Users count in Supabase:", data.length);
    console.log("Users:", data);
  }
}

test();
