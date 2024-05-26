import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://flnimlxlihwcvlgjomep.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbmltbHhsaWh3Y3ZsZ2pvbWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5NTE4NjIsImV4cCI6MjAxNTUyNzg2Mn0.vwNp14oZmugFYZ_Z0OZFHKCzQy0fM99kBkADCql9T-k";
export const supabase = createClient(supabaseUrl, supabaseKey);
